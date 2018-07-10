import React from 'react';
import './form-components.css';

const Form = (props) => {  
    return (
        <form className={(props.className) ? props.className : "" + "w-100"}>
            {props.children}
        </form>
    )
}

const Row = (props) => {  
    return (
        <div className={(props.className) ? props.className : "" + "row m-1" }>
            {props.children}
        </div>
    )
}

const Input = (props) => {

    const saveData = (value) => {
        props.onChangeField(props.target, value);
    };

    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className={(props.className) ? `form__input ${props.className}` : "form__label"}>{props.label}</label>
            <input 
                type={props.type || "text"}
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
<<<<<<< HEAD
        let objToChange = props.target;
        props.onChangeField(objToChange, value);
=======
        props.onChangeField(props.target, value);
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
    };
    
    return (
        <div className="form__field col">
            <label htmlFor={`field${props.id}`} className="form__label">{props.label}</label>
<<<<<<< HEAD
            <select id={`field${props.id}`} className="form__input" disabled={(props.disabled) ? true : false} onChange={(e) => saveData(e.target.value)}>
=======
            <select id={`field${props.id}`} 
                className="form__input" 
                disabled={(props.disabled) ? true : false} 
                onChange={(e) => saveData(e.target.value)}
                value={props.value}
            >
>>>>>>> f5d6c547b310f36983167fc96200859d0b94f4cd
                {props.children}
            </select>
        </div>    
    );
}

const Textarea = (props) => {

    const saveData = (value) => {
        props.onChangeField(props.target, value);
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
                value={props.value} 
                onChange={(e) => saveData(e.target.value)}>
            </textarea>
        </div>
    );
}

const Submit = (props) => {

    const sumbitForm = (e) => {
        e.preventDefault();
        props.onAccept(props.type);
    }

    return (
        <button className={(props.className) ? props.className : "form__submit"} disabled={(props.disabled) ? true : false} onClick={e => sumbitForm(e)} >{props.value}</button>
    );
}


export {Form, Row, Input, Select, Textarea, Submit};