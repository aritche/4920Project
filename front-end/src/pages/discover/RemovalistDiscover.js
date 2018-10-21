import React, { Component } from 'react';
import { Container, Segment, Header, Divider } from 'semantic-ui-react';
import RecommendedPostList from '../posts/RecommendedPostList';
import { url } from '../../Api';

export default class RemovalistDiscover extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
        }
    };

    componentDidMount() {
        fetch(url + 'search-posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(response => {
            if (response.status === 200) {
                response.json().then(obj => {
                    var result = [];
                    for (var i = 0; i < obj.moves.length; i++){
                        var move = obj.moves[i];
                        if (move.status === "OPEN"){
                            result.push(obj.moves[i])
                        }
                        result = result.sort(function compare(a,b){
                            var distA = a.distance_string.replace(" km","000")
                            distA = parseInt(distA.replace(" m",""))
                            var distB = b.distance_string.replace(" km","000")
                            distB = parseInt(distB.replace(" m",""))
                            if (a.budget/distA < b.budget/distB)
                                return 1;
                            if (a.budget/distA > b.budget/distB)
                                return -1;
                            return 0;
                        });
                    }
                    this.setState({
                        posts: result.slice(0,4)
                    });
                });
            } else {
                this.setState({
                    submitError: true,
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    }

    render() {
        return (
            <Segment attached style={{backgroundColor: "white", borderRadius: '4px'}}>
                <Header attached='top' size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}>
                    Recommended Moves
                </Header>
                <Segment attached secondary>
                    <RecommendedPostList posts={this.state.posts} />
                </Segment>
            </Segment>
        )
    }
}
