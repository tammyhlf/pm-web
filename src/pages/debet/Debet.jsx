import React from 'react';
import styles from './debet.less';
import { Icon, Table } from 'antd';

const cardColumns = [
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
    title: '每月应还',
    dataIndex: 'month',
    key: 'month',
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

const otherColumns = [
  {
    title: '名称',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '每月应还',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: '操作',
    key: 'action',
    render: text => {
      <span>
        <FormattedMessage id="asset.assetOverview.delete" />
      </span>
    }
  },
];

class Debet extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tab: 0,
    }
  }

  changeTabs = (i) => {
    this.setState({
      tab: i
    });
  }

  render() {

    const tabs = [
      { index: 0, name: '花呗', icon: 'shopping' },
      { index: 1, name: '信用卡', icon: 'wallet' },
      { index: 2, name: '其他', icon: 'sketch' }
    ];
    
    const { tab } = this.state

    const tabList = tabs.map((item, i) => (
      <div className={styles.item} key={item.index} onClick={()=>{this.changeTabs(i)}}>
        <Icon type={item.icon} style = {{fontSize: 25, color:  tab == i ? '#1890ff' : '#001529'}} />
        <span style = {{color: tab == i ? '#1890ff' : '#001529'}}>{item.name}</span>
      </div>
    ))

    return (
      <div>
        <div className={styles.page}>
          <div className={styles.total}>
            <span>总债务</span>
            <strong>90.00</strong>
          </div>
          <div className={styles.output}>
            <span>本月应还</span>
            <strong>120.00</strong>
          </div>
        </div>
        <div className={styles.tab}>
          { tabList }
        </div>
        <div className={styles.content}>
          <div className={tab == 0 ? styles.active: styles['tab-content'] }>
          <p className={styles.balance}><span>应还：￥ 2000</span><span>每月最低：￥ 200</span></p>
          </div>
          <div className={tab == 1 ? styles.active: styles['tab-content'] }>
            <Table columns={cardColumns}></Table>
          </div>
          <div className={tab == 2 ? styles.active: styles['tab-content'] }>
          <Table columns={otherColumns}></Table>
          </div>
        </div>
        <div className={styles.plus}>
          <Icon style={{ fontSize: 50, color: "#1890ff" }} type="plus-circle" theme="filled" color="#1890ff" />
        </div>
      </div>
    )
  }
}

export default Debet;