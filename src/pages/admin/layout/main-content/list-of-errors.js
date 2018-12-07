import React from "react";
import "./form.css";
import Table from "../../../../components/tabel/tabel"
import SearchForm from "../../../../components/forms/search-form/search-form";
import CustomPagination from "../../../../components/pagination/pagination";
import NotificationListPrototype from "../../../../components/notification-list-prototype/notificationListPrototype";

class ErrorList extends NotificationListPrototype {
    constructor(props) {
        super(props);

        this.dataUrl = 'http://aplikacja-wsb.herokuapp.com/api/issues'
        this.state = {
            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: ""
        };
    }

    saveModalData(obj) {
        const objToSend = obj;
        objToSend.tabel = "zgloszenia";

        fetch('https://aplikacja-wsb.herokuapp.com/api/update-notification', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
              if(res.update) {
                  this.fetchData();
                  this.setState({showUpdated: true});
                } else {
                    this.setState({showUpdated: false});
                }
            })
    }

    getDirectData(data) {
        if(typeof data !== "object") return {};

        this.setState({showUpdated: null});
        
        return [
            {title: "Nr reklamacji:", content: data.id_zgloszenia},
            {title: "Nr klienta:", content: data.id_klienta},
            {title: "Firma:", content: data.firma},
            {title: "Oprogramowanie:", content: data.program},
            {title: "Stan zgłoszenia:", content: data.stan_zgloszenia},
            {title: "Data zgłoszenia:", content: data.data_zgloszenia},
            {title: "Treść zgłoszenia:", content: data.tresc},
            {title: "Uwagi serwisowe:", content: data.uwagi}
        ]
    }

    render() {
        return (
            <div>
                <h2 className={this.props.darkTheme ? 'heading darkTheme-title' : 'heading'} >Zgłoszone błędy</h2>
                <SearchForm 
                    elements = {["Nr zgloszenia", "Nr Klienta", "Firma", "Kategoria", "Oprogramowanie", "Stan"]}
                    onSubmitSearch = {this.findData.bind(this)}
                    dataKeys={this.state.dataKeys}               
                />
                <Table 
                    headings = {["Nr zgloszenia", "Nr Klienta", "Firma", "Kategoria", "Oprogramowanie", "Stan", "Data"]} 
                    onHeadingClick={this.sortData.bind(this)} 
                    sortBy = {this.state.dataSortBy}
                    sortMethod = {this.state.dataSortMethod} 
                    dataKeys = {this.state.dataKeys}
                    data = {this.loadData()}
                    fetchData = {this.getDirectData.bind(this)} 
                    editable={true}
                    updated={this.state.showUpdated}
                    onSaveData={this.saveModalData.bind(this)}
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

export default ErrorList;