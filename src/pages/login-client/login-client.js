import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';


class LoginClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
<<<<<<< HEAD
            falseLogin: false
=======
            falseLogin: ""
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
        }
    }

    authorizeEntry(e, login, password) {
        e.preventDefault();
        this.setState({login: login, password: password})
        fetch("http://localhost:8080/api/login-client", {
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

<<<<<<< HEAD
        fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(login === "test" && password === "test") {
            this.props.onLoginSubmit({userAuth: true, adminAuth: false});

            this.props.history.push('/client-panel')
        } else {
            this.setState({falseLogin: true})
        }
=======
    hideWarning() {
        this.setState({falseLogin: ""});
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
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
<<<<<<< HEAD
                <span>NA CZAS TESTÓW: <br/> id: test <br/> hasło: test</span>
=======
                <span>NA CZAS TESTÓW (dane jednego z użytkowników): <br/> id: 10041 <br/> hasło: bella80</span>   
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
            </div>
        )
    }
}

export default LoginClient;