import React, {Component} from "react";
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import Chart from '../../../charts/chart';
import "./default-content.css"

class DefaultContent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
            <div className="cards-wrapper">
                {/* <h2>Lista programów:</h2> */}
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
            </div>
        );
    }

}

export default DefaultContent;