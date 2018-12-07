import React, { Component } from 'react';
import "../../../reset.css";
import '../../../App.css';
import {
  Route,
  Link
} from 'react-router-dom';
import { DropdownItem } from 'mdbreact';

// navbars
import Navbar from '../../../components/navbar/navbar';
import SideNavbar from '../../../components/sidebar/side-navbar';

//header-nav-buttons
import TaskButton from '../../../components/buttons/task-button/task-button'
import DropDownButton from '../../../components/buttons/profile-button/profile-button'

// content
import NewNotification from "../layout/main-content/new-notification";
import ErrorList from '../layout/main-content/list-of-errors';
import DefaultContent from '../layout/main-content/default-content/default-content';
import ComplainList from '../layout/main-content/complains';
import FuncionalityList from '../layout/main-content/funcionality';
import ClientList from '../layout/main-content/client-list';
import SendEmail from '../layout/main-content/send-email';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      actualSubsite: 0,
      menuOpen: false,
      darkTheme: false
    }
  }

  changeTheme() {
    console.log(this.state.darkTheme)
    this.setState({darkTheme: !this.state.darkTheme})
  }

  menuToggle() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  logout() {
    this.props.onLogout({adminAuth: false});
    this.props.history.push('/admin-panel')
  }

  render() {
    return (
        <div className={`App d-flex h-100 w-100 ${this.state.darkTheme ? 'darkTheme' : ''}`}>
          <SideNavbar smallScreenHidden={this.state.menuOpen} menuToggle={this.menuToggle.bind(this)} menuOpen={this.state.menuOpen}>
            <h1 className='container-logo'><img className='logo' src='./img/Logo.png' alt='' /><span>SERVICE</span></h1>
            <Link to="/admin-panel/">Strona główna</Link>
            <Link to="/admin-panel/nowe-zgloszenie">Nowe zgłoszenie</Link>
            <Link to="/admin-panel/wyslij-email">Wyślij Email</Link>
            <Link to="/admin-panel/lista-bledow">Zgłoszone błędy</Link>
            <Link to="/admin-panel/lista-reklamacji">Reklamacje</Link>
            <Link to="/admin-panel/lista-funkcjonalności">Lista Funkcjonalności</Link>
            <Link to="/admin-panel/client-list">Lista Klientów</Link>
          </SideNavbar>
          <section className={(this.state.menuOpen) ? "container-fluid p-0 wrapper fade-wrapper": "container-fluid p-0 wrapper"} 
                   onClick={(this.state.menuOpen) ? this.menuToggle.bind(this) : null}>
            <Navbar menuToggle={this.menuToggle.bind(this)}>
              <button onClick={this.changeTheme.bind(this)} >tests</button>
              <TaskButton tasks={this.state.tasks} />
              <DropDownButton>
                <DropdownItem onClick={this.logout.bind(this)} > Wyloguj </DropdownItem>
              </DropDownButton>
            </Navbar>
            <div className="main-content"> 
              <Route exact path="/admin-panel" component={() => <DefaultContent darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/nowe-zgloszenie" component={() => <NewNotification darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/wyslij-email" component={() => <SendEmail darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/lista-bledow" component={() => <ErrorList darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/lista-reklamacji" component={() => <ComplainList darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/lista-funkcjonalności" component={() => <FuncionalityList darkTheme={this.state.darkTheme}/>} />
              <Route path="/admin-panel/client-list" component={() => <ClientList darkTheme={this.state.darkTheme}/>} />
            </div>
          </section>
        </div>
    );
  }
}

export default Admin;
