import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { findApiKey, deleteApiKey } from "../../helper/db";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const body = req.body;
    console.log('body: ', body);
    const {apikey} = body;

    if (!apikey) return res.status(400).json({ data: 'apikey is required!' });

    const dbItem = await findApiKey(apikey);
    if (dbItem === null) res.status(400).json({ data: 'apikey not found!' });

    if (dbItem.email !== session.user.email) res.status(400).json({ data: 'invalid apikey!' });

    const deletedApiKey = await deleteApiKey(apikey);

    res.send(deletedApiKey);
  } else {
    res.send({error: "Access Denied.",})
  }
}
