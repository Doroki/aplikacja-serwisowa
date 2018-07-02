import React, { Component } from 'react';
import {Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';
import './client-page.css';
import {Tab, TabBody, TabContainer, TabList, TabPanel} from '../../components/tab-container/tab-container';
import {Form, Row, Input, Select, Textarea, Submit} from '../../components/forms/form-components/form-components';


class ClientPage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            userName: this.props.userName,
            userID: this.props.userID,
            activeTab: "1",
            dropdownOpen: false,
        },

        this.issue = {
            id: this.props.userID,
            program: "",
            category: "",
            text: ""
        },

        this.complain = {
            id: this.props.userID,
            issueNubmer: 0,
            text: ""
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    selectTab(e) {
        e.preventDefault();
        if(e.target.localName !== "a") return;
        this.setState({activeTab: e.target.dataset.targetTab});
    }

    logout() {
        this.props.onLogout({userAuth: false});
        this.props.history.push('/')
    }

    setFormData(obj, value) {
        let objToSave = obj[0];
        objToSave[obj[1]] = value;
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
                console.log(res)
            } else {
                console.log(res)
            }
        })
    }

    sendIssue() {
        for (const key in this.issue) {
            if (this.issue.hasOwnProperty(key)) {
                const element = this.issue[key];
                if(element === "") {
                    // warn of wrong data
                    return;
                } else {
                }
            }
        }
        this.sendData("http://localhost:8080/client/issues", this.issue)
    }

    sendComplain() {
        for (const key in this.complain) {
            if (this.complain.hasOwnProperty(key)) {
                const element = this.complain[key];
                if(element === "") {
                    // warn of wrong data
                    return;
                } else {
                }
            }
        }
        this.sendData("http://localhost:8080/client/complains", this.complain)
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

                {/* ---- Main content - Forms ---- */}
                <TabContainer>
                    <TabList onClickTab={e => this.selectTab(e)}>
                        <Tab active={this.state.activeTab} targetTab="1">Awaria</Tab>
                        <Tab active={this.state.activeTab} targetTab="2">Reklamacja</Tab>
                    </TabList>

                    {/* ---- Issue ---- */}
                    <TabBody>
                        <TabPanel active={this.state.activeTab} id="1">
                            <Form>
                                <Row>
                                    <Input id="3" label="ID kienta:" value={this.state.userID} disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz oprogramowanie:" onChangeField={this.setFormData.bind(this)} target={[this.issue, "program"]}>
                                        <option value="">Jakie oprogramowanie...</option>
                                        <option value="1">Drukarz</option>
                                        <option value="2">Mortes</option>
                                        <option value="3">Inspector</option>
                                    </Select>
                                    <Select id="2" label="Wybierz katagorie problemu:" onChangeField={this.setFormData.bind(this)} target={[this.issue, "category"]}>
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
                                    <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target={[this.issue, "text"]}/>
                                </Row>
                                <Row>
                                    <Submit value="Wyślij" onAccept={this.sendIssue.bind(this)} />
                                </Row>           
                            </Form>   
                        </TabPanel>

                        <TabPanel active={this.state.activeTab} id="2">
                            <Form>
                                <Row>
                                    <Input id="1" label="Podaj numer zgłoszenia:" onChangeField={this.setFormData.bind(this)} target={[this.complain, "issueNubmer"]}/>
                                    <Input id="3" label="ID kienta:" value={this.state.userID} disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz przyczynę reklamacji:" onChangeField={this.setFormData.bind(this)} target={[this.complain, "problem"]}>
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
                                    <Textarea label="Opisz problem:" col="30" row="12" onChangeField={this.setFormData.bind(this)} target={[this.complain, "text"]}/>
                                </Row>     
                                <Row>
                                    <Submit value="Wyślij" onAccept={this.sendComplain.bind(this)}/>
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
