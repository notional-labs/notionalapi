import {checkBasicAuth} from '/helper/basic_auth';


const isEmpty = (value) => {
  return (value == null || value.length === 0);
}

const checkAuth = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    return true;
  }
  return false;
}

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
