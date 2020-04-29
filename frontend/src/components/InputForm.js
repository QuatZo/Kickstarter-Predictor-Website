import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import {CustomInput, Label} from "reactstrap";
import axios from "axios";
// import entire SDK
import AWS from 'aws-sdk';


var file = 'data.json'

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          maincategories: [],
          countries: [],
          requestData: {
            predict: true,
            name: '',
            category: '',
            main_category: '',
            country: '',
            campaign:{
                start: "",
                end: "",
            },
            usd_goal_real: ''
            }
        };
      }

    componentDidMount (){
        let data = {
            "operation": "list",
            "table": "maincategories"
          }
        axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', data)
            .then(res => {
                let items = res.data.Items
                items.sort((a, b) => (a.name > b.name) ? 1 : -1)
                this.setState({maincategories: items})
            })
            .then(() => {
                data.table = "categories"
                axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', data)
                    .then(res => {
                        let items = res.data.Items
                        items.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        this.setState({categories: items})
                    })
                    .catch(err => console.log(err));
            })
            .then(() => {
                data.table = "countries"
                axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', data)
                    .then(res => {
                        let items = res.data.Items
                        items.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        this.setState({countries: items})
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } 

    handle_change = (e) => {
        let { name, value } = e.target;
        const requestData = { ...this.state.requestData, [name]: value};
        this.setState({ requestData });
      };

    handleChangeDateStart = date => {
        var dt;
        try{
            dt = moment(date).format('YYYY-MM-DD')
        }
        catch(RangeError){
            dt = "";
        }
        let requestData = {...this.state.requestData}
        requestData.campaign.start = dt;
        this.setState({requestData});
    };

    handleChangeDateEnd = date => {
        var dt;
        try{
            dt = moment(date).format('YYYY-MM-DD')
        }
        catch(RangeError){
            dt = "";
        }
        let requestData = {...this.state.requestData}
        requestData.campaign.end = dt;
        this.setState({requestData});
    };

    onConfirm = e => {
        e.preventDefault();
        let data = {...this.state.requestData}
        data.country = parseInt(data.country)
        data.category = parseInt(data.category)
        data.main_category = parseInt(data.main_category)
        data.usd_goal_real = data.usd_goal_real.replace(',','.')
        data.usd_goal_real = parseFloat(data.usd_goal_real)

        axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-predictor', data)
            .then(res => {
                console.log(res)
        })
    }

    render() {
        
        return (
           <div className='components'>

            <form onSubmit={this.sendData}>
                <div className='form'>
                <Label for="project_name">Project Name</Label>
                    <div className="form-group">
                        <input 
                            className="inputName"
                            type="text"
                            name="name"
                            placeholder="Input your project name"
                            value={this.state.requestData.name}
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
                            value={this.state.requestData.main_category}
                            required
                        >
                            <option value=''></option>
                            {
                                this.state.maincategories.map(maincategory => (
                                    <option 
                                        value={maincategory.id}> 
                                        {maincategory.name}  
                                    </option>
                                ))
                            }
                        </CustomInput>
                    </div>

                    <Label for="category">Category</Label>
                    <div className="form-select">
                        <CustomInput 
                            type="select"
                            className={"form-control " + this.props.theme}
                            name = "category"
                            onChange={this.handle_change}
                            value={this.state.requestData.category}
                            required
                        >
                            <option value=''></option>
                            {
                                this.state.categories.map(category => (
                                    <option 
                                        value={category.id}> 
                                        {category.name}    
                                    </option>
                                ))
                            }
                        </CustomInput>
                    </div>

                    <Label for="country">Country</Label>
                    <div className="form-select">
                        <CustomInput 
                            type="select"
                            className={"form-control " + this.props.theme}
                            name = "country"
                            onChange={this.handle_change}
                            value={this.state.requestData.country}
                            required
                        >
                            <option value=''></option>
                            {
                                this.state.countries.map(country => (
                                    <option 
                                        value={country.id}> 
                                        {country.name}    
                                    </option>
                                ))
                            }
                        </CustomInput>
                    </div>

                    <Label for="start_date">Start</Label>
                    <div className="form-group">
                        <DatePicker 
                            className="inputTerm"
                            type="text"
                            name="startDate"
                            value={this.state.requestData.campaign.start}
                            onChange={this.handleChangeDateStart}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            required
                        />
                    </div>

                    <Label for="end_date">End</Label>
                    <div className="form-group">
                        <DatePicker 
                            className="inputTerm"
                            type="text"
                            name="endDate"
                            value={this.state.requestData.campaign.end}
                            onChange={this.handleChangeDateEnd}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            required
                        />
                    </div>

                    <Label for="usd_goal_real">USD Goal</Label>
                    <div className="form-group">
                        <input 
                            className="inputUsd_goal_real"
                            type="text"
                            name="usd_goal_real"
                            placeholder="Your USD goal"
                            value={this.state.requestData.usd_goal_real}
                            onChange={this.handle_change}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <button 
                            className="btn btn-primary btn-block" 
                            onClick={this.onConfirm}>Submit
                        </button>
                    </div>
                </div>
                </form>

           </div>
        );
    }



}
export default InputForm;