import React from 'react';
import styles from './save.less';
import { Input } from 'antd';

const { TextArea } = Input;

class Save extends React.Component {
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
    return (
      <div>
        <div className={styles.content}>
          {/* <img src="/save/backs.png" alt=""/> */}
          <div className={styles.desire}>{listItems}</div>
          <div className={styles.desire}>{listItems1}</div>
        </div>
        <div className={styles.center}>
          <div className={styles['center-header']}>
            <img src="/save/starts.png" alt="start"/>
            <span></span>
            <p>我的星愿</p>
          </div>
          <TextArea placeholder="请闭眼三秒，然后认真许下你的星愿" rows={7} allowClear />
        </div>
        <div className={styles.goal}>
          <div className={styles['goal-star']}>
            <p>星愿目标</p>
            <Input style={{ width: 120 }}  size="large" prefix="￥" />
          </div>
          <div className={styles['goal-month']}>
            <p>每月计划</p>
            <Input style={{ width: 120 }} size="large" prefix="￥" />
          </div>
        </div>
        <div className={styles.btn}>
          <button>许愿</button>
        </div>
        
      </div>
    )
  }
};

export default Save;