import React, { Component } from 'react';

import './CollegeDetailsShort.css'

class CollegeDetailsShort extends Component {
    render() {
        const collegePicStyle = {
            backgroundImage: `url('${this.props.college.imageUrl}')`
        };

        // return (
        //     <div className="CollegeDetailsShort">
        //         <div className="collegePicture" style={collegePicStyle}></div>
        //         <div className="collegeName">Name: {this.props.college.name}</div>
        //         <div className="collegePrice">Price: ${this.props.college.price}</div>
        //         <div className="collegeRating">Rating: {this.props.college.rating} stars</div>
        //     </div>
        // );

        return (
            <div className="CollegeDetailsShort">
                <div className="collegeName">Name: {this.props.college.name}</div>
                <div className="collegeUniversity">University: {this.props.college.university}</div>
            </div>
        );
    };
};

export default CollegeDetailsShort;