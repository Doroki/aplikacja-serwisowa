import React from 'react';
import { Container, NavItem, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import styles from './nav-buttons.css';


class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Button size="sm" className="nav-btn" onClick={this.toggle}>
            <i className="fa fa-envelope"></i> Wiadomości
            <span className="sr-only"></span>
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Wiadomości</ModalHeader>
          <ModalBody>
            (...)
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary">Więcej wiadomości...</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ContactButton;