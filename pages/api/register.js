import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createRegistration, findRegistrationByEmail, findUserByEmail } from "../../helper/db";
import { sendMailActive } from "../../helper/mail";
const crypto = require("crypto");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    res.send({error: "You are already signed-in.",})
  } else {
    const body = req.body;
    console.log('body: ', body);
    const { email, password, confirm } = body;

    // basic validation
    if (!email) return res.send({ error: 'email is required!' });
    if (!password) return res.send({ error: 'password is required!' });
    if (password !== confirm) return res.send({ error: 'password and confirm do not match!' });

    // check no user with this email
    const dbUser = await findUserByEmail(email);
    if (dbUser !== null) return res.send({ error: 'This email has been registered.' });

    // check no pending registration with this email
    const dbReg = await findRegistrationByEmail(email);
    console.log(`dbReg=`, dbReg);
    if (dbReg !== null) return res.send({ error: 'There is already pending registration with this email.' });

    const pass_hash = crypto.createHash('sha256').update(password).digest('hex');
    const activation_code = crypto.randomBytes(32).toString('hex');

    const newItem = {
      email,
      pass_hash,
      activation_code
    }

    const savedItem = await createRegistration(newItem);

    const activation_url = `${process.env.NEXTAUTH_URL}/reg_active?email=${email}&activation_code=${activation_code}`;
    await sendMailActive(email, activation_url);

    res.send({email});
  }
}
