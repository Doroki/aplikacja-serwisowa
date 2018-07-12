import React from 'react';
import "./navbar.css";

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg">
            <i className="fa fa-bars menu-icon"
                onClick={props.menuToggle}></i>
            <ul className="navbar-nav ml-auto">
                {props.children}
            </ul>
        </nav>
    );

}

export default Navbar;