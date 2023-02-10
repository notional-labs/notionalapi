import { Button, Form, Input } from 'antd';
import { useSession } from "next-auth/react";

export default function CreateApiKey() {
  const {data: session, status} = useSession();

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>

  const onFinish = async (values) => {
    const rawResponse = await fetch('/api/create_apikey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    const content = await rawResponse.json();
    console.log(`content=${JSON.stringify(content)}`);
    const {apikey} = content;
    if (apikey) {
      alert("created OK!");
      return;
    }

    alert("created failed!");
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
