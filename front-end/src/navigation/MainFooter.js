import React, { Component } from 'react';
import { Segment} from 'semantic-ui-react';

export default class MainFooter extends Component {
    render() {
        return (
          <Segment style={{backgroundColor: '#193446', color: 'white'}} textAlign='right'>
              uMove © 2018
          </Segment>
        )
    }
}
