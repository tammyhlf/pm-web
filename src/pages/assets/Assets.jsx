import React from 'react';
import styles from './assets.less';
import { Icon, Modal, Form, Input, Select, Table, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { addAssets, assetsInfo, totalAssets, deleteInfo } from '../../services/assets'
import { totalDebet } from '../../services/debet'

const { Option } = Select;

class Asset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      visible: false,
      isSelect: 'cash',
      cash: 0,
      deposit: [],
      monetary: [],
      fixed: [],
      total: 0,
      balance: 0,
      eye: true
    }
  }

  componentWillMount() {
    assetsInfo({ id : localStorage.getItem('userId'), type: 'cash' }).then(res=>{
      if (!res.code) {
        this.setState({
          cash: res.data[0].assets
        })
      }
    })
    totalAssets({ id : localStorage.getItem('userId') }).then(res=>{
      if (!res.code) {
        let total = 0;
        res.data.map(item => {
          total += item.cash * 1
        })
        this.setState({
          total
        })
      }
    })
  }

  componentDidMount() {
    totalDebet({ id : localStorage.getItem('userId') }).then(res=>{
      if (!res.code) {
        let totals = 0;
        res.data.map(item => {
          totals += item.ant * 1
        })
        const total = this.state.total
        this.setState({
          balance: total - totals
        })
      }
    })
  }

  changeTabs = (i) => {
    this.setState({
      tab: i
    });
    const type = i == 0 ? 'cash' : i == 1 ? 'deposit' : i == 2 ? 'monetary' : 'fixed'
    assetsInfo({ id : localStorage.getItem('userId'), type }).then(res=>{
      if (!res.code) {
        if(i == 0) {
          this.setState({
            cash: res.data[0].assets
          })
        } else if (i == 1) {
          this.setState({
            deposit: res.data
          })
        } else if (i == 2) {
          this.setState({
            monetary: res.data
          })
        } else if (i == 3) {
          this.setState({
            fixed: res.data
          })
        }
      }
    })
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

  handleDelete = (id) => {
    const type = this.state.tab == 1 ? 'deposit' : this.state.tab == 2 ? 'monetary' : 'fixed';
    const columns = this.state[type].filter(item => {
      return item.id != id
    })
    deleteInfo({id, type}).then(res => {
      if (!res.code) {
        message.success(res.msg, 2)
        this.setState({
          [type]: columns
        })
      }
    })
  }

  handleEye = () => {
    const {eye} = this.state
    this.setState({
      eye: !eye
    })
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          userId: localStorage.getItem('userId'),
          type: this.state.isSelect
        }
        params = Object.assign(params, values)
        addAssets(params).then(res => {
          if (!res.code) {
            this.setState({
              visible: false
            })
            message.success(res.msg, 2)
            if(this.state.isSelect == 'cash' && this.state.tab == 0) {
              const cash = this.state.cash * 1 + values.price * 1
              this.setState({
                cash
              })
            } else if (this.state.isSelect == 'deposit' && this.state.tab == 1) {
              assetsInfo({ id : localStorage.getItem('userId'), type: 'deposit' }).then(res=>{
                this.setState({
                  deposit: res.data
                })
              })
            } else if (this.state.isSelect == 'monetary' && this.state.tab == 2) {
              assetsInfo({ id : localStorage.getItem('userId'), type: 'monetary' }).then(res=>{
                this.setState({
                  monetary: res.data
                })
              })
            } else if (this.state.isSelect == 'fixed' && this.state.tab == 3) {
              assetsInfo({ id : localStorage.getItem('userId'), type: 'fixed' }).then(res=>{
                this.setState({
                  fixed: res.data
                })
              })
            }
            this.props.form.resetFields()
          }
        })
      }
    });
  }

  render() {

    const tabs = [
      { index: 0, name: formatMessage({ id: 'asset.assetOverview.cash' }), icon: 'pay-circle' },
      { index: 1, name: formatMessage({ id: 'asset.assetOverview.deposit' }), icon: 'money-collect' },
      { index: 2, name: formatMessage({ id: 'asset.assetOverview.monetray' }), icon: 'line-chart' },
      { index: 3, name: formatMessage({ id: 'asset.assetOverview.fixed' }), icon: 'home' }
    ];
    const depositColumns = [
      {
        title: '账户',
        dataIndex: 'name',
        key: 'name',
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
        dataIndex: 'cycle',
        key: 'cycle',
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) => <a onClick={() => this.handleDelete(record.id)}>删除</a>
      },
    ];
    
    const monetaryColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
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
        dataIndex: 'benfit',
        key: 'benfit',
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) => <a onClick={() => this.handleDelete(record.id)}>删除</a>
      },
    ];
    
    const fixedColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
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
        render: (record) => <a onClick={() => this.handleDelete(record.id)}>删除</a>
      },
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

    const depositForm = <div>
      <Form.Item label="名称：">
        {getFieldDecorator('name')(<Input placeholder="请输入金额" />)}
      </Form.Item>
      <Form.Item label="周期：">
      {getFieldDecorator('cycle')(<Input placeholder="请输入周期" />)}
      </Form.Item>
    </div>

    const monetaryForm = <div>
      <Form.Item label="名称：">
        {getFieldDecorator('name')(<Input placeholder="请输入金额" />)}
      </Form.Item>
      <Form.Item label="收益率：">
        {getFieldDecorator('benfit')(<Input placeholder="请输入收益率" />)}
      </Form.Item>
    </div>

    const fixedForm =
    <Form.Item label="名称：">
      {getFieldDecorator('name')(<Input placeholder="请输入名称" />)}
    </Form.Item> 

    const {isSelect} = this.state;

    return (
      <div>
        <div className={styles.page}>
          <div className={styles.total}>
            <span><FormattedMessage id="asset.assetOverview.all" /></span>
            <strong>{this.state.total}</strong>
          </div>
          <div className={styles.output}>
            <span><FormattedMessage id="asset.assetOverview.jing" /></span>
            <strong>{this.state.balance}</strong>
          </div>
        </div>
        <div className={styles.tab}>
          {tabList}
        </div>
        <div className={styles.content}>
          <div className={tab == 0 ? styles.active : styles['tab-content']}>
            <p className={styles.balance}><FormattedMessage id="asset.assetOverview.total" /><Icon type="eye" onClick={this.handleEye} /></p>
            {this.state.eye ? 
              <p className={styles.cash}>{ this.state.cash }</p> :
              <p className={styles.cash}>****</p>}
          </div>
          <div className={tab == 1 ? styles.active : styles['tab-content']}>
            <Table rowKey={record => record.id} columns={depositColumns} dataSource={this.state.deposit}>
            </Table>
          </div>
          <div className={tab == 2 ? styles.active : styles['tab-content']}>
            <Table rowKey={record => record.id} columns={monetaryColumns} dataSource={this.state.monetary}></Table>
          </div>
          <div className={tab == 3 ? styles.active : styles['tab-content']}>
            <Table rowKey={record => record.id} columns={fixedColumns} dataSource={this.state.fixed}></Table>
          </div>
        </div>
        <div className={styles.plus} onClick={ this.handleVisible }>
          <Icon style={{ fontSize: 35, color: "#1890ff" }} type="plus-circle" theme="filled" color="#1890ff" />
        </div>
        <Modal
          title="添加资产"
          visible={this.state.visible}
          onOk = { this.handleOk}
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
