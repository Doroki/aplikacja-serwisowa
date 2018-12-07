
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
      datasets: []
    };
  }


  componentWillReceiveProps() {
    this.setState({datasets: this.loadData()})
  }

  loadData() {
    if(!this.props.data) return;

    let dataForChart = this.props.data.map((data, index) => {
      return {
        label: data.label,
        fill: false,
        lineTension: 0.3,
        backgroundColor: this.colors[index],
        borderColor: this.colors[index],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: this.colors[index],
        pointBackgroundColor: '#ccc',
        pointBorderWidth: 4,
        pointHoverRadius: 4,
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
    <Container className={this.props.darkTheme ? "darkTheme-chart" : ""}>
        <Line height={120} data={this.state} />
    </Container>
    );
  }
 
};

export default Chart;