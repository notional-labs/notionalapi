import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createApiKey } from "../../helper/db";
const crypto = require("crypto");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // const apikeys = await listApiKeysByUser(session.user.email)
    const body = req.body;
    console.log('body: ', body);
    const { name, note } = body;

    if (!body.name) return res.status(400).json({ data: 'name is required!' });

    // TODO: validating more name and note (eg., max length, null...)

    const random_str = crypto.randomBytes(128).toString('hex');
    const apikey = crypto.createHash('sha256').update(random_str).digest('hex');

    const newkey = {
      apikey,
      email: session.user.email,
      name,
      note
    }

    const item = await createApiKey(newkey);

    res.send(item);
  } else {
    res.send({error: "Access Denied.",})
  }
}
