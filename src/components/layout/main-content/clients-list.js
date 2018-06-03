import React, {Component} from "react";
import "./form.css";
import Table from "../../tabel/tabel"
import SearchForm from "../../forms/search-form/search-form";

class ClientList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h2 className="header">Lista Klientów</h2>
                <SearchForm elements={["Imię", "Nazwisko", "Firma", "Nr tel.", "E-mail", "Oprogramowanie"]}/>
                <Table 
                    headings = {["#", "Imię", "Nazwisko", "Firma", "Nr tel.", "E-mail", "Oprogramowanie"]} 
                    data = {[{imie: "Jan", nazwisko: "Kowalski", firma: "Corporate Sp. z o.o.", tel: "12346455", email: "testowy@email.com", Oprogramowanie: "System jakiś"}]}
                />
            </div>
        );
    }

}

export default ClientList;