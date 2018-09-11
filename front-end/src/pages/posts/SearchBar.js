import React from 'react';
import { Header, Input } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class SearchBar extends React.Component {
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .then(this.updateAddress(address))
      .catch(error => console.error('Error', error));
  };

  updateAddress = (address) => {
    this.props.handleSelect(address);
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.updateAddress}
        onSelect={this.handleSelect}
      >

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Header size={'tiny'}> Where are you moving from? </Header>
            <Input icon='building' iconPosition='left'
                        style={{width: 400}} fluid placeholder='Address line 1' />
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
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#D3D3D3', cursor: 'pointer' };
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
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}