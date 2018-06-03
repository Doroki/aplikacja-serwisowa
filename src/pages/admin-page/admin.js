import React, { Component } from 'react';
import "../../reset.css";
import '../..//App.css';
import {
  Route,
  Link
} from 'react-router-dom';

// navbars
import Navbar from '../../components/layout/navbar/navbar';
import SideNavbar from '../../components/layout/sidebar/side-navbar';

//header-nav-buttons
import ContactButton from '../../components/buttons/contact-button/contact_button'
import TaskButton from '../../components/buttons/task-button/task-button'
import ProfileButton from '../../components/buttons/profile-button/profile-button'

// content
import NewNotification from "../../components/layout/main-content/new-notification";
import ErrorList from '../../components/layout/main-content/list-of-errors';
import Functionalities from '../../components/layout/main-content/functionalities';
import DefaultContent from '../../components/layout/main-content/default-content/default-content';
import ComplainList from '../../components/layout/main-content/complains';
import ClientList from '../../components/layout/main-content/clients-list';

class Admin extends Component {

  render() {
    return (
        <div className="App d-flex h-100 w-100">
          <SideNavbar>
            <h1 className='container-logo'><img className='logo' src='../img/Logo.png' alt='' /><span>SERVICE</span></h1>
            <Link to="/admin/">Strona główna</Link>
            <Link to="/admin/nowe-zgloszenie">Nowe zgłoszenie</Link>
            <Link to="/admin/lista-bledow">Zgłoszone błędy</Link>
            <Link to="/admin/lista-reklamacji">Reklamacje</Link>
            <Link to="/admin/lista-funkcjonalnosci">Nowe funkcjonalnosci</Link>
            <Link to="/admin/lista-klientow">Lista klientow</Link>
          </SideNavbar>
          <section className="container-fluid p-0">
            <Navbar>
              <ContactButton/>
              <TaskButton />
              <ProfileButton />
            </Navbar>
            <div className="main-content"> 
              <Route exact path="/admin" component={DefaultContent} />
              <Route path="/admin/nowe-zgloszenie" component={NewNotification} />
              <Route path="/admin/lista-bledow" component={ErrorList} />
              <Route path="/admin/lista-reklamacji" component={ComplainList} />
              <Route path="/admin/lista-funkcjonalnosci" component={Functionalities} />
              <Route path="/admin/lista-klientow" component={ClientList} />
            </div>
          </section>
        </div>
    );
  }
}

export default Admin;
