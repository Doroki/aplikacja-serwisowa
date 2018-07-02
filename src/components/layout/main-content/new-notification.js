import React, {Component} from "react";
import "./form.css"

class NewNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    addNotification() {
        
    }

    render() {
        return (
            <form className="container">
                <h2 className="header">Formularz zgłoszeniowy</h2>
                <div className="form-row">
                    <div className="col-6 form-input">
                        <label htmlFor="id-number">Nr Klienta</label>
                        <input type="text" className="form-control" id="id-number" placeholder="Podaj nr NIP" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="company">Firma</label>
                        <input type="text" className="form-control" id="company" placeholder="Podaj firmę" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="appType">Typ Zgłoszenia</label>
                        <select className="form-control" id="appType">
                            <option value="default">Wybierz rodzaj zgłosznia...</option>
                            <option value="Errors">Zgloszenia</option>
                            <option value="Funcionalities">Funkcjonalnosc</option>
                            <option value="Funcionalities">Reklamacje</option>
                        </select>
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="program">Rodzaj oprogramowania</label>
                        <select className="form-control" id="program">
                            <option value="default">Wybierz temat...</option>
                            <option value="1">Program1</option>
                            <option value="2">Program2</option>
                            <option value="3">Program3</option>
                        </select>
                    </div>
                    <div className="col form-input">
                        <label htmlFor="info">Uwagi do zgłoszenia</label>
                        <select className="form-control" id="info">
                            <option value="default">Wybierz temat...</option>
                            <option value="1">temat1</option>
                            <option value="2">temat2</option>
                            <option value="3">temat3</option>
                            <option value="4">temat4</option>
                            <option value="5">temat5</option>
                        </select>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="textarea">Uwagi do zgłoszenia</label>
                    <textarea className="form-control" id="textarea" rows="5" placeholder="Wpisz uwagi do zgłoszenia..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-md">Zatwierdź</button>
                <button type="" className="btn btn-warning btn-md">Wyczyść</button>
            </form>
        );
    }

}

export default NewNotification;