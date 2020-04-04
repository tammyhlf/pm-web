import React from 'react';
import { Card, Statistic, Row, Col, Divider, Tabs, Icon, DatePicker, Table, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PieChart from '../../components/PieChart'
import styles from './asset.less';
import { overview } from '../../services/overview'
import { bookInfo, deleteInfo } from '../../services/book'
import { totalAssets } from '../../services/assets'
import { totalDebet } from '../../services/debet'

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;


function formatsDate (date) {
  return date.slice(0, 10);
}


class AssetOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: new Date(),
      columnData: [],
      yesPay: '',
      payData: [],
      incomeData: [],
      total: 0,
      pay: 0,
      income: 0,
      cash: 0,
      debet: 0
    };
  }
  componentDidMount() {
    bookInfo({ userId : localStorage.getItem('userId') }).then(res=>{
      if (!res.code) {
        this.setState({
          columnData: res.data[0],
          payData: res.data[1],
          incomeData: res.data[2]
        })
      }
    })
    overview({ userId : localStorage.getItem('userId') }).then(res=>{
      if(!res.code) {
        this.setState({
          yesPay: res.data[0].yesPay,
          pay: res.data[1].pay,
          income: res.data[2].income
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
          total,
          cash: res.data[0].cash
        })
      }
    })
    totalDebet({ id : localStorage.getItem('userId') }).then(res=>{
      if (!res.code) {
        let total = 0;
        res.data.map(item => {
          total += item.ant * 1
        })
        this.setState({
          debet: total
        })
      }
    })
  }

  onChange = (date, dateString) => {
    bookInfo({ userId : localStorage.getItem('userId'), time: dateString.slice(0,7) }).then(res=>{
      this.setState({
        columnData: res.data[0],
        payData: res.data[1],
        incomeData: res.data[2]
      })
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
        title: formatMessage({ id: 'asset.assetOverview.type' }),
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: formatMessage({ id: 'asset.assetOverview.price' }),
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: formatMessage({ id: 'asset.assetOverview.remark' }),
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: formatMessage({ id: 'asset.assetOverview.date' }),
        dataIndex: 'date',
        key: 'date',
        render: date => <span>{ formatsDate(date) }</span>,
      },
      {
        title: formatMessage({ id: 'asset.assetOverview.action' }),
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
          <div className={styles.total}>
            <span><FormattedMessage id="asset.assetOverview.total-assets" /></span>
            <strong>{this.state.total}</strong>
          </div>
          <div className={styles.output}>
            <span><FormattedMessage id="asset.assetOverview.expenditure" /></span>
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
              <Statistic value={this.state.cash || 0} precision={2} />
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
              {/* 总债务 */}
              <Statistic value={this.state.debet || 0} precision={2} />
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
