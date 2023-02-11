import { Button, Form, Input } from 'antd';
import { useSession } from "next-auth/react";
import { useState } from 'react';

export default function CreateApiKey() {
  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  if (status === "loading" || loading) return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>
  if (result === "success") return <p>Success</p>
  if (result === "failed") return <p>Failed</p>

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const rawResponse = await fetch('/api/create_apikey', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const content = await rawResponse.json();
      const {apikey} = content;
      if (apikey) setResult("success");
      else setResult("failed");
    } catch (e) {
      setResult("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Create Api-Key</h3>
      <Form name="basic" onFinish={onFinish} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}>
        <Form.Item name="name" label="Name" rules={[{required: true}]}><Input /></Form.Item>
        <Form.Item name="note" label="Note"><Input.TextArea /></Form.Item>
        <Form.Item wrapperCol={{span: 16, offset: 8}}><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
      </Form>
    </>
  );
}
