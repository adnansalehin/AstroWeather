// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Menunav from '../menuNav';

//console.log("Temperature is " +  + "°" + current_timestep.temperature.units + " in " + site.name)

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: false });

		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {

		$.ajax({
			url: "http://ip-api.com/json",
			dataType: "json",
			success : this.parseResponseLocation,
			error : function(req, err){ console.log('API call failed 1' + err); }
		});

		$.ajax({
			url: "http://api.aerisapi.com/observations/closest?p="+lon+","+lat+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO",
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed 2' + err); }
		});

	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ style.conditions }>Actual Temperature: { this.state.temp }</span>

					<span class={ style.conditions }>Wind Direction: { this.state.windDirection }</span>
					<span class={ style.conditions }>Humidity: { this.state.humidity }%</span>

					<span class={ style.conditions }>Visibility: { this.state.visibility }miles</span>
					<span class={ style.conditions }>Wind Speed: { this.state.windSpeed }mph</span>

				</div>
				<div class={ style.details }></div>

			</div>
		);
	}



	parseResponseLocation = (parsed_json) =>
	{
		var lat = parsed_json.lat;
		var lon = parsed_json.lon;


		var city = parsed_json.city;



		this.setState({
			locate: city,
			lon: lon,
			lat: lat

		});

	}

	parseResponse = (parsed_json) => {
		// var location = parsed_json['current_observation']['display_location']['city'];
		// var temp_c = parsed_json['current_observation']['temp_c'];
		// var conditions = parsed_json['current_observation']['weather'];
		console.log(parsed_json);
		var path = parsed_json.response.ob;

		//var period = location.Period[0];
		var temp_c = path.tempC;
		var weatherType = path.weather;
		//var feelsLike = period.Rep[0].F;
		var windDirection = path.windDir;
		var humidity = path.humidity;
		//var windGust = period.Rep[0].G;
		var visibility = path.visibilityMI;
		var windSpeed = path.windSpeedMPH;
		//var precProp = period.Rep[0].Pp;
		// set states for fields so they could be rendered later on
		this.setState({

			temp: temp_c,
			cond : weatherType,
			//feels: feelsLike,
			windDirection: windDirection,
			humidity: humidity,
			//windGust: windGust,
			visibility: visibility,
			windSpeed: windSpeed,
			//precProp: precProp
		});
	}

}
