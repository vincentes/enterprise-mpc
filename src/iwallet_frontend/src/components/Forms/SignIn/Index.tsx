import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

type SignInProps = {
  onSignIn: ((values: any) => void) | undefined
}
const SignIn = ({onSignIn}: SignInProps) => {
  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onSignIn}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!', type: "email" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full bg-blue-500">
          Log in
        </Button>
        Or <a className="underline" href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export { SignIn };