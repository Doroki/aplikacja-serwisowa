import React, {Component} from "react";
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import Chart from '../../../charts/chart';
import "./default-content.css"

class DefaultContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                complains: [],
                issues: [],
                functionalities: []
            }
        };
    }
    
    fetchData() {
        fetch(`http://localhost:8080/api/count-notifications`)
        .then(response => response.json())
        .then(resp => {
            if(resp) {
                this.setState({chartData: resp})
                console.log(this.state)
                this.forceUpdate()
            }
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    sumData(data) {
        let sumOfData = 0;

        data.map(cell => sumOfData += Number(cell))

        return sumOfData
    }

    render() {
        return (
            <div>
                <h2 className="heading"> Lista Programów: </h2>
                <div className="cards-wrapper">
                    <Card>
                        <CardBody>
                            <CardTitle>System księgowy - Drukarz</CardTitle>
                            <CardText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem nostrum eum ipsum id dolore quasi laudantium, nisi assumenda quis sapiente.</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Rezerwacje hotelowe - Mortes</CardTitle>
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere perferendis tempora aliquam cum atque earum! Earum aperiam consectetur veniam beatae.</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Monitoring danych - Inspector</CardTitle>
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum doloribus modi soluta quasi atque? Natus iusto obcaecati ullam corporis velit.</CardText>
                        </CardBody>
                    </Card>
                </div>
                <h2 className="heading">Statystyki zgłoszen</h2>
                <Chart 
                    data = {[
                        {
                            label: "Reklamacje",
                            body: this.state.chartData.complains
                        },
                        {
                            label: "Awarie",
                            body: this.state.chartData.issues
                        },
                        {
                            label: "Funkcjonalności",
                            body: this.state.chartData.functionalities
                        }
                    ]}
                />
                <Card>
                    <CardBody>
                        <CardTitle>Podsumowanie tegorocznych zgłoszen:</CardTitle>
                        <CardText>
                            <p>Liczba zgłoszen reklamacji: {this.sumData(this.state.chartData.complains)}</p>
                            <p>Liczba zgłoszen awarii: {this.sumData(this.state.chartData.issues)}</p>
                            <p>Liczba zgłoszen funkcjonalności: {this.sumData(this.state.chartData.functionalities)}</p>
                        </CardText>
                    </CardBody>
                </Card>
           </div>
        );
    }

}

export default DefaultContent;