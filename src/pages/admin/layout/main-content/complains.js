import React from "react";
import "./form.css";
import Table from "../../../../components/tabel/tabel"
import SearchForm from "../../../../components/forms/search-form/search-form";
import CustomPagination from "../../../../components/pagination/pagination";
import NotificationListPrototype from "../../../../components/notification-list-prototype/notificationListPrototype";

class ComplainList extends NotificationListPrototype {
    constructor(props) {
        super(props);

        this.dataUrl = 'http://aplikacja-wsb.herokuapp.com/api/complains'
        this.state = {
            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: "",

            showUpdated: null
        };
    }

    saveModalData(obj) {
        const objToSend = obj;
        objToSend.tabel = "reklamacje";

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
            {title: "Nr reklamacji:", content: data.id_reklamacja},
            {title: "Nr klienta:", content: data.id_klienta},
            {title: "Firma:", content: data.firma},
            {title: "Reklamacja do sprawy nr:", content: data.zgloszenie},
            {title: "Stan zgłoszenia:", content: data.stan_reklamacji},
            {title: "Data Reklamacji:", content: data.data_reklamacji},
            {title: "Treść zgłoszenia:", content: data.tresc},
            {title: "Uwagi serwisowe:", content: data.uwagi}
        ]
    }

    render() {
        return (
            <div>
                <h2 className={this.props.darkTheme ? 'heading darkTheme-title' : 'heading'} >Zgłoszone reklamacje</h2>
                <SearchForm 
                    elements = {["Nr Reklamacji", "Nr złoszenia", "Nr klienta", "Firma", "Status"]}
                    onSubmitSearch = {this.findData.bind(this)}
                    dataKeys={this.state.dataKeys}
                    />
                <Table 
                    headings = {["Nr Reklamacji", "Nr złoszenia", "Nr klienta", "Firma", "Status", "Data"]} 
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

export default ComplainList;