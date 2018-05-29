import React from 'react';
import "./side-navbar.css";

const SideNavbar = (props) => {

    const links = props.children.map((element, index) => {
        return (
            <li key={index}>
                {element}
            </li>
        );
    });

    return (
        <nav className="side-navbar">
            <div>
                <ul>
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default SideNavbar;