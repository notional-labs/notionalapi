import { Button, Form, Input, InputNumber } from 'antd';
import { useSession } from "next-auth/react";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

export default function CreateApiKey() {
  const {data: session, status} = useSession();

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>

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
