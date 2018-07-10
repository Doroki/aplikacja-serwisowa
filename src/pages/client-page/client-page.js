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
            userName: "{Nazwa firmy / Imię i Nazwisko}",
            activeTab: "1",
            dropdownOpen: false,
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
        let propertyToSave = objToSave[obj[1]];
        propertyToSave = value;
        console.log(this.issue)
    }

    sendIssue() {

    }

    sendComplain() {

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
                                        <option value="">Wybierz katagorie problemu...</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Textarea label="Opisz problem:" col="30" row="12" />
                                </Row>
                                <Row>
                                    <Submit value="Wyślij" disabled/>
                                </Row>           
                            </Form>   
                        </TabPanel>

                        <TabPanel active={this.state.activeTab} id="2">
                            <Form>
                                <Row>
                                    <Input id="1" label="Podaj numer zgłoszenia:" />
                                    <Input id="3" label="ID kienta:" disabled />
                                </Row>
                                <Row>
                                    <Select id="2" label="Wybierz przyczynę reklamacji:">
                                        <option value="">Wybierz przyczynę reklamacji...</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </Select>
                                </Row>
                                <Row>
                                    <Textarea label="Opisz problem:" col="30" row="12" />
                                </Row>     
                                <Row>
                                    <Submit value="Wyślij" disabled/>
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
