import React from 'react';
import {Divider, Form, Segment, Loader} from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {emptyString} from "../../utils/ValidationUtils";

const searchOptions = {
  types: ['address'],
  componentRestrictions: {country: 'au'}
};

export default class SearchBar extends React.Component {
    constructor(){
        super();

        this.state = {
            segT: false,
            l1: '',
        }
    };

    onChange = (e) => {
        this.props.handleC(e);
    };

    onAddr1Change = (addrL1) => {
        this.setState({segT: true});
        this.setState({l1: addrL1});
        
        geocodeByAddress(addrL1)
            .then(results => getLatLng(results[0]))
            .then(this.props.handleL1(addrL1))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    onAddr1Select = (addrL1) => {
        this.setState({segT: false});
        geocodeByAddress(addrL1)
            .then(results => getLatLng(results[0]))
            .then(this.onChange(this.convertCity(addrL1.split(',')[addrL1.split(',').length - 2])))
            .then(this.onChange(this.convertState(addrL1.split(',')[addrL1.split(',').length - 2])))
            .then(this.onChange(this.convertPostcode(
              this.convertCity(addrL1.split(',')[addrL1.split(',').length - 2]),
              this.convertState(addrL1.split(',')[addrL1.split(',').length - 2]))))
            .then(this.props.handleL1(addrL1.split(',')[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    convertCity = (cityState) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.cityN;
        let city = "";
        let cityStateList = cityState.split(' ');
        for (let x = 0; x < cityStateList.length; x++) {
            if (cityStateList[x] !== ',' && cityStateList[x] !== '' && x !== cityStateList.length - 1) {
              city = city + " " + cityStateList[x];
            }
        }
        e.target.value = city;
        return e;
    };

    convertState = (cityState) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.stateN;
        let cityStateList = cityState.split(' ');
        e.target.value = cityStateList[cityStateList.length - 1];
        return e;
    };

    convertPostcode = (city, state) => {
        let link = 'http://v0.postcodeapi.com.au/suburbs.json?name=Randwick';
        let e = {};
        e.target ={};
        e.target.name = this.props.postN;
        e.target.value = '';
        fetch(link)
            .then(result => {
                result.forEach(function(addr) {
                    alert(addr.state.abbreviation);
                    if (addr.name === city.target.value && addr.state.abbreviation === state.target.value) {
                        e.target.value = addr.postcode;
                        return e;
                    }
                });
            })
          .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
          });
        return e;
    };

    onAddr2Change = (addr2) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.l2N;
        e.target.value = addr2.target.value;
        this.props.handleC(e);
    };

    onCityChange = (city) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.cityN;
        e.target.value = city.target.value;
        this.props.handleC(e);
    };

    onStateChange = (state) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.stateN;
        e.target.value = state.target.value;
        this.props.handleC(e);
    };

    onPostChange = (post) => {
        let e = {};
        e.target = {};
        e.target.name = this.props.postN;
        e.target.value = post.target.value;
        this.props.handleC(e);
    };

    render() {
        return (
          <PlacesAutocomplete
            value={this.props.addrL1}
            onChange={this.onAddr1Change}
            onSelect={this.onAddr1Select}
            searchOptions={searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Form.Input
                  error={(this.props.addrL1.length <= 0|| emptyString(this.props.addr1)) && this.props.submitT}
                  name={this.props.ident + 'AddrL1'} icon='building'
                  iconPosition={'left'} style={{width: 400}}
                       {...getInputProps({
                         placeholder: 'Street Address',
                         className: 'location-search-input',
                       })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && 
                    <Segment style={{width: 400}}>
                      <Loader active style={{marginTop:"10px"}}/>
                    </Segment>
                  }
                  {loading !== undefined && !loading && this.state.segT && this.state.l1 !== ""
                  ?
                    suggestions.length > 0
                    ?
                        <Segment style={{width: 400, padding: '1px'}}>
                          {
                            suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                const style = suggestion.active
                                  ? { backgroundColor: '#DFF2FF', cursor: 'pointer', padding: '10px', border: '1px solid #c8e2f5'}
                                  : { backgroundColor: 'white', cursor: 'pointer', padding: '10px', border: '1px solid white'};
                                return (
                                  <div style={{borderRadius: '4px'}}
                                       {...getSuggestionItemProps(suggestion, {
                                         className,
                                         style,
                                       })}
                                  >
                                    <div style={{marginLeft: "10px"}}>{suggestion.description}</div>
                                  </div>
                                );
                            })
                          }
                        </Segment>
                    :
                        <div/>

                  :
                    <div/>
                  }
                </div>
                <br/>
                <Form.Input
                  name={this.props.ident + 'AddrL2'}
                  icon='building' iconPosition='left'
                  style={{width: 400}} fluid placeholder='Unit/Room Number'
                  onChange={this.onAddr2Change}
                />
                <br/>
                <div style={{display: 'flex'}} >
                  <Form.Input
                    error={emptyString(this.props.city) && this.props.submitT}
                    value={this.props.city}
                    style={{width: 160}}
                    fluid
                    placeholder='City'
                    onChange={this.onCityChange}
                  />
                  <span style={{width: 20}}/>
                  <Form.Input
                    error={emptyString(this.props.state) && this.props.submitT}
                    value={this.props.state}
                    style={{width: 80}}
                    fluid
                    placeholder='State'
                    onChange={this.onStateChange}
                  />
                  <span style={{width: 20}}/>
                  <Form.Input
                    error={emptyString(this.props.postCode) && this.props.submitT && this.props.postCode.length !== 4}
                    value={this.props.postCode}
                    style={{width: 120}}
                    fluid
                    placeholder='Post Code'
                    onChange={this.onPostChange}
                  />
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
    }
}