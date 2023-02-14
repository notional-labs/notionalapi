import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createRegistration, findRegistrationByEmail, findResetPassord, findUserByEmail } from "../../helper/db";
import { sendMailResetPassword } from "../../helper/mail";
const crypto = require("crypto");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.send({status: "error", message: 'You are already signed-in.'});
  } else {
    try {
      const body = req.body;
      console.log('body: ', body);
      const { email } = body;

      // basic validation
      if (!email) return res.send({status: "error", message: 'email is required.'});

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

      const savedResetPassord = await createRegistration(newResetPassord);

      const resetpasword_url = `${process.env.NEXTAUTH_URL}/resetpass?email=${email}&activation_code=${activation_code}`;
      await sendMailResetPassword(email, resetpasword_url);

      return {props: {status: "success", data: {email}}};
    } catch(e) {
      return res.send({status: "error", message: e.message});
    }
  }
}
