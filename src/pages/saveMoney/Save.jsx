import React, { useState, useEffect } from 'react';
import styles from './save.less';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { InputNumber, Form, Input, message, Row, Col } from 'antd';
import { saveStar, getStar } from '../../services/star'

const { TextArea } = Input;

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starData: ''
    };
  }
  componentDidMount() {
    const userId = localStorage.getItem('userId')
    getStar({ userId }).then(res => {
      this.setState({
        starData: res.data
      })
      if (!res.code && res.data) {
        this.props.form.setFieldsValue({
          content: res.data.content,
          goal: res.data.goal,
          plan: res.data.plan
        });
      }
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const userId = localStorage.getItem('userId')
      if (!err) {
        const params = Object.assign(values, { userId })
        saveStar(params).then(res => {
          if (!res.code) {
            message.success(res.msg, 2);
          }
        })
        this.props.form.resetFields()
        router.push('/save-money')
      }
    })
  }

  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      const userId = localStorage.getItem('userId')
      if (!err) {
        const params = Object.assign(values, { userId })
        update(params).then(res => {
          if (!res.code) {
            message.success(res.msg, 2);
          }
        })
        this.props.form.resetFields()
        router.push('/save-money')
      }
    })
  }

  render() {
    const desireList = [
      '#我的2020星愿',
      '#给自己的人生充电',
      '#给未来的自己',
      '#给TA一个浪漫的惊喜',
      '#给自己的礼物',
      '#送给亲爱的TA',
      '#青春是一趟说走就走的旅行',
      '#总有一天要把它买回家',
      '#是时候犒劳一下自己了',
      '#这辈子一定要去的地方',
    ]
    const desireList1 = [
      '#送给亲爱的TA',
      '#青春是一趟说走就走的旅行',
      '#总有一天要把它买回家',
      '#是时候犒劳一下自己了',
      '#这辈子一定要去的地方',
      '#我的2020星愿',
      '#给自己的人生充电',
      '#给未来的自己',
      '#给TA一个浪漫的惊喜',
      '#给自己的礼物',
    ]
    const listItems = desireList.map((item, index) =>
      <span key={index}>{item}</span>
    );
    const listItems1 = desireList1.map((item, index) =>
      <span key={index}>{item}</span>
    );
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className={styles.content}>
          {/* <img src="/save/backs.png" alt=""/> */}
          <div className={styles.desire}>{listItems}</div>
          <div className={styles.desire}>{listItems1}</div>
        </div>
        <div className={styles.center}>
          <div className={styles['center-header']}>
            <img src="/save/starts.png" alt="start" />
            <span></span>
            <p><FormattedMessage id="asset.assetOverview.star" /></p>
          </div>
        </div>
        <Form>
          <Form.Item>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入你的星愿!' }],
            })(
              <TextArea
                placeholder={formatMessage({ id: 'asset.assetOverview.three' })}
                rows={7}
                allowClear
              />
            )}
          </Form.Item>
          <Row>
            <Col span={6} offset={3}>
              <Form.Item label={formatMessage({ id: 'asset.assetOverview.sgoal' })}>
                {getFieldDecorator('goal', {
                  rules: [{ required: true, message: '请输入你的目标!' }],
                })(
                  <InputNumber style={{ width: 120 }} size="large" prefix="￥" />
                )}
              </Form.Item>
            </Col>
            <Col span={6} offset={3}>
              <Form.Item label={formatMessage({ id: 'asset.assetOverview.mplan' })}>
                {getFieldDecorator('plan', {
                  rules: [{ required: true, message: '请输入你的计划!' }],
                })(
                  <InputNumber style={{ width: 120 }} size="large" prefix="￥" />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={styles.btn}>
          { this.state.starData ? 
            <button onClick={this.handleSubmit}><FormattedMessage id="asset.assetOverview.makestar" /></button> :
            <button onClick={this.handleUpdate}><FormattedMessage id="asset.assetOverview.mstar" /></button>
          }
        </div>
      </div>
    )
  }






};

const save = Form.create({ name: 'star_form' })(Star)

export default save;