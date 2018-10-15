import React, { Component } from 'react';
import { Segment} from 'semantic-ui-react';

export default class MainFooter extends Component {
    render() {
        return (
          <Segment style={{backgroundColor: '#193446', color: 'white', boxShadow: '-10px 1px 10px black'}}
                   textAlign='right'>
              uMove © 2018
          </Segment>
        )
    }
}
