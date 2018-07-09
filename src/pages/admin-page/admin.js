import React, { Component } from 'react';
import "../../reset.css";
import '../..//App.css';
import {
  Route,
  Link
} from 'react-router-dom';
import {DropdownItem} from 'mdbreact';

// navbars
import Navbar from '../../components/layout/navbar/navbar';
import SideNavbar from '../../components/layout/sidebar/side-navbar';

//header-nav-buttons
import TaskButton from '../../components/buttons/task-button/task-button'
import DropDownButton from '../../components/buttons/profile-button/profile-button'

// content
import NewNotification from "../../components/layout/main-content/new-notification";
import ErrorList from '../../components/layout/main-content/list-of-errors';
import DefaultContent from '../../components/layout/main-content/default-content/default-content';
import ComplainList from '../../components/layout/main-content/complains';
import FuncionalityList from '../../components/layout/main-content/funcionality';
import ClientList from '../../components/layout/main-content/client-list';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    }
    
  }

  logout() {
    this.props.onLogout({adminAuth: false});
    this.props.history.push('/admin-panel')
  }

  render() {
    return (
        <div className="App d-flex h-100 w-100">
          <SideNavbar>
            <h1 className='container-logo'><img className='logo' src='../img/Logo.png' alt='' /><span>SERVICE</span></h1>
            <Link to="/admin-panel/">Strona główna</Link>
            <Link to="/admin-panel/nowe-zgloszenie">Nowe zgłoszenie</Link>
            <Link to="/admin-panel/lista-bledow">Zgłoszone błędy</Link>
            <Link to="/admin-panel/lista-reklamacji">Reklamacje</Link>
            <Link to="/admin-panel/lista-funkcjonalności">Lista Funkcjonalności</Link>
            <Link to="/admin-panel/client-list">Lista Klientów</Link>
          </SideNavbar>
          <section className="container-fluid p-0">
            <Navbar>
              <TaskButton tasks={this.state.tasks} />
              <DropDownButton>
                <DropdownItem onClick={this.logout.bind(this)} > Wyloguj </DropdownItem>
              </DropDownButton>
            </Navbar>
            <div className="main-content"> 
              <Route exact path="/admin-panel" component={DefaultContent} />
              <Route path="/admin-panel/nowe-zgloszenie" component={NewNotification} />
              <Route path="/admin-panel/lista-bledow" component={ErrorList} />
              <Route path="/admin-panel/lista-reklamacji" component={ComplainList} />
              <Route path="/admin-panel/lista-funkcjonalności" component={FuncionalityList} />
              <Route path="/admin-panel/client-list" component={ClientList} />
            </div>
          </section>
        </div>
    );
  }
}

export default Admin;
