import React, {Component} from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader } from 'mdbreact';
import Task from './task';
import './task-button.css'

class TaskButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            tasks: [],
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/tasks')
            .then(response => response.json())
            .then(resp => {
                if(resp && resp.length > 0) {
                    resp.forEach(task => {
                        this.onAddTask(task);
                    });
                }
            });
    }

    sentToDatabase(term) {
        fetch("http://localhost:8080/api/tasks", {
            mode: "cors",
            method: "PUT",
            body: JSON.stringify({content: term}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    removeFromDatabase(term) {
        fetch("http://localhost:8080/api/tasks", {
            mode: "cors",
            method: "DELETE",
            body: JSON.stringify({content: term}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    onInputChange(term){
        this.setState({term})
    }

    
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // console.log(error, info);
      }

    onAddTask(newValue){
        if(!newValue && this.state.term === "") return;
        let keyRandomValue = Math.random()*1000
        let task = <Task 
                        key={keyRandomValue} 
                        keyValue={keyRandomValue}
                        value={newValue || this.state.term} 
                        onClickTask={(element) => this.refreshTaskList(element)} />;

        this.setState(tasks => ({
            tasks: [...this.state.tasks, task],
            term: ''
        }));

        if(!newValue) this.sentToDatabase(this.state.term);
    }

    refreshTaskList(keyValue) {
        const keyOfElement = keyValue.toString();
        let taskList = this.state.tasks;

        let taskValueToRemove = taskList.filter(element => element.key === keyOfElement)[0].props.value;
        this.removeFromDatabase(taskValueToRemove);

        let index = taskList.indexOf(taskList.filter(element => element.key === keyOfElement)[0]);
        if (index > -1) {
            taskList.splice(index, 1);
        }
        this.setState({tasks: taskList});
    }

    taskCounter() {
        if(this.state.tasks.length){
            return <span className="counter">{this.state.tasks.length}</span>
        }
    }

    render() {
        return (
          <Container>
            {this.taskCounter()}
            <Button size="sm" className="nav-btn" onClick={this.toggle}>
                <i className="fa fa-tasks"></i> Zadania
            </Button>
    
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Zadania</ModalHeader>
            {/* Dodawanie zadania */}
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        <div className="col-sm-9">
                            <div className="md-form mt-0">
                                <input value={this.state.term} onChange={event => this.onInputChange(event.target.value)} type="text" className="form-control" placeholder="Treść zadania" />
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <button  onClick={() => this.onAddTask()} type="button" className="btn light-green btn-sm">Dodaj</button>
                        </div>
                    </div>
                </div>
                <ModalBody className="modal-body-wrapper">
                    {this.state.tasks}
                </ModalBody>
            </Modal>
          </Container>
        );
      }
}


export default TaskButton;