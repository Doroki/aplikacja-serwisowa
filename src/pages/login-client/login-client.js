import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';


class LoginClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            falseLogin: ""
        }
    }

    authorizeEntry(e, login, password) {
        e.preventDefault();
        this.setState({login: login, password: password})
        fetch("https://aplikacja-wsb.herokuapp.com/api/login-client", {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(res => {    
            if(res.auth) {
                this.props.onLoginSubmit({id: res.login, name: res.data[0].firma, userAuth: true, adminAuth: false});
                this.props.history.push('/client-panel')
            } else {
                this.setState({falseLogin: true})
                console.log(this.state)
            }
        }).catch(err => {
            console.log(err + ": Utracono połączenie z bazą danych")
        });
    }

    hideWarning() {
        this.setState({falseLogin: ""});
    }

    render() {
        return (
            <div className="d-flex h-100 w-100 flex-column justify-content-center align-items-center"
                onFocus={this.hideWarning.bind(this)}    
            >
                <LoginForm
                    system = {"Client"}
                    header = {"SERWIS"}
                    onSubmitBtn = {this.authorizeEntry.bind(this)} 
                    error={this.state.falseLogin} />
                <Link className="btn btn-mdb-color" to="/admin">Panel Admina</Link>
                <span>NA CZAS TESTÓW (dane jednego z użytkowników): <br/> id: 10041 <br/> hasło: bella80</span>   
            </div>
        )
    }
}

export default LoginClient;