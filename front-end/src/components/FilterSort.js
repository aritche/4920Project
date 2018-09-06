import React, { Component } from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { ratingOptions, priceOptions, cultureOptions, uniOptions, amenitiesOptions, sortingOptions } from '../data'
import './FilterSort.css';


class FilterSort extends Component {
    constructor(props) {
        super();

        this.state = {
            ratingFilter: { value: '0+', label: '0+' },
            priceFilter: [],
            cultureFilter: [],
            uniFilter: [],
            amenitiesFilter: [],
            filterDistance: 1000,
            sortBy: { value: 'popularity', label: 'Popularity' }
        };
    };

    setRatingFilter = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ ratingFilter: selectedOption });
    };

    setPriceFilter = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ priceFilter: selectedOption });
    };

    setCultureFilter = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ cultureFilter: selectedOption });
    };

    setUniFilter = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ uniFilter: selectedOption });
    };

    setAmenitiesFilter = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ amenitiesFilter: selectedOption });
    };

    setDistance = (value) => {
        this.setState({ filterDistance: value });
    };

    setSortBy = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ sortBy: selectedOption });
    };

    render() {
        return(
            <div className="filterSort">
                <div className="filters">
                    <div id="filterRating" className="filterContainer">
                        <div className="filterName">Rating</div>
                        <div className="filterDropContainer">
                            <Select
                                className="filterSingle"
                                value={this.state.ratingFilter}
                                onChange={this.setRatingFilter}
                                options={ratingOptions}
                            />
                        </div>
                    </div>

                    <div className="filterContainer">
                        <div className="filterName">Price</div>
                        <div className="filterDropContainer">
                            <Select
                                className="filterMulti"
                                value={this.state.priceFilter}
                                closeMenuOnSelect={false}
                                isMulti
                                onChange={this.setPriceFilter}
                                options={priceOptions}
                                placeholder={this.state.priceFilter.length}
                                label={this.state.priceFilter.length}
                            />
                        </div>
                    </div>

                    <div className="filterContainer">
                        <div className="filterName">Culture</div>
                        <div className="filterDropContainer">
                            <Select
                                className="filterMulti"
                                value={this.state.cultureFilter}
                                closeMenuOnSelect={false}
                                isMulti
                                onChange={this.setCultureFilter}
                                options={cultureOptions}
                            />
                        </div>
                    </div>

                    <div className="filterContainer">
                        <div className="filterName">University</div>
                        <div className="filterDropContainer">
                            <Select
                                className="filterMulti"
                                value={this.state.uniFilter}
                                closeMenuOnSelect={false}
                                isMulti
                                onChange={this.setUniFilter}
                                options={uniOptions}
                            />
                        </div>
                    </div>

                    <div className="filterContainer">
                        <div className="filterName">Amenities</div>
                        <div className="filterDropContainer">
                            <Select
                                className="filterMulti"
                                value={this.state.amenitiesFilter}
                                closeMenuOnSelect={false}
                                isMulti
                                onChange={this.setAmenitiesFilter}
                                options={amenitiesOptions}
                            />
                        </div>
                    </div>

                    <div className="sliderContainer">
                        <div className="sliderLabel">
                            <div className="sliderName">Max Distance: </div>
                            <div className="sliderMax">Max: 2000km</div>
                        </div>
                        <Slider
                            max={2000}
                            value={this.state.filterDistance}
                            onChange={this.setDistance}
                        />
                    </div>

                </div>

                <Select
                    value={this.state.sortBy}
                    onChange={this.setSortBy}
                    options={sortingOptions}
                />

            </div>
        );
    };
};

export default FilterSort;