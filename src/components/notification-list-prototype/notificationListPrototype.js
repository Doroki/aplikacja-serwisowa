import {Component} from "react";

class NotificationListPrototype extends Component {
    constructor(props) {
        super(props);

        this.dataUrl = ''
        this.state = {
            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: ""
        };
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

        this.fetchData(queryString);
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
        fetch(extraValue ? `${this.dataUrl}${extraValue}` : `${this.dataUrl}`)
        .then(response => response.json())
        .then(resp => {
            if (resp.data.length > 0) {
                let data = resp.data;
                let dataKeys = Object.getOwnPropertyNames(resp.data[0]);
                let pagesArr = this.splitDataToPages(data);

                this.setState({
                    data: resp.data,
                    dataKeys: dataKeys,
                    pages: pagesArr,
                    actualPageNumber: 1
                })
            } else {
                this.setState({
                    data: [],
                    pages: [],
                    actualPageNumber: 1
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

            return null;
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
}

export default NotificationListPrototype
