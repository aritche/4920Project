import React,{Component} from 'react';
import { Slider } from 'react-semantic-ui-range'
import { Input } from 'semantic-ui-react';

export default class InputSlider extends Component{
  render(){
    return (
      <div>
        <br/>
        <Input icon={this.props.icon} iconPosition={this.props.icon ? 'left' : ''} placeholder="0" value={ this.props.value } style={{width: 100, height: 30 }}
               onChange={(e) => { this.props.onChange(e.target.value) }}/>
        <Slider
          value={this.props.value}
          color={this.props.color ? this.props.color : "blue"}
          settings={{
          start: this.props.value,
          min: this.props.min,
          max: this.props.max,
          step: this.props.step,
          onChange: this.props.onChange
          }} />
      </div>
    );
  }
}