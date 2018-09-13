import React from 'react';
import { Header, Input } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class SearchBar extends React.Component {

    onChange = (e) => {
        this.props.handleC(e);
    };

    onAddr2Change = (addrL2) => {
        geocodeByAddress(addrL2)
          .then(results => getLatLng(results[0]))
          .then(this.props.handleL2(addrL2))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };

    render() {
        return (
          <PlacesAutocomplete
            value={this.props.addrL2}
            onChange={this.onAddr2Change}
            onSelect={this.onAddr2Change}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Header size={'tiny'}> Where are you moving from? </Header>
                <Input
                  icon='building' iconPosition='left'
                  style={{width: 400}} fluid placeholder='Address line 1'
                  onChange={this.onChange}
                />
                <br/>
                <Input icon='building' iconPosition={'left'} style={{width: 400}}
                       {...getInputProps({
                         placeholder: 'Address Line 2',
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
                <div style={{display: 'flex'}} >
                  <Input
                    style={{width: 180}}
                    fluid
                    placeholder='State'
                    onChange={this.onChange}
                  />
                  <span style={{width: 40}}/>
                  <Input
                    style={{width: 180}}
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