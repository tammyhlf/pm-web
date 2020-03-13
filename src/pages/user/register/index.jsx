import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import styles from '../login/style.less';
import router from 'umi/router';
import { userRegister } from '../../../services/login'
import passwordEncrypted from '../../../utils/passwordEncrypted';

class RegisterForm extends Component {
	checkPassword = (rule, value, callback) => {
		if (this.props.form.getFieldValue('password') == value) {
			callback()
		} else {
			callback('密码与第一次不匹配')
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const encryptPassword = passwordEncrypted(values.phone, values.password)
				userRegister({ 
					username: values.username,
					phone: values.phone,
					password: encryptPassword
				}).then( res => {
					if(!res.code) {
						message.success(res.msg, 2);
						router.push('/user/login')
					} else {
						message.error(res.msg, 2);
					}
				} )
			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		
		return (
			<div className={styles.main}>
				<Form onSubmit={ this.handleSubmit }>
            <Form.Item>
						{getFieldDecorator('username', {
                rules: [
                  {
										required: true,
										max: 10,
                    message: '请填写十位以内的用户名',
                  }
                ],
              })(<Input size="large" placeholder="用户名" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [
                  {
										required: true,
										pattern: /^1[3456789]\d{9}$/,
                    message: '请输入正确的手机号',
                  }
                ],
              })(<Input size="large" placeholder="手机号" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
										required: true,
                    min: 6,
                    message: '请输入超过六个字的密码',
                  },
                ],
              })(<Input.Password size="large" placeholder="密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
						<Form.Item>
              {getFieldDecorator('passwordSec', {
                rules: [
									{
										required: true,
                    message: '请输入密码',
                  },
                  {
										validator: this.checkPassword,
									},
                ],
              })(<Input.Password size="large" placeholder="请再次输入密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
						<Form.Item>
							<Button className={styles.btn} type="primary" size="large" htmlType="submit">注册</Button>
						</Form.Item>
          </Form>
			</div>
		)
	}
}

const Register = Form.create({ name: 'form' })(RegisterForm)

export default Register