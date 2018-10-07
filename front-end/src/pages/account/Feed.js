import React, {Component} from 'react'
import { Feed, Image} from 'semantic-ui-react'
import m1 from '../../avatar/male1.jpg';
import m2 from '../../avatar/male2.jpg';
import m3 from '../../avatar/male3.jpg';
import m4 from '../../avatar/male4.jpg';
import m5 from '../../avatar/male5.jpg';
import m6 from '../../avatar/male6.jpg';
import m7 from '../../avatar/male7.jpg';
import f1 from '../../avatar/female1.jpg';
import f2 from '../../avatar/female2.jpg';
import f3 from '../../avatar/female3.jpg';
import f4 from '../../avatar/female4.jpg';
import f5 from '../../avatar/female5.jpg';
import f6 from '../../avatar/female6.jpg';
import f7 from '../../avatar/female7.jpg';

export default class SingleFeed extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image src={this.props.avatar} size='tiny'/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.name}</Feed.User> {this.props.event}
              <Feed.Date>{this.props.dateTime}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {this.props.detail}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
)
  };
}