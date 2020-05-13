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
    this.state = {
      
    };
  }
  
  render() {
    const { toggle, onConfirm } = this.props;
    return (
      <Modal className={"modal-open"} isOpen={true} toggle={toggle}>
        <ModalHeader className={"modal-header"} toggle={toggle}> 
          Tekst0
        </ModalHeader>
        <ModalBody className={"modal-body"}> 
          Tekst1
        </ModalBody>
        <ModalFooter className={"modal-footer"}>
          <Button onClick={toggle}>
          Okey!
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}