import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import {CustomInput, Label} from "reactstrap";
import ModelCard from "./modelCard";
import axios from "axios";


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          maincategories: [],
          countries: [],
          models: [],
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
            usd_goal_real: '',
            model: ''
          },
          checked: false,
        };
      }

    componentDidMount (){
        let data = {
            operation: "list",
            table: "maincategories"
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
            .catch(err => console.log(err))
            .then(() => {
                data.table = "models"
                axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', data)
                    .then(res => {
                        let items = res.data.Items
                        items.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        this.setState({models: items})
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

    handleCheckboxChange = event =>{
        this.setState({checked: event.target.checked});
    }

    onConfirm = e => {
        e.preventDefault();
        let data = {...this.state.requestData}
        let models = {...this.state.models}
        data.country = parseInt(data.country)
        data.category = parseInt(data.category)
        data.main_category = parseInt(data.main_category)
        data.usd_goal_real = data.usd_goal_real.replace(',','.')
        data.usd_goal_real = parseFloat(data.usd_goal_real)
        data.model = models[data.model].name
        console.log(data)

        let id = -1

        // axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-predictor', data)
        //     .then(res => {
        //         data = res.data;
        //         let dynamo_data = {
        //             operation: "list",
        //             table: "predictions",
        //           }
        //           axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', dynamo_data)
        //             .then(dynamo_res => {
        //                 let items = dynamo_res.data.Items
        //                 items.sort((a, b) => (a.id < b.id) ? 1 : -1)
        //                 console.log(items)
        //                 if(items.length){
        //                     id = items[0].id
        //                 }
        //                 console.log(id)
        //             })
        //             .then(() => {
        //                 data.id = id + 1;
        //                 data.start = data.campaign.start;
        //                 data.end = data.campaign.end;
        //                 delete data.campaign;

        //                 let predict_data = {
        //                     operation: "create",
        //                     table: "predictions",
        //                     id: id + 1,
        //                     record: data 
        //                 }
        //                 console.log(predict_data)
        //                 console.log(JSON.stringify(predict_data))
        //                 axios.post('https://3l7z4wecia.execute-api.us-east-1.amazonaws.com/default/api-dynamodb', predict_data)
        //             })
        //     })
    }

    validate(form, checkbox){
        return{
            name: form.name.trim().length === 0,
            category: form.category.trim().length === 0,
            main_category: form.main_category.trim().length === 0,
            country: form.country.trim().length === 0,
            start: form.campaign.start.toString().trim().length === 0 || !(moment(form.campaign.start.toString(), "YYYY-MM-DD").isValid()),
            end: form.campaign.end.toString().trim().length === 0 || !(moment(form.campaign.end.toString(), "YYYY-MM-DD").isValid()),
            end_start: form.campaign.end.toString().trim() < form.campaign.start.toString().trim() && form.campaign.end.toString().trim().length > 0,
            end_start_equal: form.campaign.end.toString().trim() === form.campaign.start.toString().trim() && form.campaign.end.toString().trim().length > 0,
            usd_goal_real: form.usd_goal_real.trim().length === 0,
            usd_goal_real_not_number: !(/^[0-9]*[.]{0,2}[0-9]{0,2}$/.test(form.usd_goal_real)),
            model: form.model.trim().length === 0,
            checked: checkbox === false,
          }
      }

    render() {
        const errors = this.validate(this.state.requestData, this.state.checked);
        const isEnabled = !Object.keys(errors).some(x => errors[x]); // button is disabled as long as error exists
        return (
           <div className='components'>
               <div className='form'>
                <form onSubmit={this.sendData}>
                    <div className="form-group">
                        <Label for="project_name">Project Name</Label>
                        <input 
                            className="form-control"
                            type="text"
                            name="name"
                            value={this.state.requestData.name}
                            onChange={this.handle_change}
                            required 
                        />
                        {errors.name ? (<span className='errorText'>Please insert campaign name</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="main_category">Main category</Label>
                        <CustomInput 
                            type="select"
                            className="form-control"
                            name = "main_category"
                            onChange={this.handle_change}
                            value={this.state.requestData.main_category}
                            required
                        >
                            <option value=''></option>
                            {this.state.maincategories.map(maincategory => (
                                <option 
                                    value={maincategory.id}> 
                                    {maincategory.name}  
                                </option>
                            ))}
                        </CustomInput>
                        {errors.main_category ? (<span className='errorText'>Please choose main category</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="category">Category</Label>
                        <CustomInput 
                            type="select"
                            className="form-control"
                            name = "category"
                            onChange={this.handle_change}
                            value={this.state.requestData.category}
                            required
                        >
                            <option value=''></option>
                            {this.state.categories.map(category => (
                                <option 
                                    value={category.id}> 
                                    {category.name}    
                                </option>
                            ))}
                        </CustomInput>
                        {errors.category ? (<span className='errorText'>Please choose category</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="country">Country</Label>
                        <CustomInput 
                            type="select"
                            className="form-control"
                            name = "country"
                            onChange={this.handle_change}
                            value={this.state.requestData.country}
                            required
                        >
                            <option value=''></option>
                            {this.state.countries.map(country => (
                                <option 
                                    value={country.id}> 
                                    {country.name}    
                                </option>
                            ))}
                        </CustomInput>
                        {errors.country ? (<span className='errorText'>Please choose country</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="start_date">Start</Label>
                        <DatePicker 
                            className={"form-control" + (errors.begin ? " error" : "")}
                            type="text"
                            name="start"
                            value={this.state.requestData.campaign.start}
                            onChange={this.handleChangeDateStart}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            required
                        />
                            {errors.start ? (<span className='errorText'>Please choose start date</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="end_date">End</Label>
                        <DatePicker 
                            className={"form-control" + (errors.end ? " error" : "")}
                            type="text"
                            name="end"
                            value={this.state.requestData.campaign.end}
                            onChange={this.handleChangeDateEnd}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            required
                        />
                        {errors.end ? (<span className='errorText'>Please choose end date </span>) : null}
                        {errors.end_start ? (<span className='errorText'>End date can't be earlier than start date. We don't support time travel</span>) : null}
                        {errors.end_start_equal ? (<span className='errorText'>Start date must be earlier than end date, not equal!</span>) : null}
                    </div>

                    
                    <div className="form-group">
                        <Label for="usd_goal_real">USD Goal</Label>
                        <input 
                            className={"form-control" + (errors.usd_goal_real ? " error" : "")}
                            type="text"
                            name="usd_goal_real"
                            value={this.state.requestData.usd_goal_real}
                            onChange={this.handle_change}
                            required 
                        />
                        {errors.usd_goal_real ? (<span className='errorText'>Please insert money goal (in $). </span>) : null}
                        {errors.usd_goal_real_not_number ? (<span className='errorText'>Incorrect value. Make sure to use dot instead of comma</span>) : null}
                    </div>

                    <div className="form-group">
                        <Label for="model">Model</Label>
                        <CustomInput 
                            type="select"
                            className="form-control"
                            name = "model"
                            onChange={this.handle_change}
                            value={this.state.requestData.model}
                            required
                        >
                            <option value=''></option>
                            {this.state.models.map((model, index) => (
                                <option 
                                    value={index}> 
                                    {model.name} [{model.accuracy}%] (Created: {model.created})
                                </option>
                            ))}
                        </CustomInput>
                        {errors.model ? (<span className='errorText'>Please choose ANY model</span>) : null}
                    </div>
                    
                    <div className="form-group">
                        <div className='checkboxContainer'>
                        <input 
                            className={"form-control" + (errors.checked ? " error" : "")}
                            type="checkbox"
                            name="checked"
                            value={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            required 
                        />
                        <Label for="checked" className='checkedText'>&nbsp;I agree to save given data for future analysis.</Label>
                        </div>
                        {errors.checked ? (<span className='errorChecked'>You must to agree in order to proceed</span>) : null}
                    </div>

                    <div className="form-group">
                        <button 
                            disabled={!isEnabled}
                            className="btn btn-primary btn-block" 
                            onClick={this.onConfirm}>Submit
                        </button>
                    </div>
                </form>
                </div>
                <ModelCard
                    model={this.state.models[this.state.requestData.model]}
                >
                </ModelCard>
           </div>
        );
    }
}
export default InputForm;