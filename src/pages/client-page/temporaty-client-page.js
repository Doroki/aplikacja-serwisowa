import React from 'react';
import './temporary-client-page.css';


class TemporaryClientPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            active: "1",
            autorized: this.props.autorized
        }

    }

    selectButton(e) {
        e.preventDefault();
        this.setState({active: e.target.dataset.target})
    }

    classnames(value) {
        return (this.state.active === value) ? "contact__item contact__item--active" : "contact__item";
    }


render(){
        return (
            <div className="h-100 w-100 background up">
            <nav className="nav shadow">
            <span className="nav__user">Imię i nazwisko uzytkownika</span>
            <i className="fa fa-user-circle fa-2x"></i>
        </nav>
        <section className="banner">
            <div className="banner__logo">
                <img className="banner__img shadow" src="img/Logo.png" alt="" />
                <h1>SERVICE</h1>
            </div>
            <p className="banner__content shadow">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus nunc, pellentesque vitae ornare ut, lacinia
                eget tellus. Pellentesque ac gravida leo. Proin sit amet nulla urna. Vestibulum maximus nisl orci. Nam imperdiet
                tempus volutpat. Nulla hendrerit bibendum luctus. Suspendisse dictum libero at molestie aliquam.</p>
        </section>
    
        <main>
            <div className="contact">
    
                <ul className="contact__header" id="button-list" role="button-list" onClick={e => this.selectButton(e)}>
                    <Tab newclass={this.classnames("1")}>
                        <a className="contact__link" data-target="1" role="button">Awaria</a>
                    </Tab>
                    <Tab newclass={this.classnames("2")}>
                        <a className="contact__link" data-target="2" role="button">Reklamacja</a>
                    </Tab>
                    <Tab newclass={this.classnames("3")}>
                        <a className="contact__link" data-target="3" role="button">Wiadomość</a>
                    </Tab>
                    <Tab newclass={this.classnames("4")}>
                        <a className="contact__link" data-target="4" role="button">Nowa Funkcja</a>
                    </Tab>
                    <Tab newclass={this.classnames("5")}>
                        <a className="contact__link" data-target="5" role="button">Status</a>
                    </Tab>
                </ul>
    
                <div className="contact__content content shadow">
                    <div className="content__form" id="form-list">
    
                        <form className={(this.state.active === "1") ? "content__tab form content__tab--active" : "content__tab form"} id="1" role="tabpanel">
                            <div className="form__field">
                                <label htmlFor="name_error" className="form__label">Podaj osobę do kontaktu</label>
                                <input type="text" name="name" id="name_error" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Wybierz tryb</label>
                                    <select name="" id="" className="form__input">
                                        <option value="normalny">Normalny</option>
                                        <option value="pilny">Pilny</option>
                                    </select>
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">ID klienta:</label>
                                <input type="text" name="" id="" className="form__input" value="2312" disabled />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj nr tel.</label>
                                <input type="text" name="" id="" className="form__input"/>
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj e-mail</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Wybierz kategorie problemu:</label>
                                <select name="" id="" className="form__input">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Opisz problem</label>
                                <textarea name="" id="" cols="30" rows="10" className="form__input"></textarea>
                            </div>
                        </form>

                        <form className={(this.state.active === "2") ? "content__tab form content__tab--active" : "content__tab form"} id="2" role="tabpanel">
                            <div className="form__field">
                                <label htmlFor="name_error" className="form__label">Podaj osobę do kontaktu</label>
                                <input type="text" name="name" id="name_error" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Wybierz tryb</label>
                                <select name="" id="" className="form__input">
                                    <option value="normalny">Normalny</option>
                                    <option value="pilny">Pilny</option>
                                </select>
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">ID klienta:</label>
                                <input type="text" name="" id="" className="form__input" value="2312" disabled />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj nr tel.</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj e-mail</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Wybierz kategorie problemu:</label>
                                <select name="" id="" className="form__input">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Opisz problem</label>
                                <textarea name="" id="" cols="30" rows="10" className="form__input"></textarea>
                            </div>
                        </form>

                        <form className={(this.state.active === "3") ? "content__tab form content__tab--active" : "content__tab form"} id="3" role="tabpanel">
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj e-mail na który ma przyjść odpowiedź:</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">ID klienta:</label>
                                <input type="text" name="" id="" className="form__input" value="2312" disabled />
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Opisz problem</label>
                                <textarea name="" id="" cols="30" rows="15" className="form__input"></textarea>
                            </div>
                        </form>

                        <form className={(this.state.active === "4") ? "content__tab form content__tab--active" : "content__tab form"} id="2" role="tabpanel">
                            <div className="form__field">
                                <label htmlFor="name_error" className="form__label">Podaj osobę do kontaktu</label>
                                <input type="text" name="name" id="name_error" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Wybierz tryb</label>
                                <select name="" id="" className="form__input">
                                    <option value="normalny">Normalny</option>
                                    <option value="pilny">Pilny</option>
                                </select>
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">ID klienta:</label>
                                <input type="text" name="" id="" className="form__input" value="2312" disabled />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj nr tel.</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field">
                                <label htmlFor="" className="form__label">Podaj e-mail</label>
                                <input type="text" name="" id="" className="form__input" />
                            </div>
                            <div className="form__field form__field--long">
                                <label htmlFor="" className="form__label">Opisz pożądane działanie nowej funkcjonalność:</label>
                                <textarea name="" id="" cols="30" rows="10" className="form__input"></textarea>
                            </div>
                        </form>

                        <div className={(this.state.active === "5") ? "content__tab form content__tab--active" : "content__tab form"} id="4" role="tabpanel">
                            <h1 className="table__head">Aktualne zgłoszenia</h1>
                            <table className="table__wrapper">
                                <thead className="table__header">
                                    <tr>
                                        <th>#</th>
                                        <th>nr zgłoszenia</th>
                                        <th>typ zgłoszenia</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table__content">
                                    <tr>
                                        <td>1</td>
                                        <td>35424542</td>
                                        <td>Awaria</td>
                                        <td>Zrealizowane</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>123423</td>
                                        <td>Funkcjonalność</td>
                                        <td>W toku</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
    
                    </div>
                </div>
            </div>
        </main>
    
        <footer className="footer">
            <ul className="footer__item">
                <li>
                    <a href="#">Link 1</a>
                </li>
                <li>
                    <a href="#">Link 2</a>
                </li>
                <li>
                    <a href="#">Link 3</a>
                </li>
                <li>
                    <a href="#">Link 4</a>
                </li>
                <li>
                    <a href="#">Link 5</a>
                </li>
            </ul>
    
            <ul className="footer__item">
                <li>
                    Projek WSB Sp. z o.o.
                </li>
                <li>
                    ul. Testowa 24b
                </li>
                <li>
                    11-111 Duże Miasto
                </li>
                <li>
                    tel.: +48 999-888-777
                </li>
                <li>
                    e-mail: jakiś@takiś.pl
                </li>
            </ul>
    
            <p className="footer__item">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vero doloremque, esse dolore tenetur, porro placeat, magnam
                perspiciatis vel ut aliquam! Magnam sequi delectus doloribus dicta, quidem accusamus laboriosam. Animi.
            </p>
        </footer>
        </div>
        );
    }
}

export default TemporaryClientPage;


const Tab = (props) => {

    return(
        <li className={props.newclass}>
            {props.children}
        </li>
    )
}