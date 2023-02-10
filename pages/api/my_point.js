import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { findPoint } from "../../helper/db";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const point = await findPoint(session.user.email)

    res.send(point);
  } else {
    res.send({error: "Access Denied.",})
  }
}
