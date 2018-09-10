import React, { Component } from 'react';
import { Menu, Segment} from 'semantic-ui-react';

export default class MainFooter extends Component {
    render() {
        return (
            <footer>
                <Segment textAlign='right'>
                    uMove © 2018
                </Segment>
            </footer>
        )
    }
}
