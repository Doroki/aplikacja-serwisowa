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
                <Card>
                    <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                    <CardBody>
                        <CardTitle>System księgowy - Drukarz</CardTitle>
                        <CardText>Jakiś przykładowy teks. krótki opis oprogramowania</CardText>
                        <Button className='btn-sm' href="#">Opis oprogramowania</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                    <CardBody>
                        <CardTitle>Rezerwacje hotelowe - Mortes</CardTitle>
                        <CardText>Jakiś przykładowy teks. krótki opis oprogramowania</CardText>
                        <Button className='btn-sm' href="#">Opis oprogramowania</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                    <CardBody>
                        <CardTitle>Nazwa oprogramowania</CardTitle>
                        <CardText>Jakiś przykładowy teks. krótki opis oprogramowania</CardText>
                        <Button className='btn-sm' href="#">Opis oprogramowania</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                    <CardBody>
                        <CardTitle>Nazwa oprogramowania</CardTitle>
                        <CardText>Jakiś przykładowy teks. krótki opis oprogramowania</CardText>
                        <Button className='btn-sm' href="#">Opis oprogramowania</Button>
                    </CardBody>
                </Card>
            </div>
                <Chart />
            </div>
        );
    }

}

export default DefaultContent;