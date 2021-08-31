import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../styles/login.scss';

const Login = ()=>{
  const [remember, setRemember] = useState<Boolean>(false);
  const history = useHistory();
  const onFinish = (values:any) => {
    console.log(values);
      if (values) {
        sessionStorage.setItem('token','add');
        history.push('/news');
      }
  };
  const onCheckChange = (e)=>{
    console.log(e);
    setRemember(e.target.checked);
  }
  return (
    <>
        <div className="login-bg"></div>
        <div className="login-form">
        <h3>后台管理系统</h3>
        <Form
      name="normal_login"
      initialValues={{
        remember: remember,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onChange={onCheckChange}>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
        </div>
        
    </>
  )
}
export default Login;