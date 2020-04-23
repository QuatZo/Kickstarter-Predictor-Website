import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import {CustomInput, Label} from "reactstrap";
// import entire SDK
import AWS from 'aws-sdk';


class InputForm extends React.Component {

    componentDidMount (){
        // Load the AWS SDK for Node.js
        var AWS = require('aws-sdk');
        // Set the region 
        AWS.config.update({region: 'us-east-1'});

        // Create the DynamoDB service object
        var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

        var params = {
            TableName: 'categories',
            Key: {
              'id': {"N": '0'},
              "name": {"S": "Poetry"}
            }
          };

       // Call DynamoDB to read the item from the table
        ddb.getItem(params, function(err, data) {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data.Item);
    }
  });
    }


    state = {
        startDate: new Date("2020/03/08"),
        endDate: new Date("2020/03/10"),
        name: '',
        budget: '',
        term: '',
        main_category: '',
        category: '', 
        country: ''
    }

    // handles change for any Form Field
    handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
        this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
        });
    };

    handleChangeDateStart = date => {
        this.setState({startDate: moment(date).format('YYYY-MM-DD')});
      };

      handleChangeDateEnd = date => {
        this.setState({endDate: moment(date).format('YYYY-MM-DD')});
      };

    render() {
        
        return (
           <div className='components'>
            
                <div className='form'>
                <Label for="project_name">Project Name</Label>
                    <div className="form-group">
                        <input 
                            className="inputName"
                            type="text"
                            name="name"
                            placeholder="Input your project name"
                            value={this.state.name}
                            onChange={this.handle_change}
                            required 
                        />
                    </div>

                    <Label for="budget">Budget (Dollars)</Label>
                    <div className="form-group">
                        <input 
                            className="inputBudget"
                            type="text"
                            name="budget"
                            placeholder="Your budget"
                            value={this.state.budget}
                            onChange={this.handle_change}
                            required 
                        />
                    </div>

                    <Label for="main_category">Main category</Label>
                    <div className="form-select">
                        <CustomInput 
                            type="select"
                            className={"form-control " + this.props.theme}
                            name = "main_category"
                            onChange={this.handle_change}
                            value={this.state.main_category}
                        >
                            <option value="it">IT</option>
                            <option value="clothes">Clothes</option>
                            <option value="cooking">Cooking</option>
                        </CustomInput>
                    </div>

                    <Label for="category">Category</Label>
                    <div className="form-select">
                        <CustomInput 
                            type="select"
                            className={"form-control " + this.props.theme}
                            name = "category"
                            onChange={this.handle_change}
                            value={this.state.category}
                        >
                            <option value="computer">Computer</option>
                            <option value="t_shirt">T-Shirt</option>
                            <option value="pizza">Pizza</option>
                        </CustomInput>
                    </div>

                    <Label for="country">Country</Label>
                    <div className="form-select">
                        <CustomInput 
                            type="select"
                            className={"form-control " + this.props.theme}
                            name = "country"
                            onChange={this.handle_change}
                            value={this.state.country}
                        >
                            <option value="madagaskar">Madagaskar</option>
                            <option value="poland">Poland</option>
                            <option value="usa">USA</option>
                        </CustomInput>
                    </div>

                    <Label for="start_date">Start</Label>
                    <div className="form-group">
                        <DatePicker 
                            className="inputTerm"
                            type="text"
                            name="startDate"
                            value={this.state.startDate}
                            onChange={this.handleChangeDateStart}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                        />
                    </div>

                    <Label for="end_date">End</Label>
                    <div className="form-group">
                        <DatePicker 
                            className="inputTerm"
                            type="text"
                            name="endDate"
                            value={this.state.endDate}
                            onChange={this.handleChangeDateEnd}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                        />
                    </div>

                    <div className="form-group">
                        <button 
                            className="btn btn-primary btn-block" 
                            type="submit">Check project
                        </button>
                    </div>
                </div>

           </div>
        );
    }



}
export default InputForm;