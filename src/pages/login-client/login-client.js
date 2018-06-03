import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';


class LoginClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        }
    }

    authorizeEntry(e, login, password) {
        e.preventDefault();
        this.setState({login: login, password: password})

        if(this.state.login === "test" && this.state.password === "test") {
            this.props.onLoginSubmit({userAuth: true, adminAuth: false});
        }

    }

    render() {
        return (
            <div className="d-flex h-100 w-100 flex-column justify-content-center align-items-center">
                <LoginForm
                    system = {"Client"}
                    header = {"SERWIS"}
                    onSubmitBtn = {this.authorizeEntry.bind(this)} />
                <Link to="/admin">Panel Admina</Link>
            </div>
        )
    }
}

export default LoginClient;