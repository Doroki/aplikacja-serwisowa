import React, {Component} from "react";
import "./form.css";
import Table from "../../tabel/tabel"
import SearchForm from "../../search-form/search-form";

class Functionalities extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h2 className="header">Złoszenia nowych funkcjonalności</h2>
                <SearchForm elements={["Imię", "Nazwisko", "Firma", "Nr tel.", "E-mail", "Nr sprawy"]}/>
                <Table 
                    headings = {["#", "Imię", "Nazwisko", "Firma", "Nr tel.", "E-mail", "Nr sprawy"]} 
                    data = {[{imie: "Jan", nazwisko: "Kowalski", firma: "Corporate Sp. z o.o.", tel: "12346455", email: "testowy@email.com", nr_sprawy: "C1E-1233456"}]}
                />
            </div>
        );
    }

}

export default Functionalities;