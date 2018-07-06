import React, {Component} from "react";
import {Form, Row, Input, Select, Textarea, Submit} from '../../forms/form-components/form-components';
import PopUp from '../../pop-up-info/pop-up';
// import "./form.css"

class NewNotification extends Component {
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

        this.sendData(`http://wsb-aplikacja.herokuapp.com/api/new-${linkToSend}`, dataToSend)
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
            console.log(this.state.dataSend)
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
            <div className="w-100 container">
                {this.showPopUp()}
                <Form className="text-left">
                    <h2 className="header">Formularz zgłoszeniowy</h2>
                    <Row>
                        <Input id="1" type="number" label="Podaj nr klienta:" onChangeField={this.setFormData.bind(this)} target="clientID" value={this.state.clientID}/>
                        <Select id="2" label="Wybierz kategorie zgloszenia:" onChangeField={this.setFormData.bind(this)} target="type" value={this.state.type}>
                            <option value="">Wybierz rodzaj zgłosznia...</option>
                            <option value="zgloszenie">Zgłoszenie</option>
                            <option value="funkcjonalnosc">Nowa funkcjonalność</option>
                            <option value="reklamacje">Reklamacje</option>
                        </Select>
                    </Row>
                    <Row>
                        <Input id="1" type="number" label="Podaj numer zgłoszenia:" 
                            onChangeField={this.setFormData.bind(this)} 
                            target="issueNubmer" 
                            value={this.state.issueNubmer} 
                            disabled={(this.state.type !== "reklamacje") ? true : false}
                        />
                        <Select id="2" label="Wybierz oprogramowanie:" 
                            onChangeField={this.setFormData.bind(this)} 
                            target="program" 
                            value={this.state.program}
                            disabled={(this.state.type === "" || this.state.type === "reklamacje" ) ? true : false}
                            >
                            <option value="">Jakie oprogramowanie...</option>
                            <option value="1">Drukarz</option>
                            <option value="2">Mortes</option>
                            <option value="3">Inspector</option>
                        </Select>
                    </Row>
                    <Row>
                        <Select id="2" label="Wybierz katagorie problemu:" 
                        onChangeField={this.setFormData.bind(this)} 
                        target="category" 
                        value={this.state.category}
                        disabled={(this.state.type !== "zgloszenie" ) ? true : false}
                        >
                            <option value="">Wybierz katagorie problemu...</option>
                            <option value="1">Interfejs aplikacji</option>
                            <option value="2">Wyświetlanie danych</option>
                            <option value="3">Przetwarzanie danych</option>
                            <option value="4">Tworzenie dokumentów</option>
                            <option value="5">Przekazywanie informacji</option>
                            <option value="6">Inna...</option>
                        </Select>
                    </Row>
                    <Row>
                        <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="text" value={this.state.text}/>
                    </Row>
                    <Row className="text-center">
                        <Submit value="Zatwierdź" className="btn btn-primary btn-md" onAccept={this.sendNotification.bind(this)}/>
                        <Submit value="Wyczyść" className="btn btn-warning btn-md" onAccept={this.clearForm.bind(this)}/>
                    </Row>
                </Form>
            </div>
        );
    }

}

export default NewNotification;