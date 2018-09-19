import React from 'react';
import { Header, Input } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const searchOptions = {
  types: ['address'],
  componentRestrictions: {country: 'au'}
};

export default class SearchBar extends React.Component {

    onChange = (e) => {
        this.props.handleC(e);
    };

    onAddr1Change = (addrL1) => {
        geocodeByAddress(addrL1)
            .then(results => getLatLng(results[0]))
            .then(this.props.handleL1(addrL1))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    onAddr1Select = (addrL1) => {
        geocodeByAddress(addrL1)
            .then(results => getLatLng(results[0]))
            //.then(this.onChange(this.convertCity(addrL1.split(',')[addrL1.split(',').length - 2])))
            //.then(this.onChange(this.convertState(addrL1.split(',')[addrL1.split(',').length - 2])))
            //.then(this.onChange(this.convertPostcode(
              //this.convertCity(addrL1.split(',')[addrL1.split(',').length - 2]),
              //this.convertState(addrL1.split(',')[addrL1.split(',').length - 2]))))
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
        city = city + " " + cityStateList[0];
        if (cityStateList.length > 2) {
          for (let x = 1; x < cityStateList.length; x++) {
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
                alert(result);
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
                <Header size={'tiny'}> Where are you moving from? </Header>
                <br/>
                <Input
                  name={this.props.ident + 'AddrL1'} icon='building'
                  iconPosition={'left'} style={{width: 400}}
                       {...getInputProps({
                         placeholder: 'Street Address',
                         className: 'location-search-input',
                       })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', width: 400 }
                      : { backgroundColor: '#D3D3D3', cursor: 'pointer', width: 400 };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
                <br/>
                <Input
                  name={this.props.ident + 'AddrL2'}
                  icon='building' iconPosition='left'
                  style={{width: 400}} fluid placeholder='Unit/Room Number'
                  onChange={this.onChange}
                />
                <br/>
                <div style={{display: 'flex'}} >
                  <Input
                    name={this.props.ident + 'City'}
                    //value={this.props.city}
                    style={{width: 160}}
                    fluid
                    placeholder='City'
                    onChange={this.onChange}
                  />
                  <span style={{width: 20}}/>
                  <Input
                    name={this.props.ident + 'State'}
                    //value={this.props.state}
                    style={{width: 80}}
                    fluid
                    placeholder='State'
                    onChange={this.onChange}
                  />
                  <span style={{width: 20}}/>
                  <Input
                    name={this.props.ident + 'PostCo'}
                    //value={this.props.postCode}
                    style={{width: 120}}
                    fluid
                    placeholder='Post Code'
                    onChange={this.onChange}
                  />
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
    }
}