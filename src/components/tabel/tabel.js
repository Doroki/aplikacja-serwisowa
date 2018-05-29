import React, {Component} from "react";


class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        };
    }

    createTableHeader() {
        const headingsArr = this.props.headings; //It will be passed as Array;

        return(
            <tr>
                {headingsArr.map((head, index)=>{
                    return <th key={`head-${index}`}>{head}</th>
                })}
            </tr>   
        );     
    }

    createTableRows() {
        return(
            <tr>
                {this.state.data.map((data, index)=>{
                    return (
                        <React.Fragment key={`r-fragment${index}`}>
                            {<td key={`lp-${index}`}>1</td>}
                            {this.fillRowWithData(data, index)}
                        </React.Fragment>
                    );
                })}
            </tr>   
        );     
    }

    fillRowWithData(data, index) {
        let filledRow = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                filledRow.push(<td key={`${element}${index}`}>{element}</td>);
            }
        }

        return (
            <React.Fragment>
                {filledRow}
            </React.Fragment>
        );
    }

    render() {
        // this.setState({data: this.props.data});
        return (
            <div className="card custom-table">
                <div className="card-body">    
                    <table className="table table-hover table-responsive-md table-fixed">
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