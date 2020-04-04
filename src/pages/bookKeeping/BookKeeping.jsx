import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Tabs, Icon, Row, Col, Modal, Form, Input, message } from 'antd';
import style from './bookKeeping.less';
import { book } from '../../services/book'

const { TabPane } = Tabs;
const payIcon = [     // react中的src是相对于根目录，/在react里是相对于public目录，图片存于pulic下
  {
    id: 1,
    img: '/pay-keeping/eat.png',
    img1: '/pay-keeping/eat1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.eat' })
  },
  {
    id: 2,
    img: '/pay-keeping/wear.png',
    img1: '/pay-keeping/wear1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.wear' })
  },
  {
    id: 3,
    img: '/pay-keeping/house.png',
    img1: '/pay-keeping/house1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.house' })
  },
  {
    id: 4,
    img: '/pay-keeping/cosmetic.png',
    img1: '/pay-keeping/cosmetic1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.cosmetic' })
  },
  {
    id: 5,
    img: '/pay-keeping/traffic.png',
    img1: '/pay-keeping/traffic1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.traffic' })
  },
  {
    id: 6,
    img: '/pay-keeping/daily.png',
    img1: '/pay-keeping/daily1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.daily' })
  },
  {
    id: 7,
    img: '/pay-keeping/book.png',
    img1: '/pay-keeping/book1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.book' })
  },
  {
    id: 8,
    img: '/pay-keeping/fruit.png',
    img1: '/pay-keeping/fruit1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.fruit' })
  },
  {
    id: 9,
    img: '/pay-keeping/entertainment.png',
    img1: '/pay-keeping/entertainment1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.entertainment' })
  },
  {
    id: 10,
    img: '/pay-keeping/digital.png',
    img1: '/pay-keeping/digital1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.digital' })
  },
  {
    id: 11,
    img: '/pay-keeping/phone.png',
    img1: '/pay-keeping/phone1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.phone' })
  },
  {
    id: 12,
    img: '/pay-keeping/other.png',
    img1: '/pay-keeping/other1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.other' })
  },
];
const incomeIcon = [
  {
    id: 13,
    img: '/pay-keeping/wage.png',
    img1: '/pay-keeping/wage1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.wage' })
  },
  {
    id: 14,
    img: '/pay-keeping/part-time.png',
    img1: '/pay-keeping/part-time1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.part-time' })
  },
  {
    id: 15,
    img: '/pay-keeping/investment.png',
    img1: '/pay-keeping/investment1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.investment' })
  },
  {
    id: 16,
    img: '/pay-keeping/bonus.png',
    img1: '/pay-keeping/bonus1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.bonus' })
  },
  {
    id: 17,
    img: '/pay-keeping/other.png',
    img1: '/pay-keeping/other1.png',
    isSelect: false,
    kind: formatMessage({ id: 'asset.assetOverview.other' })
  },
]

class BookKeepingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: '',
      kinds: '支出'
    };
  }

  handleTab = (key) => {
    const kinds = key == 1 ? '支出' : '收入'
    this.setState({
      kinds
    })
  }

  handleClick = (type, id) => {
    for (let i = 0; i < payIcon.length; i++) {
      if (payIcon[i].id == id) {
        payIcon[i].isSelect = true
      }
    }
    this.setState({
      visible: true,
      type
    })
  };

  handleOk = () => {
    for (let i = 0; i < payIcon.length; i++) {
      payIcon[i].isSelect = false
    }
    this.setState({
      visible: false,
    });

    this.props.form.validateFields((err, values) => {
      const userId = localStorage.getItem('userId')
      if(!err) {
        const params = Object.assign({}, values, { userId, kinds: this.state.kinds, type: this.state.type })
        book(params).then( res => {
          message.success(res.msg, 2);
        })
      }
      this.props.form.resetFields()
    })
  };

  handleCancel = () => {
    for (let i = 0; i < payIcon.length; i++) {
      payIcon[i].isSelect = false
    }
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const payItem = payIcon.map(item =>     // 别在后面加{}。。。
      <Col
        xs = {{ span: 6, offset: 2 }}
        lg = {{ span: 5, offset: 1 }}
        onClick = { () => this.handleClick(item.kind, item.id) }
        key = { item.id }
      >
        <img className = { style.img } src = { item.isSelect ? item.img : item.img1 }/>
        <p className = { style.title }>{ item.kind }</p>
      </Col>
    );
    
    const incomeItem = incomeIcon.map(item =>     // 别在后面加{}。。。
      <Col
        xs = {{ span: 6, offset: 2 }}
        lg = {{ span: 5, offset: 1 }}
        onClick = { () => this.handleClick(item.kind, item.id) }
        key = { item.id }
      >
        <img className = { style.img } src = { item.isSelect ? item.img : item.img1 }/>
        <p className = { style.title }>{ item.kind }</p>
      </Col>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 20 },
      },
    };
    return (
      <PageHeaderWrapper>
        <div>
          <Tabs defaultActiveKey="1" size="large" onChange={ this.handleTab }>
            <TabPane
              tab={
                <span>
                  <Icon type="account-book" />
                  <FormattedMessage id="asset.assetOverview.pay" />
                </span>
              }
              key="1"
            >
              <Row>{ payItem }</Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="dollar" />
                  <FormattedMessage id="asset.assetOverview.income" />
                </span>
              }
              key="2"
            >
              <Row>{ incomeItem }</Row> 
            </TabPane>
          </Tabs>
        </div>
        <Modal
          title = {formatMessage({ id: 'asset.assetOverview.pay' })}
          visible = { this.state.visible }
          onOk = { this.handleOk} 
          onCancel = { this.handleCancel}
          width={400}
        >
          <Form {...formItemLayout}>
            <Form.Item label={formatMessage({ id: 'asset.assetOverview.type' })}>
              <span>{ this.state.type }</span>
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'asset.assetOverview.price' })}>
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: formatMessage({ id: 'asset.assetOverview.number' }),
                    transform:(value)=> {return Number(value)} //ant design的坑，会把输入的内容转换成String
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'asset.assetOverview.amount' })} />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'asset.assetOverview.remark' })}>
              {getFieldDecorator('remark', {
                rules: [
                  {
                    max: 10,
                    message: formatMessage({ id: 'asset.assetOverview.tmark' }),
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

const BookKeeping = Form.create({ name: 'keeping_form' })(BookKeepingForm)

export default BookKeeping