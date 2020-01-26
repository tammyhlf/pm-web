import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Tabs, Icon, Row, Col, Modal, Form, Input } from 'antd';

const { TabPane } = Tabs;
const photo = {
  eat: './eat.png',
}

class BookKeeping extends Component {
  state = {
    visible: false
  };

  handleClick = () => {
    this.setState({
      visible: true,
    })
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper>
        <div>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane
              tab={
                <span>
                  <Icon type="account-book" />
                  支出
                </span>
              }
              key="1"
            >
              <Row>
                <Col
                  xs={{ span: 6, offset: 2 }}
                  lg={{ span: 3, offset: 1 }}
                  onClick={ () => this.handleClick() }
                >
                  <img src={ photo.eat } alt="eat"/>
                  <p>餐饮</p>
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="dollar" />
                  收入
                </span>
              }
              key="2"
            >
              <Row>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                  Col
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
        <Modal
          title="支出"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSearch}>
            <Form.Item label="类型：">
              <span>12</span>
            </Form.Item>
            <Form.Item label="金额：">
              {getFieldDecorator('price', {
                rules: [
                  {
                    type: 'number',
                    message: '请输入正确的金额',
                  },
                  {
                    required: true,
                    message: '请输入金额',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [
                  {
                    max: 10,
                    message: '请输入不超过十个字的备注',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default BookKeeping
