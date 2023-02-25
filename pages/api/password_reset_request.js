import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import {
  createResetPassord,
  findResetPassord,
  findUserByEmail
} from "../../helper/db";
import { sendMailResetPassword } from "../../helper/mail";
const crypto = require("crypto");
const validator = require("email-validator");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return res.send({status: "error", message: 'You are already signed-in.'});
  } else {
    try {
      const body = req.body;
      console.log('body: ', body);
      const { email } = body;

      // basic validation
      if (!email) return res.send({status: "error", message: 'email is required.'});
      if (validator.validate(email) !== true) return res.send({status: "error", message: 'email is invalid.'});

      // check no user with this email
      const dbUser = await findUserByEmail(email);
      if (dbUser === null) return res.send({status: "error", message: 'No user found with this email.'});

     // check no pending registration with this email
      const dbResetPassord = await findResetPassord(email);
      console.log(`dbResetPassord=`, dbResetPassord);
      if (dbResetPassord !== null) return res.send({status: "error", message: 'There is already pending password reset request with this email.'});

      const activation_code = crypto.randomBytes(32).toString('hex');
      const newResetPassord = {
        email,
        activation_code
      }

      const savedResetPassord = await createResetPassord(newResetPassord);

      const resetpasword_url = `${process.env.NEXTAUTH_URL}/resetpass?email=${email}&activation_code=${activation_code}`;
      await sendMailResetPassword(email, resetpasword_url);

      return res.send({status: "success", data: {email}});
    } catch(e) {
      console.log(e.stack);
      return res.send({status: "error", message: e.message});
    }
  }
}
