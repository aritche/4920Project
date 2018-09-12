import React from 'react';
import { Header, Input } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      addr1: '',
      addr2: '',
      state: '',
      postCo: ''
    }
  }

  onAddr1Change = (e) => {
    this.setState({addr1: e.target.value}, function() {
      if (this.props.id === "from") {

        //this.props.onAddrFromL1Change();

      }
      else {
        //this.props.onAddrToL1Change(this.state.addr1);
      }
    })
  };


  onAddr2Change = (e) => {
    geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(this.setState({addr2: e}))
      .then(() => {
        if (this.props.id === "from") {
          this.props.onAddrFromL2Change(e);
        }
        else {
          this.props.onAddrToL2Change(e);
        }
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  onStateChange = (e) => {
    this.setState({state: e});
    if (this.props.id === "from") {
      this.props.onFromStateChange(e);
    }
    else {
      this.props.onToStateChange(e);
    }
  };

  onPostCoChange = (e) => {
    this.setState({postCo: e});
    if (this.props.id === "from") {
      this.props.onFromPostCoChange(e);
    }
    else {
      this.props.onToPostCoChange(e);
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.addr2}
        onChange={this.onAddr2Change}
        onSelect={this.onAddr2Change}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Header size={'tiny'}> Where are you moving from? </Header>
            <Input
              icon='building' iconPosition='left'
              style={{width: 400}} fluid placeholder='Address line 1'
              onChange={this.onAddr1Change}
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
                onChange={this.onStateChange}
              />
              <span style={{width: 40}}/>
              <Input
                style={{width: 180}}
                fluid
                placeholder='Post Code'
                onChange={this.onPostCoChange}
              />
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}