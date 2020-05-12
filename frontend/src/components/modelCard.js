import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import axios from "axios";


class ModelCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='model'>
                {this.props.model ? (
                    <div className='card'>
                        <div class="card-header">
                            {this.props.model.name}
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6 col-sm-6"><b>Created</b></div>
                                <div class="col-6 col-sm-6"> {this.props.model.created} </div>
                            </div>
                            <div class="row">
                                <div class="col-6 col-sm-6"><b>Accuracy</b></div>
                                <div class="col-6 col-sm-6"> {this.props.model.accuracy} </div>
                            </div>
                            <div class="row">
                                <div class="col-6 col-sm-6"><b>Description</b></div>
                                <div class="col-6 col-sm-6"> {this.props.model.description} </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default ModelCard;