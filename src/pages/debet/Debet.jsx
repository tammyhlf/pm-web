import React from 'react';
import styles from './debet.less';
import { Icon, Table, message, Modal, Form, Input, Select, Statistic, Row, Col } from 'antd';
import { addDebet, totalDebet, debetInfo, deleteInfo } from '../../services/debet'

const { Option } = Select;

class Debets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      visible: false,
      isSelect: 'ant',
      ant: 0,
      card: [],
      debet: [],
      total: 0,
      repay: 0
    }
  }

  componentDidMount() {
    debetInfo({ id: localStorage.getItem('userId'), type: 'ant' }).then(res => {
      if (!res.code) {
        this.setState({
          ant: res.data[0].ant
        })
      }
    })
    totalDebet({ id: localStorage.getItem('userId') }).then(res => {
      if (!res.code) {
        let total = 0;
        res.data.map(item => {
          total += item.ant * 1
        })
        this.setState({
          total
        })
      }
    })
  }

  changeTabs = (i) => {
    this.setState({
      tab: i
    });
    const type = i == 0 ? 'ant' : i == 1 ? 'card' : 'debet'
    debetInfo({ id: localStorage.getItem('userId'), type }).then(res => {
      if (!res.code) {
        if (i == 0) {
          this.setState({
            ant: res.data[0].ant
          })
        } else if (i == 1) {
          this.setState({
            card: res.data
          })
        } else if (i == 2) {
          this.setState({
            debet: res.data
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

  handleDelete = (id) => {
    const { tab } = this.state
    const type = tab == 1 ? 'card' : 'debet'
    const columns = this.state[type].filter(item => {
      return item.id != id
    })
    deleteInfo({ id, type }).then(res => {
      if (!res.code) {
        message.success(res.msg, 2)
        this.setState({
          [type]: columns
        })
      }
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
        addDebet(params).then(res => {
          if (!res.code) {
            this.setState({
              visible: false
            })
            message.success(res.msg, 2)
            if (this.state.isSelect == 'ant' && this.state.tab == 0) {
              const ant = this.state.ant * 1 + values.price * 1
              this.setState({
                ant
              })
            } else if (this.state.isSelect == 'card' && this.state.tab == 1) {
              debetInfo({ id: localStorage.getItem('userId'), type: 'card' }).then(res => {
                this.setState({
                  card: res.data
                })
              })
            } else if (this.state.isSelect == 'debet' && this.state.tab == 2) {
              debetInfo({ id: localStorage.getItem('userId'), type: 'debet' }).then(res => {
                this.setState({
                  card: res.data
                })
              })
            }
          }
        })
        this.props.form.resetFields()
      }
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  render() {

    const tabs = [
      { index: 0, name: '花呗', icon: 'shopping' },
      { index: 1, name: '信用卡', icon: 'wallet' },
      { index: 2, name: '其他', icon: 'sketch' }
    ];

    const cardColumns = [
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
        title: '每月应还',
        dataIndex: 'month',
        key: 'month',
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) => <a onClick={() => this.handleDelete(record.id)}>删除</a>
      },
    ];

    const otherColumns = [
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

    const cardForm = <div>
      <Form.Item label="名称：">
        {getFieldDecorator('name')(<Input placeholder="请输入金额" />)}
      </Form.Item>
      <Form.Item label="每月应还：">
        {getFieldDecorator('month')(<Input placeholder="请输入每月应还" />)}
      </Form.Item>
    </div>

    const debetForm = <div>
      <Form.Item label="名称：">
        {getFieldDecorator('name')(<Input placeholder="请输入金额" />)}
      </Form.Item>
    </div>

    const { isSelect } = this.state;

    return (
      <div>
        <div className={styles.page}>
          <div className={styles.total}>
            <span>总债务</span>
            <strong>{this.state.total}</strong>
          </div>
          <div className={styles.output}>
            <span>本月应还</span>
            <strong>{this.state.repay}</strong>
          </div>
        </div>
        <div className={styles.tab}>
          {tabList}
        </div>
        <div className={styles.content}>
          <div className={tab == 0 ? styles.active : styles['tab-content']}>
            <Row>
              <Col span={8} offset={4}>
                <Statistic
                  title="应还："
                  value={this.state.ant}
                  precision={2}
                />
              </Col>
              <Col span={8} offset={4}>
                <Statistic
                  title="每月最低："
                  value={this.state.ant / 10}
                  precision={2}
                />
              </Col>
            </Row>
          </div>
          <div className={tab == 1 ? styles.active : styles['tab-content']}>
            <Table rowKey={record => record.id} columns={cardColumns} dataSource={this.state.card}></Table>
          </div>
          <div className={tab == 2 ? styles.active : styles['tab-content']}>
            <Table rowKey={record => record.id} columns={otherColumns} dataSource={this.state.debet}></Table>
          </div>
        </div>
        <div className={styles.plus} onClick={this.handleVisible}>
          <Icon style={{ fontSize: 35, color: "#1890ff" }} type="plus-circle" theme="filled" color="#1890ff" />
        </div>
        <Modal
          title="添加资产"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
        >
          <Form {...formItemLayout}>
            <Form.Item label="类型：">
              <Select defaultValue='ant' onChange={this.handleSelect}>
                <Option value="ant">花呗</Option>
                <Option value="card">信用卡</Option>
                <Option value="debet">其他</Option>
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
            {isSelect == 'ant' ? null : isSelect == 'card' ? cardForm : debetForm}
          </Form>
        </Modal>
      </div>
    )
  }
}

const Debet = Form.create()(Debets)
export default Debet;