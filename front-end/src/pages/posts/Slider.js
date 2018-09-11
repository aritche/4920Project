import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'react-semantic-ui-range'
import {Segment, Input} from 'semantic-ui-react';

export default class BudgetSlider extends Component{
  constructor(props){
    super(props);
    this.state={
      value: 0
    }
  }

  // I try to have the slider change the state of the
  handleValueChange(e, {value}){
    alert(this.state.value);
    this.setState({
      value: value
    });
  }

  render(){
    const settings = {
      start:0,
      min:0,
      max:1000,
      step:10,
    };
    return (
      <div>
        <br/>
        <Input placeholder="0" value={this.state.value} style={{width: 75, height: 30 }} onChange={this.handleValueChange.bind(this)}/>
        <Segment>
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
                value:value
              })
            }}} />
        </Segment>
      </div>
    );
  }

}