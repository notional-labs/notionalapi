import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import {
  deleteResetPassord,
  findResetPassord,
  findUserByEmail, updateUser
} from "../../helper/db";
const crypto = require("crypto");
const validator = require("email-validator");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.send({status: "error", message: 'You are already signed-in.'});
  } else {
    try {
      const body = req.body;
      console.log('body: ', body);
      const { email, password, confirm, activation_code } = body;

      // basic validation
      if (!email) return res.send({status: "error", message: 'email is required.'});
      if (!password) return res.send({ error: 'password is required!' });
      if (password !== confirm) return res.send({ error: 'password and confirm do not match!' });
      if (validator.validate(email) !== true) res.send({status: "error", message: 'email is invalid.'});

      // check no user with this email
      const dbUser = await findUserByEmail(email);
      if (dbUser === null) return res.send({status: "error", message: 'No user found with this email.'});

      // check no pending registration with this email
      const dbResetPassord = await findResetPassord(email);
      console.log(`dbResetPassord=`, dbResetPassord);
      if (dbResetPassord !== null) return res.send({status: "error", message: 'There is already pending password reset request with this email.'});
      if (dbResetPassord.activation_code !== activation_code) return res.send({status: "error", message: 'Invalid code.'});

      // change new pass
      const pass_hash = crypto.createHash('sha256').update(password).digest('hex');
      const savedUpdatedUser = await updateUser(email, {pass_hash});

      // delete the reset password request
      await deleteResetPassord(email);

      return res.send({status: "success", data: {email}});
    } catch(e) {
      console.log(e.stack);
      return res.send({status: "error", message: e.message});
    }
  }
}
