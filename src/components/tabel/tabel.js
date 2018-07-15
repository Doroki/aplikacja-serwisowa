import React, {Component} from "react";
import './tabel.css';
import { Modal, ModalBody, ModalHeader } from 'mdbreact';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalContent: [],

            notification: 0,
            selectValue: "",
            userTextArea: "",
            adminInfo: ""
        }

        this.toggle = this.toggle.bind(this);
    }


    toggle(data) {
        this.setState({
          modal: !this.state.modal,
          notification: 0,
          selectValue: null,
          userTextArea: null,
          adminInfo: null
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
                            onClick={(e) => {
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
            if(key === "tresc" || key === "uwagi" || key === "adres" || key === "e_mail") continue;
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

        const modalContent = this.state.modalContent;


        return (
            <React.Fragment>
                {modalContent.map((element, index) => 
                    (
                        (this.props.editable && modalContent[index].title === "Stan zgłoszenia:")
                        ?
                            (<div key={index} className="modal__info">
                                <label className="modal__title">{modalContent[index].title}</label>
                                <select 
                                    value={this.state.selectValue || modalContent[index].content} 
                                    className="modal__context"
                                    onChange={(e) => this.setState({selectValue: e.target.value})}
                                >
                                    <option value="Przyjęto">Przyjęto</option>
                                    <option value="W realizacji">W realizacji</option>
                                    <option value="Zrealizowano">Zrealizowano</option>
                                </select>
                            </div>)
                        :
                        (modalContent[index].title === "Treść zgłoszenia:")
                        ?
                            (<div key={index} className="modal__info d-flex flex-column">
                                <label className="modal__title">{modalContent[index].title}</label>
                                <textarea 
                                    className="modal__context modal__textarea" 
                                    value={this.state.userTextArea || modalContent[index].content} 
                                    disabled={(this.props.editable) ? false : true}
                                    onChange={(e) => 
                                        (modalContent[index].title === "Treść zgłoszenia:")
                                        ?
                                        this.setState({userTextArea: e.target.value})
                                        :
                                        this.setState({selectValue: e.target.value})}
                                />
                            </div>)
                        :    
                        (modalContent[index].title === "Uwagi serwisowe:")
                        ?
                        (<div key={index} className="modal__info d-flex flex-column">
                            <label className="modal__title">{modalContent[index].title}</label>
                            <textarea 
                                className="modal__context modal__textarea" 
                                value={this.state.adminInfo || modalContent[index].content} 
                                disabled={(this.props.editable) ? false : true}
                                onChange={(e) => 
                                    (modalContent[index].title === "Uwagi serwisowe:")
                                    ?
                                    this.setState({adminInfo: e.target.value})
                                    :
                                    this.setState({selectValue: e.target.value})}
                            />

                                {(this.props.editable && index >= modalContent.length-1) ? 
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.props.onSaveData({
                                        notification: modalContent[0].content,
                                        status: this.state.selectValue,
                                        text: this.state.userTextArea,
                                        info: this.state.adminInfo
                                    })}
                                >
                                    Zapisz
                                </button> 
                                : ""}
                            </div>)
                        :
                            (<div key={index} className="modal__info">
                                <h3 className="modal__title">{modalContent[index].title}</h3>
                                <p className="modal__context">{(/^\d{4}-\d{2}-\d{2}.*/g.test(modalContent[index].content)) ? modalContent[index].content.split("T")[0] : modalContent[index].content}</p>
                            </div>)
                    )
                )}
            </React.Fragment>
        )  
    }

    render() {
        return (
            <div className="card custom-table">
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <span className="modal__header">Zgłoszenie</span>
                        {(this.props.updated !== null && this.props.updated !== undefined) 
                            ? 
                            <span className={(this.props.updated) ? "updated" : "not-updated"}>
                                {(this.props.updated) ? "Zapisano" : "Niezapisano"}
                            </span> 
                            : ""}
                    </ModalHeader>
                        <ModalBody>
                            {this.createModalContent()}
                        </ModalBody>
                    </Modal>
                <div className={(this.props.scrollableY) ? "card-body table-scroll-y" : "card-body"}>
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