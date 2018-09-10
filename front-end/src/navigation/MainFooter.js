import React, { Component } from 'react';
import { Menu, Segment} from 'semantic-ui-react';

export default class MainFooter extends Component {
    render() {
        return (
            <footer>
                <Segment attached inverted color='black' tertiary textAlign='right'>
                    uMove © 2018
                </Segment>
            </footer>
        )
    }
}
