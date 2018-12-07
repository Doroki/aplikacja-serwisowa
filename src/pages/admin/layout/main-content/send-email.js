import React, {Component} from "react";
import {Form, Row, Input, Textarea, Submit} from '../../../../components/forms/form-components/form-components';
import PopUp from '../../../../components/pop-up-info/pop-up';

class SendEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSend: null,
            PopMessage: null,
            emailTo: this.getEmail() || "",
            topic: "",
            content: ""
        };
    }

    getEmail() {
        const url = window.location.href
        const email = url.split('?')[1]

        return email || ""
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

    validateData() {
        let validFlag = true

        const emptyFieldRegEx = /(\S)+.*/
        const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

        if (!emailRegEx.test(this.state.emailTo)) {
            validFlag = false
        } 
        
        if (!emptyFieldRegEx.test(this.state.topic)) {
            validFlag = false
        } 
        
        if (!emptyFieldRegEx.test(this.state.content)) {
            validFlag = false
        }

        return validFlag
    }

    sendEmail() {
        if (this.validateData()) {
            this.sendData(`https://aplikacja-wsb.herokuapp.com/api/send-email`, {
                to: this.state.emailTo,
                subject: this.state.topic,
                text: this.state.content
            }).then(() => this.showPopUp())
        } else {
            this.setState({PopMessage: "Uzupełnij wszystkie pola", dataSend: false})
            this.showPopUp()
        }
    }

    sendData(url, data) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
              if(res.mailSend) {
                  this.clearForm();
                  this.setState({PopMessage: "Wysłano pomyślnie wiadomość", dataSend: true})
                } else {
                    this.setState({PopMessage: "Nie udało się wysłać wiadomości !", dataSend: false})
                }
            })
            .catch(err => {
                this.setState({PopMessage: "Przepraszamy, problemy z serwerem", dataSend: false})
                this.showPopUp()
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
                <Form className={`text-left + ${this.props.darkTheme ? "darkTheme-form" : ""}`}>
                    <h2 className="header">Wiadomość E-mail</h2>
                    <Row>
                        <Input id="1" type="text" label="Do: (adres e-mail)" onChangeField={this.setFormData.bind(this)} target="emailTo" value={this.state.emailTo}/>
                    </Row>
                    <Row>
                        <Input id="1" type="text" label="Temat wiadomości:" onChangeField={this.setFormData.bind(this)} target="topic" value={this.state.topic}/>
                    </Row>
                    <Row>
                        <Textarea label="Treść wiadomości:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="content" value={this.state.content}/>
                    </Row>
                    <Row className="text-center">
                        <Submit value="Wyślij" className="btn btn-primary btn-md" onAccept={this.sendEmail.bind(this)}/>
                    </Row>
                </Form>
            </div>
        );
    }

}

export default SendEmail;