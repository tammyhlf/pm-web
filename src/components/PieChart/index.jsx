import React , { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class PieChart extends Component {
  initChart = () => {
    const pieData = this.props.data;
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
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['餐饮', '服饰', '水果', '交通', '娱乐', '其他']
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieData,
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
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['餐饮', '服饰', '水果', '交通', '娱乐', '其他']
      },
      series: [
        {
          name: '收入',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieData,
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

