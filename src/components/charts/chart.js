
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'mdbreact';


class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.colors = [
      `#b74242`,
      `#414bb7`,
      `#3fa342`
    ]

    this.state = {
      labels: ['Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesien', 'Październik', 'Listopad', 'Grudzien'],
      datasets: [
        {
          label: 'Wykres',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#848484',
          borderColor: '#848484',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#848484',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#848484',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }


  componentWillReceiveProps() {
    this.setState({datasets: this.loadData()})
  }

  loadData() {
    if(!this.props.data) return;

    let dataForChart = this.props.data.map((data, index) => {
      console.log(data.body)
      return {
        label: data.label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: this.colors[index],
        borderColor: this.colors[index],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: this.colors[index],
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.colors[index],
        pointHoverBorderColor: this.colors[index],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.body
      }
    })

    return dataForChart;
  }

  render() {
    return (
    <Container>
        <Line height={120} data={this.state} />
    </Container>
    );
  }
 
};

export default Chart;