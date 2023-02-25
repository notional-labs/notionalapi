import {checkBasicAuth} from '/helper/basic_auth';

export default async (req, res) => {
  // Basic Authentication
  if (checkBasicAuth({req, res}) !== true) return res.send({error: "Access Denied."});

  const {query} = req;
  const {key} = query;

  try {

    return res.send({status: "success", data: {key}});
  } catch(e) {
    console.log(e.stack);
    return res.send({status: "error", message: e.message});
  }

}
