import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateTimePicker extends Component{
  constructor(props){
    super(props);
    this.state={
      date: '',
      timeFrom: '',
      timeTo: ''
    }
  }

  handleValueChange(e, {date}){
    alert(this.state.value);
    this.setState({
      value: ''
    });
  }

  render(){
    return (
      <div style={{display: 'flex'}}>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          placeholderText={'Date'}
          display={'block'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat="LT"
          timeCaption="Time"
          placeholderText={'From'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat="LT"
          timeCaption="Time"
          placeholderText={'To'}
        />
      </div>
    );
  }
}