import React, {Component} from "react";
import './tabel.css';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    createTableHeader() {
        const headingsArr = this.props.headings; //It will be passed as Array;

        return(
            <tr>
                {headingsArr.map((head, index)=>{
                    return <th key={`head-${index}`} className="table_lp">{head}</th>
                })}
            </tr>   
        );     
    }

    createTableRows() {
        if(!this.props.data || this.props.data.length < 1) return;
        return(
            <React.Fragment>
                {this.props.data.map((data, index)=>{
                    return (
                        <tr key={`r-fragment${index + (Math.random()*10)}`}>
                            {this.fillRowWithData(data, index)}
                        </tr>
                    );
                })}
            </React.Fragment>
        );     
    }

    fillRowWithData(data, index) {
        let filledRow = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                filledRow.push(<td key={`${index}${Math.random()*5}`}>{element}</td>);
            }
        }

        return (
            <React.Fragment>
                {filledRow}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="card custom-table">
                <div className="card-body">    
                    <table className="table table-hover table-responsive-md">
                        {/* {Table header} */}
                        <thead>
                            {this.createTableHeader()}
                        </thead>

                        {/* {Table body} */}
                        <tbody>
                            {this.createTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Table;