import React from 'react';
import { Link } from 'react-router-dom'
import LoginForm from '../../components/forms/login-form/login-form';


class LoginAdmin extends React.Component {
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

        if(login === "test" && password === "test") {
            this.props.onLoginSubmit({userAuth: false, adminAuth: true});
            
            this.props.history.push('/admin-panel')
        }

    }

    render() {
        return (
            <div className="d-flex h-100 w-100 flex-column justify-content-center align-items-center">
                <LoginForm
                    system = {"Admin"}
                    header = {"SERWIS"}
                    subheader = {"Admin Panel"} 
                    onSubmitBtn = {this.authorizeEntry.bind(this)} />
                <Link className="btn btn-mdb-color" to="/">Panel Klienta</Link>
            </div>
        );
    }
}

export default LoginAdmin;