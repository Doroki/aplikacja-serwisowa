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

        fetch("http://localhost:8080/api/login-admin", {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(res => {    
            if(res.auth) {
                this.props.onLoginSubmit({ userAuth: false, adminAuth: true});

                this.props.history.push('/admin-panel')
            } else {
                this.setState({falseLogin: true})
            }
        })

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
                <span>NA CZAS TESTÓW: <br/> id: admin <br/> hasło: admin</span>
            </div>
        );
    }
}

export default LoginAdmin;