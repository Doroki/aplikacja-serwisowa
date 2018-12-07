import React, {Component} from "react";
import {Form, Row, Input, Textarea, Submit} from '../../../../components/forms/form-components/form-components';
import PopUp from '../../../../components/pop-up-info/pop-up';

class SendEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSend: null,
            PopMessage: null,
            type: "",
            clientID: "",
            issueNubmer: "",
            program: "",
            category: "",
            text: ""
        };
    }

    setFormData(property, value) {
        this.setState({[property]: value});
    }

    clearForm(){
        for(const key in this.state) {
            if(key === "dataSend" && key === "PopMessage") continue;
            this.setState({[key]: ""});
        }
    }

    sendNotification() {
        let dataToSend = {};
        let linkToSend = "";

        if(this.state.type === "zgloszenie") {
            linkToSend = "issue";
            dataToSend = {
                id: this.state.clientID, 
                category: this.state.category, 
                program: this.state.program, 
                text: this.state.text
            }
        } else if(this.state.type === "reklamacje") {
            linkToSend = "complain";
            dataToSend = {
                id: this.state.clientID, 
                issueNubmer: this.state.issueNubmer, 
                text: this.state.text
            }
        } else if(this.state.type === "funkcjonalnosc") {
            linkToSend = "functionality";
            dataToSend = {
                id: this.state.clientID, 
                program: this.state.program, 
                text: this.state.text
            }
        }

        if (dataToSend.hasOwnProperty("id")) {
            for (const key in dataToSend) {
                if (dataToSend.hasOwnProperty(key)) {
                    const element = dataToSend[key];
                    if(element === "") {
                        this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
                        return;
                    } 
                } 
            } 
        } else {
            this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
            return;
        } 

        this.sendData(`https://aplikacja-wsb.herokuapp.com/api/new-${linkToSend}`, dataToSend)
    }

    sendData(url, data) {
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
              if(res.done) {
                  this.clearForm();
                  this.setState({PopMessage: "Dobra robota! Zgłoszenie zostało pomyślnie wysłane", dataSend: true})
                } else {
                    this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
                }
            })
        }
        
        showPopUp() {
        if(this.state.dataSend === true) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="success"/>;
        } else if(this.state.dataSend === false) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="fail"/>;
        } 
    }

    render() {
        return (
            <div className={this.props.darkTheme ? 'heading darkTheme-title' : 'heading'} >
                {this.showPopUp()}
                <Form className="text-left">
                    <h2 className="header">Formularz zgłoszeniowy</h2>
                    <Row>
                        <Input id="1" type="number" label="Do: (adres e-mail)" />
                    </Row>
                    <Row>
                        <Input id="1" type="number" label="Temat wiadomości:" />
                    </Row>
                    <Row>
                        <Textarea label="Treść wiadomości:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="text" value={this.state.text}/>
                    </Row>
                    <Row className="text-center">
                        <Submit value="Wyślij" className="btn btn-primary btn-md" onAccept={this.sendNotification.bind(this)}/>
                    </Row>
                </Form>
            </div>
        );
    }

}

export default SendEmail;