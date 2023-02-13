import { useSession } from "next-auth/react";
import { Button, Form, Input } from "antd";

export default function Home() {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    return <p>You are already signed-in.</p>
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <h3>Registration</h3>
      <Form name="basic" onFinish={onFinish} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}>
        <Form.Item name="email" label="Email" rules={[{required: true, type: 'email'}]}><Input /></Form.Item>
        <Form.Item name="password" label="Password" hasFeedback
                   rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
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
    </>
  );
}
