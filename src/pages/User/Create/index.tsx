import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Form, Input, Button, Card } from 'antd';
import {
	UserOutlined,
	MailOutlined,
	PhoneOutlined,
	CaretLeftOutlined
} from '@ant-design/icons';
import { Api } from '../../../services';
import { MaskedInput } from 'antd-mask-input';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const phoneMask = '(00) 00000-0000';

const CreateUser: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const mask = React.useMemo(
		() => [
			{
				mask: phoneMask,
				lazy: false,
			},
		],
		[]
	);

  const onFinish = async (value: any) => {
		try {
			console.log(value);
			const response = await Api.post('/users', value.user);
			if (response.status === 201) {
				message.success('User successfully created!');
			}
			form.resetFields();
		} catch (error: any) {
			message.error(error.response?.data?.message);
		}
  };

  return (
		<>
			<Button 
				type="primary"
				shape="circle"
				style={{
					position: 'absolute',
					left: '30%',
					top: '5%',
					zIndex: 999
				}}
				size="large"
				onClick={() => navigate('/')}
			>
				<CaretLeftOutlined />
			</Button>
			<div className="container">
				<Card>
						<Form
							{...layout}
							name="nest-messages"
							onFinish={onFinish}
							validateMessages={validateMessages}
							form={form}
						>
							<Form.Item
								name={['user', 'name']}
								label="Name"
								rules={[{ type: 'string', required: true }]}
							>
								<Input 
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Ex.: Robert Isaac"
								/>
							</Form.Item>
							<Form.Item
								name={['user', 'email']}
								label="E-mail"
								rules={[{ type: 'email', required: true }]}
							>
								<Input 
									prefix={<MailOutlined className="site-form-item-icon" />}
									placeholder="Ex.: email@domain.com"
								/>
							</Form.Item>
							<Form.Item
								name={['user', 'phone']}
								label="Phone"
								rules={[{ required: true }]}
							>
								<MaskedInput
									prefix={<PhoneOutlined className="site-form-item-icon" />}
									mask={mask}
								/>
							</Form.Item>
							<Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
								<Button 
									className="login-form-button"
									size="middle"
									type="primary"
									htmlType="submit"
									style={{ 
										width: '100%',
										borderRadius: 5,
										marginTop: 10,
										fontSize: 16,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									Create User
								</Button>
							</Form.Item>
						</Form>
					</Card>
			</div>
		</>
  );
};

export default CreateUser
