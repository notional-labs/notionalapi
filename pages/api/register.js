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
    if (!body.name) return res.status(400).json({ data: 'name is required!' });
    if (password) return res.status(400).json({ data: 'password is required!' });
    if (password !== confirm) res.status(400).json({ data: 'password and confirm do not match!' });

    // check no user with this email
    const dbUser = findUserByEmail(email);
    if (dbUser != null) res.status(400).json({ data: 'User exists with this email.' });

    // check no pending registration with this email
    const dbReg = findRegistrationByEmail(email);
    if (dbReg != null) res.status(400).json({ data: 'There is already pending registration with this email.' });

    // TODO: validating more

    const pass_hash = crypto.createHash('sha256').update(password).digest('hex');
    const activation_code = crypto.randomBytes(32).toString('hex');

    const newItem = {
      email,
      pass_hash,
      activation_code
    }

    const savedItem = await createRegistration(newItem);

    const activation_url = `https://notionalapi.com/reg_active?email=${email}&activation_code=${activation_code}`;
    await sendMailActive(email, activation_url)

    res.send({email});
  }
}
