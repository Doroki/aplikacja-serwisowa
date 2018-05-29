import React, {Component} from "react";
import "./form.css"

class NewNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <form className="container">
                <h2 className="header">Formularz zgłoszeniowy</h2>
                <div className="form-row">
                    <div className="col-6 form-input">
                        <label htmlFor="name">Imię</label>
                        <input type="text" className="form-control" id="name" placeholder="Podaj imię" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="surname">Nazwisko</label>
                        <input type="text" className="form-control" id="surname" placeholder="Podaj nazwisko" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="company">Firma</label>
                        <input type="text" className="form-control" id="company" placeholder="Podaj firmę" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="id-number">NIP</label>
                        <input type="text" className="form-control" id="id-number" placeholder="Podaj nr NIP" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="street">Ulica</label>
                        <input type="text" className="form-control" id="street" placeholder="Podaj ulicę" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="local-number">Nr lokalu</label>
                        <input type="text" className="form-control" id="local-number" placeholder="Podaj nr domu/lokalu" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="city">Miasto</label>
                        <input type="text" className="form-control" id="city" placeholder="Podaj miasto" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="postal-code">kod pocztowy</label>
                        <input type="text" className="form-control" id="postal-code" placeholder="Podaj kod pocztowy" />
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="textarea">Uwagi do zgłoszenia</label>
                        <select className="form-control" id="textarea" rows="5">
                            <option value="default">Wybierz temat...</option>
                            <option value="temat1">temat1</option>
                            <option value="temat2">temat2</option>
                        </select>
                    </div>
                    <div className="col-6 form-input">
                        <label htmlFor="textarea">Typ Zgłoszenia</label>
                        <select className="form-control" id="textarea" rows="5">
                            <option value="default">Wybierz rodzaj zgłosznia...</option>
                            <option value="Errors">Błąd</option>
                            <option value="Funcionalities">Nowa funkcjonalność</option>
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