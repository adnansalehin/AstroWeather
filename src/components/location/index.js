import {h, render, Component} from 'preact';
import {Router, Route, Link} from 'preact-router';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import style_location from './style_location';
import style from './style';
import style_iphone from '../button/style_iphone';

// import stylesheets for ipad & button
import $ from 'jquery';

export default class locationButton extends Component{
  constructor(props) {
      super(props);
      console.log(this.props);
      console.log(this.props.country);
  		console.log(this.props.city);
      //this.state = { address: 'San Francisco, CA' }
      this.onChange = (address) => this.setState({ address });
    }

    handleClickSubmit = () => {
      geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.change(lat,lng))
      .catch(error => console.error('Error', error))
    }

    change = (tmpLat, tmpLng) => {
      var tmp = this.state.address;
      var arrofAddress = tmp.split(", ");
      var lengthofArr = arrofAddress.length;
      var newLat = tmpLat;
			var newLong = tmpLng;
			var newCity = arrofAddress[0];
      console.log(arrofAddress, newCity,newLat,newLong);
      this.props.changeLocation(newLat,newLong, newCity);
		}

		clickForCurrent = () =>{
			this.props.changeLocation(undefined,undefined, undefined);

		}
		
    render() {
      const inputProps = {
        value: this.state.address,
        onChange: this.onChange
      }
      return(
				<div id={ style.container }>
				<div id = { style.header }>
					<div id = { style.menu  }>
						
						<Link href = {'/'} class={style.buttonHome}> </Link>
						<Link href = {'/locations'} class={style.buttonLocation}>  </Link>
						<Link href = {'/'} onClick={this.clickForCurrent} class={style.buttonCurrentLocation}> </Link>
					</div>   
					</div>
    					<div id={ style.search}>CHOOSE YOUR LOCATION</div>
              <div class={ style.header}>
                <form>
                  <PlacesAutocomplete inputProps={inputProps} />
									<Link href = {'/'} onClick={this.handleClickSubmit} class={style.button}></Link>
								
                </form>
								
    			    </div>
            </div>
    		
        );
    }
}
