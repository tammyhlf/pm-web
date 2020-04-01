import React, { Component } from 'react';
import io from 'socket.io-client'
import { Form, Input, Button } from 'antd';

const url = 'http://localhost:8001'
const socket = io(url)

class ChatForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatList: [5]
    }
  }
  componentDidMount() {
    socket.on('connection',(msg)=>{
      let list = this.state.chatList;
      list.push(msg)
      this.setState({chatList:list})
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        socket.emit('messages', values.password)
        let list = this.state.chatList;
        list.push(values.password)
        this.setState({
          chatList: list
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const listItems = this.state.chatList.map((number, index) =>
      <li key={index}>{number}</li>
    );
    return (
      <div>
        <ul>{ listItems }</ul>
        
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const Chat = Form.create({name: 'chat'})(ChatForm)

export default Chat;