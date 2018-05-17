import React, { Component } from 'react';
import "./reset.css";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// layout
import Navbar from './components/layout/navbar';
import SideNavbar from './components/layout/side-navbar';

//header-nav-buttons
import ContactButton from './components/head-navbar/contact_button'
import TaskButton from './components/head-navbar/task-button'
import ProfileButton from './components/head-navbar/profile-button'

// content
import Content from "./components/main-content/content";
import Complain from './components/main-content/compain';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App d-flex h-100">
          <SideNavbar>
            <h1>LOGO ?</h1>
            <Link to="/zgloszenia">Nowe zgłoszenie</Link>
            <Link to="/lista-zgloszen">Zgłoszenia</Link>
            <Link to="/reklamacje">Reklamacje</Link>
            <Link to="/lista-klientow">Lista klientow</Link>
          </SideNavbar>
          <section className="container-fluid p-0">
            <Navbar>
              <ContactButton/>
              <TaskButton />
              <ProfileButton />
            </Navbar>
            <div className="main-content"> 
              <Route path="/zgloszenia" component={Content} />
              {/* <Route exact path="/reklamacje" component={Complain} /> */}
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
