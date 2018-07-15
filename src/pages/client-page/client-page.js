import React, { Component } from 'react';
import {Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';
import './client-page.css';
import {Tab, TabBody, TabContainer, TabList, TabPanel} from '../../components/tab-container/tab-container';
import {Form, Row, Input, Select, Textarea, Submit} from '../../components/forms/form-components/form-components';
import PopUp from '../../components/pop-up-info/pop-up';
import Table from "../../components/tabel/tabel";
import CustomPagination from "../../components/pagination/pagination";
import SearchForm from "../../components/forms/search-form/search-form";

class ClientPage extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            userName: this.props.userName,
            activeTab: "1",
            dropdownOpen: false,
            dataSend: null,
            PopMessage: "",
            clientData: "",
            
            //Data to send
            id: this.props.userID,
            issueNubmer: "",
            program: "",
            category: "",
            text: "",

            data: [],
            dataKeys: [],
            pages: [],
            actualPageNumber: 1,
            dataSortMethod: "",
            dataSortBy: ""

        }
        
        this.toggle = this.toggle.bind(this);
        this.getDirectData = this.getDirectData.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

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

    fetchData(extraValue) {
        fetch(`http://aplikacja-wsb.herokuapp.com/api/client-issues${(extraValue) ? `${extraValue}` : ""}`)
        .then(response => response.json())
        .then(resp => {
            if (resp.data.length > 0) {
                let data = resp.data;
                let pagesArr = this.splitDataToPages(data);

                this.setState({
                    data: resp.data,
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
        this.getNotifications();
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

    getDirectData(data) {
        if(typeof data !== "object") return {};
        let id;
        let stan;
        let dataZgłoszenia;
        switch(data.type) {
            case 'Awaria':
                id = data.id_zgloszenia;
                stan = data.stan_zgloszenia;
                dataZgłoszenia = data.data_zgloszenia;
            break;
            case 'Reklamacja':
                id = data.id_reklamacja;
                stan = data.stan_reklamacji;
                dataZgłoszenia = data.data_reklamacji;
                break;
            case 'Funkcjonalność':
                id = data.id_funkcjonalnosc;
                stan = data.stan_funkcjonalnosc;
                dataZgłoszenia = data.data_funkcjonalnosc;
                break;
            default :
                break;
        }
        return (id) ? [
            {title: "Typ zgłoszenia:", content: data.type},
            {title: "ID zgłoszenia:", content: id},
            {title: "Stan zgłoszenia:", content: stan},
            {title: "Data zgłoszenia:", content: dataZgłoszenia},
            {title: "Treść zgłoszenia:", content: data.tresc},
            {title: "Uwagi serwisowe:", content: data.uwagi}
        ] :
        [
            {title: "Treść zgłoszenia:", content: data.tresc},
            {title: "Uwagi serwisowe:", content: data.uwagi}
        ]
    }

    selectTab(e) {
        e.preventDefault();
        if(e.target.localName !== "a") return;
        if(e.target.dataset.targetTab === "5") this.fetchData();
        if(e.target.dataset.targetTab === "4") this.getNotifications();
        this.setState({activeTab: e.target.dataset.targetTab});
    }

    logout() {
        this.props.onLogout({userAuth: false});
        this.props.history.push('/')
    }

    setFormData(property, value) {
        this.setState({[property]: value});
    }

    clearForm(){
        this.setState({
            issueNubmer: "",
            program: "",
            category: "",
            text: ""
        });
    }


    sendNotification(type) {
        let dataToSend = {};
        let linkToSend = "";

        if(type === "zgloszenie") {
            linkToSend = "issue";
            dataToSend = {
                id: this.state.id, 
                category: this.state.category, 
                program: this.state.program, 
                text: this.state.text
            }
        } else if(type === "reklamacje") {
            linkToSend = "complain";
            dataToSend = {
                id: this.state.id, 
                issueNubmer: this.state.issueNubmer, 
                text: this.state.text
            }
        } else if(type === "funkcjonalnosc") {
            linkToSend = "functionality";
            dataToSend = {
                id: this.state.id, 
                program: this.state.program,
                text: this.state.text
            }
        }

        if (dataToSend.hasOwnProperty("id")) {
            for (const key in dataToSend) {
                if (dataToSend.hasOwnProperty(key)) {
                    const element = dataToSend[key];
                    if(element === "") {
                        this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
                        return;
                    } 
                } 
            } 
        } else {
            this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
            return;
        } 

        this.sendData(`http://aplikacja-wsb.herokuapp.com/api/new-${linkToSend}`, dataToSend)
    }

    sendData(url, data) {
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
            if(res.done) {
                this.clearForm();
                this.setState({PopMessage: "Dobra robota! Zgłoszenie zostało pomyślnie wysłane", dataSend: true})
            } else {
                this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia, Być może podałeś ZŁY NUMER ZGŁOSZENIA", dataSend: false})
            }
        })
    }

    getNotifications() {
        fetch(`http://aplikacja-wsb.herokuapp.com/api/get-all-notifications/${this.state.id}`)
            .then(res => res.json())
            .then(res => {    
                if(res) {
                    let dataToDisplay = [];
                    dataToDisplay = [...res.data.complains, ...res.data.issues, ...res.data.functionalities];
                    this.setState({clientData: dataToDisplay});
                } 
            })
    }


    showPopUp() {
        if(this.state.dataSend === true) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="success"/>;
        } else if(this.state.dataSend === false) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="fail"/>;
        } 
    }

    render() {
        return (
            <div className="w-100">
                {/* ---- Navbar ---- */}
                <Navbar className="" dark>
                    <span className="user-data">{this.state.userName}</span>
                    <Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle }>
                        <DropdownToggle color="default" className="dropdown-button fa fa-user-circle" />
                        <DropdownMenu>
                            <DropdownItem onClick={this.logout.bind(this)} >Wyloguj</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Navbar>

                {/* ---- Baner ---- */}
                <section className="banner">
                    <div className="banner__logo">
                        <img className="banner__img z-depth-1" src="img/Logo.png" alt="" />
                        <h1>SERVICE</h1>
                    </div>
                </section>

                {this.showPopUp()}

                {/* ---- Main content - Forms ---- */}
                <TabContainer>
                    <TabList onClickTab={e => this.selectTab(e)}>
                        <Tab active={this.state.activeTab} targetTab="1">Awaria</Tab>
                        <Tab active={this.state.activeTab} targetTab="2">Reklamacja</Tab>
                        <Tab active={this.state.activeTab} targetTab="3">Funkcjonalność</Tab>
                        <Tab active={this.state.activeTab} targetTab="4">Status zgłoszen</Tab>
                        <Tab active={this.state.activeTab} targetTab="5">Znane awarie</Tab>
                    </TabList>

                    {/* ---- Issue ---- */}
                    <TabBody>
                        <TabPanel active={this.state.activeTab} id="1">
                            <Form>
                                <Row>
                                    <Input id="3" label="ID kienta:" value={this.state.id} disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz oprogramowanie:"
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="program" 
                                        value={this.state.program}                            
                                        >
                                        <option value="">Jakie oprogramowanie...</option>
                                        <option value="1">Drukarz</option>
                                        <option value="2">Mortes</option>
                                        <option value="3">Inspector</option>
                                    </Select>
                                    <Select id="2" label="Wybierz katagorie problemu:" 
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="category" 
                                        value={this.state.category}                                    
                                        >                                    
                                        <option value="">Wybierz katagorie problemu...</option>
                                        <option value="1">Interfejs aplikacji</option>
                                        <option value="2">Wyświetlanie danych</option>
                                        <option value="3">Przetwarzanie danych</option>
                                        <option value="4">Tworzenie dokumentów</option>
                                        <option value="5">Przekazywanie informacji</option>
                                        <option value="6">Inna...</option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="text" value={this.state.text}/>
                                </Row>
                                <Row>
                                    <Submit value="Wyślij" onAccept={this.sendNotification.bind(this)} type="zgloszenie" />
                                </Row>           
                            </Form>   
                        </TabPanel>

                        <TabPanel active={this.state.activeTab} id="2">
                            <Form>
                                <Row>
                                    <Input id="1" type="number" label="Podaj numer zgłoszenia:" 
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="issueNubmer" 
                                        value={this.state.issueNubmer} 
                                        />
                                    <Input id="3" label="ID kienta:" value={this.state.id} disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz przyczynę reklamacji:" 
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="category" 
                                        value={this.state.category}                                    
                                        >
                                        <option value="">Wybierz katagorie problemu...</option>
                                        <option value="1">Interfejs aplikacji</option>
                                        <option value="2">Wyświetlanie danych</option>
                                        <option value="3">Przetwarzanie danych</option>
                                        <option value="4">Tworzenie dokumentów</option>
                                        <option value="5">Przekazywanie informacji</option>
                                        <option value="6">Inna...</option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="text" value={this.state.text}/>
                                </Row>     
                                <Row>
                                    <Submit value="Wyślij" onAccept={this.sendNotification.bind(this)} type="reklamacja"/>
                                </Row>      
                            </Form>   
                        </TabPanel>

                        
                        <TabPanel active={this.state.activeTab} id="3">
                            <Form>
                                <Row>
                                    <Input id="3" label="ID kienta:" value={this.state.id} disabled />
                                    <Select id="2" label="Wybierz oprogramowanie:"
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="program" 
                                        value={this.state.program}                            
                                        >
                                        <option value="">Jakie oprogramowanie...</option>
                                        <option value="1">Drukarz</option>
                                        <option value="2">Mortes</option>
                                        <option value="3">Inspector</option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz katagorie rozszerzenia:" 
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="category" 
                                        value={this.state.category}                                    
                                        >                                    
                                        <option value="">Wybierz katagorie problemu...</option>
                                        <option value="1">Interfejs aplikacji</option>
                                        <option value="2">Wyświetlanie danych</option>
                                        <option value="3">Przetwarzanie danych</option>
                                        <option value="4">Tworzenie dokumentów</option>
                                        <option value="5">Przekazywanie informacji</option>
                                        <option value="6">Inna...</option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target="text" value={this.state.text}/>
                                </Row>
                                <Row>
                                    <Submit value="Wyślij" onAccept={this.sendNotification.bind(this)} type="funkcjonalnosc" />
                                </Row>           
                            </Form>   
                        </TabPanel>

                        <TabPanel active={this.state.activeTab} id="4">
                            <Form>
                                <Row className="row w-75 m-auto">
                                    <Input id="3" label="ID kienta:" value={this.state.id} disabled />
                                </Row>
                                <Row>
                                    <Table
                                        scrollableY={true}
                                        fetchData = {this.getDirectData} 
                                        headings = {["Typ złoszenia", "Nr zgłoszniea", "Stan", "Data"]} 
                                        data = {this.state.clientData} 
                                    />
                                </Row>      
                            </Form>   
                        </TabPanel>
                        <TabPanel active={this.state.activeTab} id="5">
                            <SearchForm 
                                elements = {["Nr zgloszenia", "Kategoria", "Oprogramowanie"]}
                                onSubmitSearch = {this.findData.bind(this)}
                                dataKeys={["id_zgloszenia", "kategoria", "program"]}               
                            />
                            <Form>
                                <Row>
                                    <Table
                                        fetchData = {this.getDirectData} 
                                        headings = {["Typ złoszenia", "Nr zgłoszniea", "Stan", "Data"]} 
                                        data = {this.loadData()} 
                                    />
                                </Row>
                                <Row className="row d-flex justify-content-center">
                                    <CustomPagination
                                        actualPageNumber={this.state.actualPageNumber}
                                        updatePage={this.updatePage.bind(this)}
                                        pages={this.state.pages}
                                    />    
                                </Row>   
                            </Form>   
                        </TabPanel>
                    </TabBody>
                </TabContainer>

                {/* ---- Footer ---- */}
                <footer class="footer">
                    <ul class="footer__item">
                        <li><a href="">Link 1</a></li>
                        <li><a href="">Link 2</a></li>
                        <li><a href="">Link 3</a></li>
                        <li><a href="">Link 4</a></li>
                        <li><a href="">Link 5</a></li>
                    </ul>

                    <ul class="footer__item">
                        <li> Projek WSB Sp. z o.o.</li>
                        <li>ul. Testowa 24b</li>
                        <li>11-111 Duże Miasto</li>
                        <li>tel.: +48 999-888-777</li>
                        <li>e-mail: jakiś@takiś.pl</li>
                    </ul>

                    <p class="footer__item">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vero doloremque, esse dolore tenetur, porro placeat, magnam
                        perspiciatis vel ut aliquam! Magnam sequi delectus doloribus dicta, quidem accusamus laboriosam. Animi.
                    </p>
                </footer>

            </div>
        );
    }
}

export default ClientPage;
