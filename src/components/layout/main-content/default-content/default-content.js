import React, {Component} from "react";
import { Card, CardBody, CardTitle, CardText } from 'mdbreact';
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
        fetch(`https://aplikacja-wsb.herokuapp.com/api/count-notifications`)
        .then(response => response.json())
        .then(resp => {
            if(resp) {
                this.setState({chartData: resp})
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
                <div className="cards-wrapper statistics">
                    <Card>
                        <CardBody>
                            <CardTitle>Podsumowanie tegorocznych zgłoszen:</CardTitle>
                            <CardText>
                                Liczba zgłoszen reklamacji: {this.sumData(this.state.chartData.complains)} <br />
                                Liczba zgłoszen awarii: {this.sumData(this.state.chartData.issues)} <br />
                                Liczba zgłoszen funkcjonalności: {this.sumData(this.state.chartData.functionalities)}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
           </div>
        );
    }

}

export default DefaultContent;