import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { createHashHistory } from 'history'
import Admin from './pages/admin-page/admin';
import ClientPage from './pages/client-page/client-page';
import LoginAdmin from './pages/login-admin/login-admin';
import LoginClient from './pages/login-client/login-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAuth: false,
      adminAuth: false
    };

    this.history = createHashHistory();
  }

  render() {

    return (
      <Router>
        <div className="d-flex h-100 w-100">
          <Route exact path="/" render={() => <LoginClient header={"SERWIS"} onLoginSubmit={this.setState.bind(this)} history={this.history}/>} />
          <Route exact path="/admin" render={() => <LoginAdmin header={"SERWIS"} subheading={"Admin Panel"} onLoginSubmit={this.setState.bind(this)} history={this.history}/>} />

          <Route 
            exact
            path="/client-panel" 
            render={() => ((this.state.userAuth) ? <ClientPage onLogout={this.setState.bind(this)} history={this.history} /> : <Redirect to='/'/>)}
          />
          <Route 
            path="/admin-panel" 
            render={() => ((this.state.adminAuth) ? <Admin onLogout={this.setState.bind(this)} history={this.history}/> : <Redirect to='/admin'/>)} 
          />
        </div>
      </Router>
    );
  }
}

export default App;
