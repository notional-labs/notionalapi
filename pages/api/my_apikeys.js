import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { listApiKeysByUser } from "../../helper/db";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const apikeys = await listApiKeysByUser(session.user.email)

    return res.send(apikeys);
  } else {
    return res.send({error: "Access Denied.",})
  }
}
