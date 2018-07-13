import React from 'react';
import './tab-container.css';


const TabContainer = (props) => {
    
    return (
        <div class="contact">
            {props.children}
        </div>
    )
}

const Tab = (props) => {
    
    function setClassToTab() {
        if(props.active === props.targetTab) {
            return "contact__item contact__item--active";
        } else {
            return "contact__item";
        }
    }

    return (
        <li className={setClassToTab()}>
            <a className="contact__link" href="" data-target-tab={props.targetTab}>{props.children}</a>
        </li>
    );
}

const TabList = (props) => {
    return (
        <ul class="contact__header" id="button-list" onClick={e => props.onClickTab(e)}>
            {props.children}
        </ul>
    );
}

const TabBody = (props) => {
    return (
        <div class="contact__content content z-depth-2">
            <div class="content__form" id="form-list">
                {props.children}
            </div>
        </div>
    );
}

const TabPanel = (props) => {
    
    function setClassToPanel() {
        if(props.active === props.id) {
            return "content__tab form content__tab--active";
        } else {
            return "content__tab form";
        }
    }

    return (
        <div id={props.id} className={setClassToPanel()}>
            {props.children}
        </div>
    );
}

export {TabContainer, Tab, TabBody, TabList, TabPanel};