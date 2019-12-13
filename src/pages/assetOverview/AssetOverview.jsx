import React from 'react';
import { Card, Statistic, Row, Col, Divider, Tabs, Icon, DatePicker, Table } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import styles from './asset.less';

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;
const columns = [
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

export default () => (
  <div>
    <div className={styles.page}>
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title={formatMessage({ id: 'asset.assetOverview.total-assets' })} value={112893} precision={2} />
      </Col>
      <Col span={12}>
        <Statistic title={formatMessage({ id: 'asset.assetOverview.yesterday-expenditure' })} value={112893} precision={2} />
      </Col>
    </Row>
    </div>
    <Card>
      <Row gutter={16}>
        <Col span={12}>
        <p><strong><FormattedMessage id="asset.assetOverview.cash" /></strong></p>
          <Statistic value={112893} precision={2} />
        </Col>
        <Col span={6}>
          <Statistic title={formatMessage({ id: 'asset.assetOverview.month-expenditure' })} value={112893} precision={2} />
        </Col>
        <Col span={6}>
          <Statistic title={formatMessage({ id: 'asset.assetOverview.month-revenue' })} value={112893} precision={2} />
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>{formatMessage({ id: 'asset.assetOverview.deposit' })}</strong></p>
          <Statistic value={112893} precision={2} />
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
        <MonthPicker placeholder={formatMessage({ id: 'asset.assetOverview.month-selection' })} className={styles.months} />
        <Table columns={columns} />
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
        Tab 2
      </TabPane>
    </Tabs>
  </div>
);
