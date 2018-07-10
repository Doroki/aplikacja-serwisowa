import React from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';


class LoginAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            falseLogin: false
        }
    }

    authorizeEntry(e, login, password) {
        e.preventDefault();
        this.setState({login: login, password: password})

        fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(login === "test" && password === "test") {
            this.props.onLoginSubmit({userAuth: false, adminAuth: true});
            
            this.props.history.push('/admin-panel')
        }  else {
            this.setState({falseLogin: true})
        }

    }

    render() {
        return (
            <div className="d-flex h-100 w-100 flex-column justify-content-center align-items-center">
                <LoginForm
                    system = {"Admin"}
                    header = {"SERWIS"}
                    subheader = {"Admin Panel"} 
                    onSubmitBtn = {this.authorizeEntry.bind(this)} 
                    error={this.state.falseLogin} />
                <Link className="btn btn-mdb-color" to="/">Panel Klienta</Link>
                <span>NA CZAS TESTÓW: <br/> id: test <br/> hasło: test</span>
            </div>
        );
    }
}

export default LoginAdmin;