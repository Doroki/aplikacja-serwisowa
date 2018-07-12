import React from 'react';
import "./side-navbar.css";

const SideNavbar = (props) => {

    const links = props.children.map((element, index) => {
        return (
            <li key={index} onClick={(props.menuOpen) ? props.menuToggle : null}>
                {element}
            </li>
        );
    });

    return (
        <nav className={(props.smallScreenHidden) ? "side-navbar hidden" : "side-navbar"}>
            <div>
                <ul>
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default SideNavbar;