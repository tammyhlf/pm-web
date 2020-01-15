import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Tabs, Icon, Row, Col } from 'antd';

const { TabPane } = Tabs;
const photo = {
  eat: './eat.png'
}

class BookKeeping extends Component {
  handleClick = () => {
    console.log(1)
  }
  render() {
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
                <Col xs={{ span: 6, offset: 2 }} lg={{ span: 3, offset: 1 }} onClick={ () => this.handleClick() }>
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
      </PageHeaderWrapper>
    )
  }
}

export default BookKeeping
