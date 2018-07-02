import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';
import PopUp from '../../components/pop-up-info/pop-up';


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
        fetch("http://localhost:8080/login-client", {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {
                'Content-Type': 'application/json'
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

    render() {
        return (
            <div className="d-flex h-100 w-100 flex-column justify-content-center align-items-center">
                {((this.state.falseLogin === true) ? <PopUp content="Brawa" type="success"/> : "")}
                <LoginForm
                    system = {"Client"}
                    header = {"SERWIS"}
                    onSubmitBtn = {this.authorizeEntry.bind(this)} 
                    error={this.state.falseLogin} />
                <Link className="btn btn-mdb-color" to="/admin">Panel Admina</Link>
                <span>NA CZAS TESTÓW: <br/> id: test <br/> hasło: test</span>   
            </div>
        )
    }
}

export default LoginClient;