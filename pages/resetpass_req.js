import { useSession } from "next-auth/react";
import { Button, Form, Input } from "antd";
import { useState } from "react";

export default function ResetPassRequest() {
  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  if (status === "loading" || loading) return <p>Loading...</p>
  if (status === "authenticated") return <p>You are already signed-in.</p>
  if (result === "success") return <p>Success, Check your email to continue.</p>
  if (result === "failed") return <p>Failed</p>

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      setLoading(true);
      const rawResponse = await fetch('/api/password_reset_request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const jsend = await rawResponse.json();
      const {status, data, message} = jsend;
      if (status === "success") setResult("success");
      else setResult("failed");
    } catch (e) {
      setResult("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Reset Password Request</h3>
      <Form name="basic" onFinish={onFinish} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}>
        <Form.Item name="email" label="Email" rules={[{required: true, type: 'email'}]}><Input /></Form.Item>
        <Form.Item wrapperCol={{span: 16, offset: 8}}><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
      </Form>
    </>
  );
}
