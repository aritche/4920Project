import React,{ Component } from 'react';
import DatePicker from 'react-datepicker';
import { Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Author: VW
 */
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
            <div>
                <Header size={'tiny'} content={'Date'}/>
                <DatePicker
                  header={"Date"}
                  selected={this.props.date}
                  onChange={this.onDateChange}
                  display={'block'}
                />
            </div>
            <span style={{width: 20}}/>
            <div>
              <Header size={'tiny'} content={'From'}/>
              <DatePicker
                selected={this.props.time1}
                onChange={this.onTime1Change}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="LT"
                timeCaption="Time"
              />
            </div>
            <span style={{width: 20}}/>
            <div>
              <Header size={'tiny'} content={'To'}/>
              <DatePicker
                selected={this.props.time2}
                onChange={this.onTime2Change}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="LT"
                timeCaption="Time"
              />
            </div>
          </div>
        );
    }
}