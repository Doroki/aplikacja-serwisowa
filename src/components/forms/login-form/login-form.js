import React from 'react';
import './login-form.css';


class LoginFrom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: ""
        }
    }

    render() {
        return (
            <form className="login mb-4">
                <div className="login__body">
                    <div className="login__header header">
                        <h1 className="header__logo"><span>{this.props.header}</span><span>{this.props.subheader}</span></h1>
                    </div>

                    <label htmlFor="login" className="grey-text">Twoje id</label>
                    <input type="text" id="login" className="form-control mb-4" required onChange={e => this.setState({login: e.target.value})} />

                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Twoje Hasło</label>
                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control" onChange={e => this.setState({password: e.target.value})} />

                    <div className="text-center mt-4">
                        <button className="btn btn-indigo" type="submit" onClick={(e) => this.props.onSubmitBtn(e, this.state.login, this.state.password)}>Login</button>
                    </div>
                    <p style={{visibility: (this.props.error === true) ? "visible" : "hidden"}} className="m-0 alert alert-danger">Podałeś nieprawidłowy id lub hasło</p>
                </div>
            </form>
        );

<<<<<<< HEAD
                <label htmlFor="login" className="grey-text">Twoje id</label>
                <input type="text" id="login" className="form-control mb-4" required onChange={e => login = e.target.value} required/>

                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Twoje Hasło</label>
                <input type="password" id="defaultFormLoginPasswordEx" className="form-control" onChange={e => password = e.target.value} required/>

                <div className="text-center mt-4">
                    <button className="btn btn-indigo" type="submit" onClick={(e) => props.onSubmitBtn(e, login, password)}>Login</button>
                </div>
                <p style={{visibility: (props.error === true) ? "visible" : "hidden"}} className="m-0 alert alert-danger">Podałeś nieprawidłowy id lub hasło</p>
            </div>
        </form>
    );
=======
    }
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
}

export default LoginFrom;