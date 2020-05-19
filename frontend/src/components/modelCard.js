import React from "react";
import 'react-datepicker/dist/react-datepicker.css';

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
                            {this.props.model.name.replace('-',' ').replace('-v',' v').replace('_','.')}
                        </div>
                        
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-12">{this.props.model.description} </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default ModelCard;