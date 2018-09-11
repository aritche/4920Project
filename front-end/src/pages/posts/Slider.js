import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'react-semantic-ui-range'
import {Segment, Input} from 'semantic-ui-react';

export default class BudgetSlider extends Component{
  constructor(props){
    super(props);
    this.state={
      value: "$0"
    }
  }

  handleValueChange(e, {value}){
    alert(this.state.value);
    this.setState({
      value: "$" + value
    });
  }

  render(){
    return (
      <div>
        <br/>
        <Input placeholder="0" value={this.state.value} style={{width: 85, height: 30 }}
               onChange={this.handleValueChange.bind(this)}/>
        <Slider
          value={this.state.value}
          color="blue"
          settings={{
          start: this.state.value,
          min:0,
          max:1000,
          step:10,
          onChange: (value) => {
            this.setState({
              value: "$" + value
            })
          }}} />
      </div>
    );
  }
}