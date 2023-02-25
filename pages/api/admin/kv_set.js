import {checkBasicAuth} from '/helper/basic_auth';
import { setKeyValue } from "/helper/db";

export default async (req, res) => {
  // Basic Authentication
  if (checkBasicAuth({req, res}) !== true) return res.status(403).send({error: "Access Denied."});

  const body = req.body;
  console.log('body: ', body);
  const { key, value } = body;

  if (!key) return res.status(400).json({ data: 'key is required!' });
  if (!value) return res.status(400).json({ data: 'value is required!' });

  try {
    const newItem = await setKeyValue({key, value});

    return res.send({status: "success", data: newItem});
  } catch(e) {
    console.log(e.stack);
    return res.send({status: "error", message: e.message});
  }
}
