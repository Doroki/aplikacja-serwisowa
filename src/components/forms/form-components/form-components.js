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

    const saveData = (value) => {
        let objToChange = props.target;
        props.onChangeField(objToChange, value);
    };

    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <input 
                type="text" 
                name="name" 
                id={`field${props.id}`} 
                className="form__input" 
                disabled={(props.disabled) ? true : false}
                onChange={(e) => saveData(e.target.value)}
                value={props.value}
            />
        </div>
    );
}

const Select = (props) => {
    
    const saveData = (value) => {
        let objToChange = props.target;
        props.onChangeField(objToChange, value);
    };
    
    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <select id={`field${props.id}`} 
                className="form__input" 
                disabled={(props.disabled) ? true : false} 
                onChange={(e) => saveData(e.target.value)}
            >
                {props.children}
            </select>
        </div>    
    );
}

const Textarea = (props) => {

    const saveData = (value) => {
        let objToChange = props.target;
        props.onChangeField(objToChange, value);
    };

    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
            <textarea 
                id={`field${props.id}`} 
                cols={props.col} 
                rows={props.row} 
                className="form__input" 
                disabled={(props.disabled) ? true : false} 
                onChange={(e) => saveData(e.target.value)}>
            </textarea>
        </div>
    );
}

const Submit = (props) => {

    const sumbitForm = (e) => {
        e.preventDefault();
        props.onAccept();
    }

    return (
        <button className="form__submit" disabled={(props.disabled) ? true : false} onClick={e => sumbitForm(e)} >{props.value}</button>
    );
}


export {Form, Row, Input, Select, Textarea, Submit};