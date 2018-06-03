import React from 'react';
import './form-components.css';

const Form = (props) => {  
    return (
        <form className="w-100">
            {props.children}
        </form>
    )
}

const Row = (props) => {  
    return (
        <div class="row">
            {props.children}
        </div>
    )
}

const Input = (props) => {
    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <input type="text" name="name" id={`field${props.id}`} className="form__input" disabled={(props.disabled) ? true : false}/>
        </div>
    );
}

const Select = (props) => {
    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <select id={`field${props.id}`} className="form__input" disabled={(props.disabled) ? true : false} >
                {props.children}
            </select>
        </div>    
    );
}

const Textarea = (props) => {
    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <textarea id={`field${props.id}`} cols={props.col} rows={props.row} className="form__input" disabled={(props.disabled) ? true : false}></textarea>
        </div>
    );
}


export {Form, Row,Input, Select, Textarea};