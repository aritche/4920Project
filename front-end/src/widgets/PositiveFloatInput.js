import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {isPositiveFloat, isTypingPositiveFloat, isZero} from '../utils/ValidationUtils';

export default class PositiveFloatInput extends Component {
  onChange = (value) => {
    if (isTypingPositiveFloat(value)) {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <Form.Field>
        {this.props.labelHtml ?
          this.props.labelHtml
          :
          <label>{this.props.label}</label>
        }

        <Form.Input fluid value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={(e) => {
                      this.onChange(e.target.value)
                    }}
                    error={!isPositiveFloat(this.props.value) || isZero(this.props.value)}/>
      </Form.Field>
    );
  }
}