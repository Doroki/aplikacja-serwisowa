import React, {Component} from "react";
import styles from "./form.css"

class Complain extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            
            <form className="container">
                <h2 className="header">Formularz zgłoszeniowy</h2>
                    

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

export default Complain;