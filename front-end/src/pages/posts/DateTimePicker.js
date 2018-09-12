import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateTimePicker extends Component{

  onDateChange = (date) => {
    this.props.handleD(date);
  };

  onTime1Change = (time1) => {
    this.props.handleT1(time1);
  };

  onTime2Change = (time2) => {
    this.props.handleT2(time2);
  };

  render(){
    return (
      <div style={{display: 'flex'}}>
        <DatePicker
          selected={this.props.date}
          onChange={this.onDateChange}
          placeholderText={'Date'}
          display={'block'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.props.time1}
          onChange={this.onTime1Change}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat="LT"
          timeCaption="Time"
          placeholderText={'From'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.props.time2}
          onChange={this.onTime2Change}
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

  /*
  onDateChange = (date) => {
    this.props.handleD(date);
  };

  onTime1Change = (time1) => {
    this.props.handleT1(time1);
  };

  onTime2Change = (time2) => {
    this.props.handleT2(time2);
  };
  */

  /*
  render(){
    return (
      <div style={{display: 'flex'}}>
        <DatePicker
          selected={this.onDateChange}
          onChange={this.onDateChange}
          placeholderText={'Date'}
          display={'block'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.onTime1Change}
          onChange={this.onTime1Change}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat="LT"
          timeCaption="Time"
          placeholderText={'From'}
        />
        <span style={{width: 20}}/>
        <DatePicker
          selected={this.onTime2Change}
          onChange={this.onTime2Change}
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
  */
}