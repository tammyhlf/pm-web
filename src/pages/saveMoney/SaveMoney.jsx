import React from 'react';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './save.less';
import { Empty, Button } from 'antd';

class SaveMoney extends React.Component {
  handleSkip = () => {
    router.push('/save-money/save')
  }

  render() {
    return (
      <PageHeaderWrapper>
        {/* <div className={styles.header}>
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
          <div className={styles.line}></div>
          <div className={styles['index-star']}>
            <span>我要去大西北</span>
          </div>
          <div className={styles.show}>
            目标：<span>2000</span>
            已攒：<span>100</span>
            <span>详情-></span>
          </div>
        </div> */}

        <Empty
          image="/save/empty.gif"
          imageStyle={{
            height: 100,
          }}
          description={
            <span>
              暂无星愿！ <a href="#API">快来为为星愿攒钱吧</a>
            </span>
          }
        >
          <Button type="primary" onClick = { this.handleSkip }>许个星愿</Button>
        </Empty>
      </PageHeaderWrapper>
    )
  }
};

export default SaveMoney;
