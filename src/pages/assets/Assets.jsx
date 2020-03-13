import React from 'react';
import styles from './assets.less';
import { Icon, Modal, Form, Input, Select, Table } from 'antd';

const { Option } = Select;

const depositColumns = [
  {
    title: '账户',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '周期',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render: text => {
      <span>
        <FormattedMessage id="asset.assetOverview.delete" />
      </span>
    }
  },
];

const monetaryColumns = [
  {
    title: '名称',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '收益率',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render: text => {
      <span>
        <FormattedMessage id="asset.assetOverview.delete" />
      </span>
    }
  },
];

const fixedColumns = [
  {
    title: '名称',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render: text => {
      <span>
        <FormattedMessage id="asset.assetOverview.delete" />
      </span>
    }
  },
];

class Asset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      visible: false,
      isSelect: 'cash',
    }
  }

  changeTabs = (i) => {
    this.setState({
      tab: i
    });
  }

  handleVisible = () => {
    this.setState({
      visible: true
    });
  }

  handleSelect = (value) => {
    this.setState({
      isSelect: value
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  render() {

    const tabs = [
      { index: 0, name: '现金', icon: 'pay-circle' },
      { index: 1, name: '存款', icon: 'money-collect' },
      { index: 2, name: '金融资产', icon: 'line-chart' },
      { index: 3, name: '固定资产', icon: 'home' }
    ];

    const { tab } = this.state

    const tabList = tabs.map((item, i) => (
      <div className={styles.item} key={item.index} onClick={() => { this.changeTabs(i) }}>
        <Icon type={item.icon} style={{ fontSize: 25, color: tab == i ? '#1890ff' : '#001529' }} />
        <span style={{ color: tab == i ? '#1890ff' : '#001529' }}>{item.name}</span>
      </div>
    ))
    
    const { getFieldDecorator } = this.props.form;

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

    const depositForm =<div>
      <Form.Item label="名称：">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '名称必填'
            },
          ],
        })(<Input placeholder="请输入金额" />)}
      </Form.Item>
      <Form.Item label="周期：">
        <Input placeholder="请输入周期" />
      </Form.Item>
    </div>

    const monetaryForm = <div>
      <Form.Item label="名称：">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '名称必填'
            },
          ],
        })(<Input placeholder="请输入金额" />)}
      </Form.Item>
      <Form.Item label="收益率：">
        <Input placeholder="请输入收益率" />
      </Form.Item>
    </div>

    const fixedForm =
    <Form.Item label="名称：">
      {getFieldDecorator('name', {
        rules: [
          {
            required: true,
            message: '名称必填'
          },
        ],
      })(<Input placeholder="请输入名称" />)}
    </Form.Item> 

    const {isSelect} = this.state;

    return (
      <div>
        <div className={styles.page}>
          <div className={styles.total}>
            <span>总资产</span>
            <strong>90.00</strong>
          </div>
          <div className={styles.output}>
            <span>净资产</span>
            <strong>120.00</strong>
          </div>
        </div>
        <div className={styles.tab}>
          {tabList}
        </div>
        <div className={styles.content}>
          <div className={tab == 0 ? styles.active : styles['tab-content']}>
            <p className={styles.balance}>余额：￥ 2000</p>
          </div>
          <div className={tab == 1 ? styles.active : styles['tab-content']}>
            <Table columns={depositColumns} />
          </div>
          <div className={tab == 2 ? styles.active : styles['tab-content']}>
            <Table columns={monetaryColumns}></Table>
          </div>
          <div className={tab == 3 ? styles.active : styles['tab-content']}>
            <Table columns={fixedColumns}></Table>
          </div>
        </div>
        <div className={styles.plus} onClick={ this.handleVisible }>
          <Icon style={{ fontSize: 50, color: "#1890ff" }} type="plus-circle" theme="filled" color="#1890ff" />
        </div>
        <Modal
          title="添加资产"
          visible={this.state.visible}
          // onOk = { this.handleOk} 
          onCancel = { this.handleCancel}
          width={400}
        >
          <Form {...formItemLayout}>
            <Form.Item label="类型：">
              <Select defaultValue='cash' onChange={ this.handleSelect }>
                <Option value="cash">现金</Option>
                <Option value="deposit">存款</Option>
                <Option value="monetary">金融资产</Option>
                <Option value="fixed">固定资产</Option>
              </Select>
            </Form.Item>
            <Form.Item label="金额：">
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '金额必填且为数字',
                    transform: (value) => { return Number(value) } //ant design的坑，会把输入的内容转换成String
                  },
                ],
              })(<Input placeholder="请输入金额" />)}
            </Form.Item>
            { isSelect == 'cash' ? null : isSelect ==  'deposit'? depositForm : isSelect == 'monetary'? monetaryForm : fixedForm }
          </Form>
        </Modal>
      </div>
    )
  }
}

const Assets = Form.create()(Asset)

export default Assets;
