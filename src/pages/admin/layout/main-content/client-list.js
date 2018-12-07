import React from "react";
import "./form.css";
import Table from "../../../../components/tabel/tabel"
import SearchForm from "../../../../components/forms/search-form/search-form";
import CustomPagination from "../../../../components/pagination/pagination";
import NotificationListPrototype from "../../../../components/notification-list-prototype/notificationListPrototype";

class ClientList extends NotificationListPrototype {
    constructor(props) {
        super(props);

        this.dataUrl = 'http://aplikacja-wsb.herokuapp.com/api/client-list'
        this.state = {
            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: ""
        };
    }

    getDirectData(data) {
        if(typeof data !== "object") return {};

        return [
            {title: "Nr Klienta:", content: data.id_klienta},
            {title: "Firma:", content: data.firma},
            {title: "NIP:", content: data.nip},
            {title: "Nr tel.:", content: data.nr_tel},
            {title: "Kupiony program:", content: data.program},
            {title: "E-mail:", content: data.e_mail},
            {title: "Adres:", content: data.adres}
        ]
    }

    render() {
        return (
            <div>
                <h2 className={this.props.darkTheme ? 'heading darkTheme-title' : 'heading'} > Lista Klientów </h2>
                <SearchForm
                    className={this.props.darkTheme ? 'darkTheme-card' : ''} 
                    elements = {["Nr klienta", "Firma", "NIP", "Nr tel.", "Program"]}
                    onSubmitSearch = {this.findData.bind(this)}
                    dataKeys={this.state.dataKeys}
                    />
                <Table
                    headings = {["Nr klienta", "Firma", "NIP", "Nr tel.", "Program"]}
                    onHeadingClick={this.sortData.bind(this)} 
                    sortBy = {this.state.dataSortBy}
                    sortMethod = {this.state.dataSortMethod} 
                    dataKeys = {this.state.dataKeys}
                    data = {this.loadData()}
                    fetchData = {this.getDirectData} 
                />
                <CustomPagination
                    actualPageNumber={this.state.actualPageNumber}
                    updatePage={this.updatePage.bind(this)}
                    pages={this.state.pages}
                />

            </div>
        );
    }

}

export default ClientList;