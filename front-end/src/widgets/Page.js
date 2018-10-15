import {Pagination} from "semantic-ui-react";
import React, {Component} from "react";

export default class Page extends Component {
  render() {
    return (
      <Pagination defaultActivePage={this.props.current} totalPages={this.props.list / 5} />
    )
  }
}
