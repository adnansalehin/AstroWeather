// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

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
			url: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/3840?res=3hourly&key=545418d7-5506-49f8-8213-aa5e393dead8",
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});

		// once the data grabbed, hide the button
		this.setState({ display: false });
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
					<span class={ style.conditions }>Feels Like: { this.state.feels }</span>
					<span class={ style.conditions }>Wind Direction: { this.state.windDirection }</span>
					<span class={ style.conditions }>Humidity: { this.state.humidity }%</span>
					<span class={ style.conditions }>Wind Gust: { this.state.windGust }mph</span>
					<span class={ style.conditions }>Visibility: { this.state.visibility }</span>
					<span class={ style.conditions }>Wind Speed: { this.state.windSpeed }mph</span>
					<span class={ style.conditions }>Precipitation Probability: { this.state.precProp }%</span>
				</div>
				<div class={ style.details }></div>
				
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		// var location = parsed_json['current_observation']['display_location']['city'];
		// var temp_c = parsed_json['current_observation']['temp_c'];
		// var conditions = parsed_json['current_observation']['weather'];
		console.log(parsed_json);
		var location = parsed_json.SiteRep.DV.Location;
		var period = location.Period[0];
		var temp_c = period.Rep[0].T;
		var weatherTypeId = period.Rep[0].W;
		var feelsLike = period.Rep[0].F;
		var windDirection = period.Rep[0].D;
		var humidity = period.Rep[0].H;
		var windGust = period.Rep[0].G;
		var visibility = period.Rep[0].V;
		var windSpeed = period.Rep[0].S;
		var precProp = period.Rep[0].Pp;
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location.name,
			temp: temp_c,
			cond : this.weatherTypes[weatherTypeId],
			feels: feelsLike,
			windDirection: this.windDirectionTypes[windDirection],
			humidity: humidity,
			windGust: windGust,
			visibility: visibility,
			windSpeed: windSpeed,
			precProp: precProp
		});      
	}

	weatherTypes = 
	{
	    "0":"Clear night",
	    "1":"Sunny day",
	    "2":"Partly cloudy (night)",
	    "3":"Partly cloudy (day)",
	    "4":"Not used",
	    "5":"Mist",
	    "6":"Fog",
	    "7":"Cloudy",
	    "8":"Overcast",
	    "9":"Light rain shower (night)",
	    "10":"Light rain shower (day)",
	    "11":"Drizzle",
	    "12":"Light rain",
	    "13":"Heavy rain shower (night)",
	    "14":"Heavy rain shower (day)",
	    "15":"Heavy rain",
	    "16":"Sleet shower (night)",
	    "17":"Sleet shower (day)",
	    "18":"Sleet",
	    "19":"Hail shower (night)",
	    "20":"Hail shower (day)",
	    "21":"Hail",
	    "22":"Light snow shower (night)",
	    "23":"Light snow shower (day)",
	    "24":"Light snow",
	    "25":"Heavy snow shower (night)",
	    "26":"Heavy snow shower (day)",
	    "27":"Heavy snow",
	    "28":"Thunder shower (night)",
	    "29":"Thunder shower (day)",
	    "30":"Thunder"
	}

	windDirectionTypes = 
	{
		"N":"North",
		"NNE":"North North East",
		"NE":"North East",
		"ENE":"East North East",
		"E":"East",
		"ESE":"East South East",
		"SE":"South East",
		"SSE":"South South East",
		"S":"South",
		"SSW":"South South West",
		"SW":"South West",
		"WSW":"West South West",
		"W":"West South West",
		"WNW":"West North West",
		"NW":"North West",
		"NNW":"North North West"
	}
}
