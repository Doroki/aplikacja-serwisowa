import React from 'react';
import './login-form.css';


const LoginFrom = (props) => {

    let password = "";
    let login = "";

    return (
        <form className="login mb-4">
            <div className="login__body">
                <div className="login__header header">
                    <h1 className="header__logo"><span>{props.header}</span><span>{props.subheader}</span></h1>
                </div>

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
}

export default LoginFrom;