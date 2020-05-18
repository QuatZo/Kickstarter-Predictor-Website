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
      <Modal className={"modal-open"} isOpen={true} toggle={toggle}>
        <ModalHeader className={"modal-header"} toggle={toggle}> 
          {this.props.title}
        </ModalHeader>
        <ModalBody className={"modal-body"}> 
          {this.props.message}
        </ModalBody>
        <ModalFooter className={"modal-footer"}>
          <Button onClick={toggle}>
          Nice!
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}