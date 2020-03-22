import React , { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class PieChart extends Component {
  initChart = () => {
    const { payData } = this.props;
    const { incomeData } = this.props;

    var payChart = echarts.init(document.getElementById('pay'));
    var incomeChart = echarts.init(document.getElementById('income'));
    payChart.setOption ({
      title: {
        text: '支出',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: payData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    incomeChart.setOption ({
      title: {
        text: '收入',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '收入',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: incomeData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  };
  componentDidMount() {
    this.initChart();
  }
  componentDidUpdate() {
    this.initChart();
  }
  render() {
    return (
      <div>
        <div id="pay" style={{ width:'50%', height:311, display:'inline-block' }}></div>
        <div id="income" style={{ width:'50%', height:311, display:'inline-block' }}></div>
      </div>
    )
  }
}

