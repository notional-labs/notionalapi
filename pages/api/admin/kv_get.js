import {checkBasicAuth} from '/helper/basic_auth';
import { getKeyValue } from "/helper/db";

export default async (req, res) => {
  // Basic Authentication
  if (checkBasicAuth({req, res}) !== true) return res.status(403).send({error: "Access Denied."});

  const {query} = req;
  const {key} = query;

  try {
    const item = await getKeyValue(key);

    if (item == null) {
      return res.send({status: "error", message: 'Not found'});
    }

    return res.send({status: "success", data: item});
  } catch(e) {
    console.log(e.stack);
    return res.send({status: "error", message: e.message});
  }
}
