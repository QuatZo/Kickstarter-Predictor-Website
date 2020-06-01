import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { toggle } = this.props;
    return (
      <Modal className={"modal-open"} isOpen={true} toggle={toggle} size="xl">
        <ModalBody className={"modal-body"}> 
          <iframe width="100%" height="875" src="https://datastudio.google.com/embed/reporting/4d6d0ebc-3475-4b86-be64-83f3ce13a6fb/page/EpRRB" frameborder="0" allowfullscreen></iframe>
        </ModalBody>
      </Modal>
    );
  }
}