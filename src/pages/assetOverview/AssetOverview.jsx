import React from 'react';
import { Card, Statistic, Row, Col, Divider, Tabs, Icon, DatePicker } from 'antd';
import styles from './asset.less';

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;

export default () => (
  <div>
    <div className={styles.page}>
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="总资产：" value={112893} precision={2} />
      </Col>
      <Col span={12}>
        <Statistic title="昨日支出：" value={112893} precision={2} />
      </Col>
    </Row>
    </div>
    <Card>
      <Row gutter={16}>
        <Col span={12}>
        <p><strong>现金</strong></p>
          <Statistic value={112893} precision={2} />
        </Col>
        <Col span={6}>
          <Statistic title="本月支出：" value={112893} precision={2} />
        </Col>
        <Col span={6}>
          <Statistic title="本月收入：" value={112893} precision={2} />
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>存款</strong></p>
          <Statistic value={112893} precision={2} />
        </Col>
      </Row>
    </Card>
    <Tabs defaultActiveKey="2">
      <TabPane
        tab={
          <span>
            <Icon type="calendar" />
            流水账
          </span>
        }
        key="1"
      >
        <MonthPicker placeholder="请选择月份" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="pie-chart" />
            图表分析
          </span>
        }
        key="2"
      >
        Tab 2
      </TabPane>
    </Tabs>
  </div>
);
