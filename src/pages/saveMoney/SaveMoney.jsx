import React from 'react';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './save.less';
import { Empty, Button } from 'antd';
import { getStar } from '../../services/star'

class SaveMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 0,
      plan: 0,
      content: '',
      starData: null
    };
  }
  componentDidMount() {
    const userId = localStorage.getItem('userId')
    getStar({ userId }).then(res => {
      this.setState({
        starData: res.data
      })
      if (!res.code && res.data) {
        this.setState({
          goal: res.data.goal,
          plan: res.data.plan,
          content: res.data.content
        })
      }
    })
  }


  handleSkip = () => {
    router.push('/save-money/save')
  }

  render() {
    return (
      <PageHeaderWrapper>
        {this.state.starData ?
          <div className={styles.header}>
            <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
            <div className={styles.line}></div>
            <div className={styles['index-star']}>
              <span>{this.state.content}</span>
            </div>
            <div className={styles.show}>
              <FormattedMessage id="asset.assetOverview.goal" />:
            <span>{this.state.goal}</span>
              <FormattedMessage id="asset.assetOverview.plan" />
              ：<span>{this.state.plan}</span>
              <span onClick={this.handleSkip}>></span>
            </div>
          </div>
          :
          <Empty
            image="/save/empty.gif"
            imageStyle={{
              height: 100,
            }}
            description={
              <span>
                <FormattedMessage id="asset.assetOverview.nostar" /> 
                <a href="#API">
                  <FormattedMessage id="asset.assetOverview.savestar" />
                </a>
              </span>
            }
          >
            <Button type="primary" onClick={this.handleSkip}><FormattedMessage id="asset.assetOverview.wish" /></Button>
          </Empty>}
      </PageHeaderWrapper>
    )
  }
};

export default SaveMoney
