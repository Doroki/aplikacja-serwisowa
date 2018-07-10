import React, { Component } from 'react';
import {Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';
import './client-page.css';
import {Tab, TabBody, TabContainer, TabList, TabPanel} from '../../components/tab-container/tab-container';
import {Form, Row, Input, Select, Textarea, Submit} from '../../components/forms/form-components/form-components';
import PopUp from '../../components/pop-up-info/pop-up';
import Table from "../../components/tabel/tabel";

class ClientPage extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            userName: this.props.userName,
            activeTab: "1",
            dropdownOpen: false,
<<<<<<< HEAD
        },

        this.issue = {
            id: 0,
            program: "",
            category: "",
            text: ""
        },

        this.complain = {
            id: 0,
            issueNubmer: 0,
            problem: "",
            text: ""
        }
=======
            dataSend: null,
            PopMessage: "",
            data: "",
            
            //Data to send
            id: this.props.userID,
            issueNubmer: "",
            program: "",
            category: "",
            text: ""
        }
        
        this.toggle = this.toggle.bind(this);
        this.getDirectData = this.getDirectData.bind(this);
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

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
                id = data.id_reklamancja;
                stan = data.stan_reklamancja;
                dataZgłoszenia = data.data_reklamancja;
                break;
            case 'Funkcjonalność':
                id = data.id_funkcjonalnosc;
                stan = data.stan_funkcjonalnosc;
                dataZgłoszenia = data.data_funkcjonalnosc;
                break;
        }
        return [
            {title: "Typ zgłoszenia:", content: data.type},
            {title: "ID zgłoszenia:", content: id},
            {title: "Stan zgłoszenia:", content: stan},
            {title: "Data zgłoszenia:", content: dataZgłoszenia},
            {title: "Treść zgłoszenia:", content: data.tresc}
        ]
    }

    selectTab(e) {
        e.preventDefault();
        if(e.target.localName !== "a") return;
        this.setState({activeTab: e.target.dataset.targetTab});
    }

    logout() {
        this.props.onLogout({userAuth: false});
        this.props.history.push('/')
    }

<<<<<<< HEAD
    setFormData(obj, value) {
        let objToSave = obj[0];
        let propertyToSave = objToSave[obj[1]];
        propertyToSave = value;
        console.log(this.issue)
    }

    sendIssue() {

    }

    sendComplain() {

=======
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

        this.sendData(`http://localhost:8080/api/new-${linkToSend}`, dataToSend)
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
                this.setState({PopMessage: "Coś poszło nie tak! Nire udało się wysłać zgłoszenia", dataSend: false})
            }
        })
    }

    getNotifications() {
        fetch(`http://localhost:8080/api/get-all-notifications/${this.state.id}`)
            .then(res => res.json())
            .then(res => {    
                if(res) {
                    let dataToDisplay = [];
                    dataToDisplay = [...res.data.complains, ...res.data.issues, res.data.functionalities];
                    this.setState({data: dataToDisplay});
                } 
            })
    }

    componentDidMount() {
        this.getNotifications();
    }

    showPopUp() {
        if(this.state.dataSend === true) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="success"/>;
        } else if(this.state.dataSend === false) {
            setTimeout(()=>{ this.setState({dataSend: null})}, 4500);
            return <PopUp content={this.state.PopMessage} type="fail"/>;
        } 
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
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
                    </TabList>

                    {/* ---- Issue ---- */}
                    <TabBody>
                        <TabPanel active={this.state.activeTab} id="1">
                            <Form>
                                <Row>
<<<<<<< HEAD
                                    <Input id="3" label="ID kienta:" disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz oprogramowanie:" onChangeField={this.setFormData.bind(this)} target={[this.issue, "program"]}>
                                        <option value="normalny">Jakie oprogramowanie...</option>
                                        <option value="pilny">Pierwsze</option>
                                        <option value="pilny">Drugie</option>
                                        <option value="pilny">Trzecie</option>
                                    </Select>
                                    <Select id="2" label="Wybierz katagorie problemu:" onClick={console.log("działa")}>
=======
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
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
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
<<<<<<< HEAD
                                    <Input id="1" label="Podaj numer zgłoszenia:" />
                                    <Input id="3" label="ID kienta:" disabled />
=======
                                    <Input id="1" type="number" label="Podaj numer zgłoszenia:" 
                                        onChangeField={this.setFormData.bind(this)} 
                                        target="issueNubmer" 
                                        value={this.state.issueNubmer} 
                                        />
                                    <Input id="3" label="ID kienta:" value={this.state.id} disabled />
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
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
                                    <Submit value="Wyślij" onAccept={this.sendNotification.bind(this)} type="funkcjonalnosc"/>
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
                                    fetchData = {this.getDirectData} 
                                    headings = {["Typ złoszenia", "Nr zgłoszniea", "Stan", "Data"]} 
                                    data = {this.state.data} 
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
