import { findRegistrationByEmail, createUser, deleteRegistration } from "../helper/db";
const validator = require("email-validator");

export async function getServerSideProps(ctx) {
  console.log('params=', ctx.query);
  const {email, activation_code} = ctx.query;

  const jsend_err = {props: {status: "error", message: 'something wrong!'}};

  //
  try {
    if (validator.validate(email) !== true) return jsend_err;

    const reg = await findRegistrationByEmail(email);
    if (reg === null) return jsend_err;
    if (activation_code !== reg.activation_code) return jsend_err;

    const now = new Date();
    const time_diff = (now.getTime() - reg.submitted_at.getTime())/1000;
    if (time_diff > 86400) return jsend_err;

    // create new user here
    const newUser = {
      email,
      pass_hash: reg.pass_hash
    }
    await createUser(newUser);

    // delete registration
    await deleteRegistration(email);

    return {props: {status: "success", data: null}};
  } catch (e) {
    console.log("[reg_active] err: ", e.message);
    return jsend_err;
  }
}

export default function Home(props) {
  const {status, data, message} = props;
  return (
    <>
      <h3>Account activation</h3>
      {status === "success"
        ? <p>Account is activated. Login with your new account to continue.</p>
        : <p>Something wrong!</p>
      }
    </>
  );
}
