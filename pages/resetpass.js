import { findResetPassord } from "../helper/db";
import { Button, Form, Input } from "antd";
const validator = require("email-validator");

export async function getServerSideProps(ctx) {
  console.log('params=', ctx.query);
  const {email, activation_code} = ctx.query;

  const jsend_err = {props: {status: "error", message: 'something wrong!'}};

  //
  try {
    if (validator.validate(email) !== true) return jsend_err;

    const dbResetPass = await findResetPassord(email);
    if (dbResetPass === null) return jsend_err;
    if (activation_code !== dbResetPass.activation_code) return jsend_err;

    const now = new Date();
    const time_diff = (now.getTime() - dbResetPass.submitted_at.getTime())/1000;
    if (time_diff > 86400) return jsend_err;

    return {props: {status: "success", data: {email, activation_code}}};
  } catch (e) {
    console.log("[reg_active] err: ", e.message);
    return jsend_err;
  }
}

export default function Home(props) {
  const {status, data, message} = props;

  if (status !== "success") return <p>Something wrong!</p>;

  const {email, activation_code} = data;

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const extValues = {
      ...values,
      email, activation_code
    }

    try {
      setLoading(true);
      const rawResponse = await fetch('/api/password_reset', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(extValues),
      });
      const newReg = await rawResponse.json();
      const {email} = newReg;
      if (email) setResult("success");
      else setResult("failed");
    } catch (e) {
      setResult("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Reset Password</h3>
      <Form name="basic" onFinish={onFinish} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}>
        <Form.Item name="password" label="New Password" hasFeedback
                   rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm New Password" dependencies={['password']} hasFeedback
                   rules={[
                     {required: true, message: 'Please confirm your password!'},
                     ({getFieldValue}) => ({
                       validator(_, value) {
                         if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                         }
                         return Promise.reject(new Error('The two passwords that you entered do not match!'));
                       },
                     }),
                   ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item wrapperCol={{span: 16, offset: 8}}><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
      </Form>
      }
    </>
  );
}
