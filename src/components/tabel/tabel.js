import React, {Component} from "react";
import './tabel.css';
import { Container, Button, Modal, ModalBody, ModalHeader } from 'mdbreact';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalContent: []
        }

        this.toggle = this.toggle.bind(this);
    }


    toggle(data) {
        this.setState({
          modal: !this.state.modal,
        });

        if(typeof data === "object") {
            this.setState({
                modalContent: this.props.fetchData(data)
            });
        }
      }

    createTableHeader() {
        if(!this.props.headings) return;
        const headingsArr = this.props.headings; //It will be passed as Array;

        return(
            <tr>
                {headingsArr.map((head, index)=>{
                    return <th 

                                onClick={(this.props.onHeadingClick) ? (() => this.props.onHeadingClick(index)) : null}
                                key={`head-${index}`} 
                                className={(this.props.dataKeys && this.props.dataKeys[index] === this.props.sortBy) ? `table_lp ${this.props.sortMethod}` : "table_lp"}
                                >
                                    {head}
                            </th>
                })}
            </tr>   
        );     
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // console.log(error, info);
      }

    createTableRows() {
        if(!this.props.data || this.props.data.length < 1) return;
        return(
            <React.Fragment>
                {this.props.data.map((data, index)=>{
                    return (
                        <tr 
                            key={`r-fragment${index + (Math.random()*10)}`}
                            onClick={(e, error) => {
                                if(error) console.log(error)
                                console.log(e.target)
                                this.toggle(data)
                            }}
                        >
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
                let element = data[key];
                if(/^data*/g.test(key)) element = data[key].split("T")[0];
                filledRow.push(<td key={`${index}${Math.random()*5}`}>{element}</td>);
            }
        }

        return (
            <React.Fragment>
                {filledRow}
            </React.Fragment>
        );
    }

    createModalContent() {
        if(this.state.modalContent.length <= 0) return; 
        return (
            <React.Fragment>
                {this.state.modalContent.map((element, index) => (<div key={index}><h3>{this.state.modalContent[index].title}</h3><p>{this.state.modalContent[index].content}</p></div>))}
            </React.Fragment>
        )  
    }

    render() {
        console.log(this.state)
        return (
            <div className="card custom-table">
                <Container>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Zgłoszenie</ModalHeader>
                        <ModalBody>
                            {this.createModalContent()}
                        </ModalBody>
                    </Modal>
                </Container>
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