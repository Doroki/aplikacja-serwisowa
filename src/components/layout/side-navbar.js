import React from 'react';
import styles from "./side-navbar.css";

const SideNavbar = (props) => {

    const links = props.children.map(element => {
        return (
            <li>
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