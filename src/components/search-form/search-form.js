import React, {Component} from "react";
import "./search-form.css";


class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <form className="search-form z-depth-1">
                {this.props.elements.map((element) => {
                    return(
                        <div key={element} className="md-form form-sm">
                            <input type="text" id={element} className="form-control form-control-sm" />
                            <label htmlFor={element}>Small input</label>
                        </div>
                    )
                })}
                <button type="button" className="btn btn-sm btn-primary">Wyszukaj</button>
            </form>
        )
    }

}

export default SearchForm;