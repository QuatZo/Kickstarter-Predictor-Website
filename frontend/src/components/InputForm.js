import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'

class InputForm extends React.Component {

    state = {
        startDate: new Date("2020/03/08"),
        endDate: new Date("2020/03/10"),
        name: '',
        budget: '',
        term: ''

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