import React, {Component} from "react";
import "./search-form.css";


class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    findData() {
        const dataObj = this.state;
        let dataToFind = {}
    
        for(const key in dataObj) {
            if (dataObj.hasOwnProperty(key)) {
                const element = dataObj[key];
                if(element !== "") dataToFind[key] = element;
            }
        }
        
        console.log(dataToFind)
        this.props.onSubmitSearch(dataToFind);
    }

    render() {
        return (
            <form className={this.props.className ? `search-form z-depth-1 ${this.props.className}` : "search-form z-depth-1"}>
                {this.props.elements.map((element, index) => {
                    return(
                        <div key={element} className="md-form form-sm">
                            <input type="text" id={element} className="form-control form-control-sm" onChange={(e) => this.setState({[this.props.dataKeys[index]]: e.target.value})}/>
                            <label htmlFor={element}>{element}</label>
                        </div>
                    )
                })}
                <button type="button" className="btn btn-sm btn-primary custom-btn" onClick={this.findData.bind(this)}>Wyszukaj</button>
            </form>
        )
    }

}

export default SearchForm;