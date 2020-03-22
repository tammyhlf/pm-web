import React from 'react';
import { Card, Statistic, Row, Col, Divider, Tabs, Icon, DatePicker, Table, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PieChart from '../../components/PieChart'
import styles from './asset.less';
import { overview } from '../../services/overview'
import { bookInfo, deleteInfo } from '../../services/book'
// import { overview } from '@/services/overview';

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;


function formatsDate (date) {
  return date.slice(0, 10);
}

function formatsMonth (date) {
  return date.slice(0, 7);
}


class AssetOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: new Date(),
      billData: [],
      columnData: [],
      yesPay: '',
      payData: [],
      incomeData: []
    };
  }
  componentDidMount() {
    bookInfo({ userId : localStorage.getItem('userId') }).then(res=>{
      if(!res.code) {
        const payData = []
        const incomeData = [{ value: 0 , name: ' ' }]
        const pay = res.data.filter(item => {
          return item.kinds == "支出"
        })
        pay.map( items => {
          payData.push({ value: items.price, name: items.type })
        } )

        const income = res.data.filter(item => {
          return item.kinds == "收入"
        })
        income.map( items => {
          incomeData.push({ value: items.price, name: items.type })
        } )

        this.setState({
          billData: res.data,
          columnData: res.data,
          payData,
          incomeData
        })
      }
    })
    overview({ userId : localStorage.getItem('userId') }).then(res=>{
      if(!res.code) {
        this.setState({
          yesPay: res.data.yesPay
        })
      }
    })
  }

  onChange = (date, dateString) => {
    const billDatas = this.state.billData;
    let columnDatas = []
    billDatas.map(item => {
      if(formatsMonth(item.date) == dateString) {
        columnDatas.push(item)
      }
    })
    this.setState({
      columnData: columnDatas
    })
  }

  handleDelete(id) {
    deleteInfo({ billsId: id }).then(res => {
      if (!res.code) {
        message.success(res.msg, 2)
        const columns = this.state.columnData.filter(item => {
          return item.bills_id != id
        })
        this.setState({
          columnData: columns
        })
      } else {
        message.error(res.msg, 2)
      }
    })
  }

  render() {
    const columns = [
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '金额',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        render: date => <span>{ formatsDate(date) }</span>,
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: '',
        render: (text, record) => 
          <a onClick={() => this.handleDelete(record['bills_id'])}>
            <FormattedMessage id="asset.assetOverview.delete" />
          </a>
      },
    ];
    return (
      <div>
        <div className={styles.page}>
          {/* <Statistic title={formatMessage({ id: 'asset.assetOverview.total-assets' })} value={112893} precision={2} />
          <Statistic title={formatMessage({ id: 'asset.assetOverview.yesterday-expenditure' })} value={112893} precision={2} /> */}
          <div className={styles.total}>
            <span>总资产</span>
            <strong>90.00</strong>
          </div>
          <div className={styles.output}>
            <span>今日支出</span>
            <strong>{this.state.yesPay || 0}</strong>
          </div>
        </div>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <p>
                <strong>
                  <FormattedMessage id="asset.assetOverview.cash" />
                </strong>
              </p>
              <Statistic value={113} precision={2} />
            </Col>
            <Col span={6}>
              <Statistic
                title={formatMessage({ id: 'asset.assetOverview.month-expenditure' })}
                value={this.state.pay || 0}
                precision={2}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={formatMessage({ id: 'asset.assetOverview.month-revenue' })}
                value={this.state.income || 0}
                precision={2}
              />
            </Col>
          </Row>
          <Divider dashed />
          <Row gutter={16}>
            <Col span={12}>
              <p>
                <strong>
                  {formatMessage({ id: 'asset.assetOverview.deposit' })}
                </strong>
              </p>
              <Statistic value={93} precision={2} />
            </Col>
          </Row>
        </Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="calendar" />
                {formatMessage({ id: 'asset.assetOverview.bill' })}
              </span>
            }
            key="1"
          >
            <MonthPicker onChange={this.onChange} placeholder={formatMessage({ id: 'asset.assetOverview.month-selection' })} className={styles.months} />
            <Table
              columns={columns}
              dataSource={ this.state.columnData }
              rowKey={record => record['bills_id']} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="pie-chart" />
                {formatMessage({ id: 'asset.assetOverview.chart' })}
              </span>
            }
            key="2"
          >
            <PieChart payData={this.state.payData} incomeData={this.state.incomeData} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
};

export default AssetOverview
