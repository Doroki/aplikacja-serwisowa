import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
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
  }

  render() {
    return (
      <Router>
        <div className="d-flex h-100 w-100">
          <Route 
            exact
            path="/" 
            render={() => ((this.state.userAuth) ? <ClientPage /> : <LoginClient header={"SERWIS"} onLoginSubmit={this.setState.bind(this)}/>)}
          />
          <Route 
            path="/admin" 
            render={() => ((this.state.adminAuth) ? <Admin /> : <LoginAdmin header={"SERWIS"} subheading={"Admin Panel"} onLoginSubmit={this.setState.bind(this)}/>)} 
          />
        </div>
      </Router>
    );
  }
}

export default App;
