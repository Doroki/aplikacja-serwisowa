import React, {Component} from "react";
import "./form.css";
import Table from "../../tabel/tabel"
import SearchForm from "../../forms/search-form/search-form";
import {Pagination, PageItem, PageLink} from "mdbreact"

class ComplainList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: "",

        };
    }

    saveModalData(obj) {
        const objToSend = obj;
        objToSend.tabel = "reklamacje";

        fetch('http://localhost:8080/api/update-notification', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
              if(res.update) {
                  console.log(this)
                  this.fetchData();
                //   this.setState({PopMessage: "Dobra robota! Zgłoszenie zostało pomyślnie wysłane", dataSend: true})
                } else {
                    // this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
                }
            })
    }

    
    findData(dataObj) {
        let queryString = "?";

        for (const key in dataObj) {
            if (dataObj.hasOwnProperty(key)) {
                const element = dataObj[key];
                if(queryString === "?"){
                    queryString += key + "=" + element;
                } else {
                    queryString += "&" + key + "=" + element;
                }
            }
        }

        this.fetchData(queryString)
    }

    getDirectData(data) {
        if(typeof data !== "object") return {};

        return [
            {title: "Nr reklamacji:", content: data.id_reklamacja},
            {title: "Nr klienta:", content: data.id_klienta},
            {title: "Firma:", content: data.firma},
            {title: "Reklamacja do sprawy nr:", content: data.zgloszenie},
            {title: "Stan zgłoszenia:", content: data.stan_reklamacji},
            {title: "Data Reklamacji:", content: data.data_reklamacji},
            {title: "Treść zgłoszenia:", content: data.tresc}
            // {title: "Adres:", content: data.adres}
        ]
    }

    sortData(key = 0) {
        let sortBy = this.state.dataKeys[key]
        let sortMethod = (this.state.dataSortBy === sortBy && this.state.dataSortMethod === "asc") ? "dsc" : "asc"; 
        let data = this.state.data;

        data.sort((a, b) => {
            if(a[sortBy] < b[sortBy]) {
                return (sortMethod==="asc") ? -1 : 1;
            } else if(a[sortBy] > b[sortBy]) {
                return (sortMethod==="asc") ? 1 : -1;
            } else {
                return 0;
            }
        });

        const paginationData = this.splitDataToPages(data);
        
        this.setState({
            data: data,
            pages: paginationData,
            dataSortMethod: sortMethod,
            dataSortBy: sortBy
        })
    };

    fetchData(extraValue) {
        fetch(`http://localhost:8080/api/complains${(extraValue) ? `${extraValue}` : ""}`)
        .then(response => response.json())
        .then(resp => {
            if (resp.data.length > 0) {
                let data = resp.data;
                let dataKeys = Object.getOwnPropertyNames(resp.data[0]);
                let pagesArr = this.splitDataToPages(data);

                this.setState({
                    data: resp.data,
                    dataKeys: dataKeys,
                    pages: pagesArr
                })
            } else {
                this.setState({
                    data: [],
                    pages: []
                })
            }
            
        });
    }

    componentDidMount() {
        this.fetchData();
    }


    splitDataToPages(data) { // Split saved data to pages for condition - there is more data objects than 10
        if(!data || data < 11) return;
        let mappingIterator = -1; // iterator created to help designate index of new page (Array)
        let pageArray = [];

        data.map(dataItem => {
            if(data.indexOf(dataItem) % 10 === 0) { // With every 5th element create new Page/Array and push it to main Array with index of iterator
                mappingIterator++; 
                const newPage = [];
                pageArray.push(newPage);
                pageArray[mappingIterator].push(dataItem);
            } else {
                pageArray[mappingIterator].push(dataItem);
            }
        });

        return pageArray;
    };

    loadData() {
        let index = this.state.actualPageNumber - 1;
        return this.state.pages[index];
    }

    updatePage(indexValue) {
        this.setState({actualPageNumber: indexValue});
    }


    createPages() {
        return (
            <React.Fragment>
                {this.state.pages.map((page, index) => {
                    return (
                        <PageItem 
                            key={`pageItem-${index}`}
                            className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                            onClick={this.updatePage.bind(this, index+1)}
                            >
                            <PageLink key={`pageLink-${index}`} className="page-link">
                                {index + 1}
                            </PageLink>
                        </PageItem>
                        )
                })}
            </React.Fragment>
        );
    };
    

    render() {
        return (
            <div>
                <h2 className="header">Zgłoszone reklamacje</h2>
                <SearchForm 
                    elements = {["Nr Reklamacji", "Nr złoszenia", "Nr klienta", "Firma", "Status"]}
                    onSubmitSearch = {this.findData.bind(this)}
                    dataKeys={this.state.dataKeys}/>
                <Table 
                    headings = {["Nr Reklamacji", "Nr złoszenia", "Nr klienta", "Firma", "Status", "Data"]} 
                    onHeadingClick={this.sortData.bind(this)} 
                    sortBy = {this.state.dataSortBy}
                    sortMethod = {this.state.dataSortMethod} 
                    dataKeys = {this.state.dataKeys}
                    data = {this.loadData()}
                    fetchData = {this.getDirectData} 
                    editable={true}
                    onSaveData={this.saveModalData.bind(this)}
                />
                <Pagination className="justify-content-center">

                        {this.createPages()}
                        
                </Pagination>
            </div>
        );
    }

}

export default ComplainList;