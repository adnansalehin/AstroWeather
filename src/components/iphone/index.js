// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

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
			success: this.parseAll,
			error: function(req, err){ console.log('API call failed' + err); }
		});

	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}`: style.temperature;

		// display all weather data
		// dates and times have been parsed from ISO format where required.
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.date }>Date: { this.state.date }</div>
					<span class={ style.conditions }>Actual Temperature: { this.state.temp } °C </span>
					<span class={ style.conditions }>Current Cloud Cover: { this.state.currentCloud }%</span>
					<span class={ style.conditions }>Cloud Cover (3 hr interval): { this.state.cloudCover }%</span>
					<span class={ style.conditions }>Wind Direction: { this.state.windDirection }</span>
					<span class={ style.conditions }>Humidity: { this.state.humidity }%</span>
					<span class={ style.conditions }>Precipitation: { this.state.precipitation }mm</span>
					<span class={ style.conditions }>Wind Speed: { this.state.windSpeed }mph</span>
					<span class={ style.conditions }>Moon Phase: { this.state.moonPhase }</span>
					<span class={ style.conditions }>Sunrise: { this.state.sunrise } Sunset: { this.state.sunset } </span>
					<span class={ style.conditions }>Moonrise: { this.state.moonrise } Moonset: { this.state.moonset } </span>
					<span class={ style.conditions }>Latitude: { this.lat } Longitude: { this.lon }</span>

				</div>
				<div class={ style.details }></div>

			</div>
		);

	}

	// global variables
	lat;
	lon;
	// range from 0 to 2.
	cloudInterval=0;
	parseAll = (parsed_json) =>
	{
		//get location
		console.log(parsed_json);
		 this.lat = parsed_json.lat;
		 this.lon = parsed_json.lon;


		var city = parsed_json.city;

		this.setState({
			locate: city,
		});

		//get everything else
		$.ajax({
			url: "http://api.aerisapi.com/observations/closest?p="+this.lat+","+this.lon+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO",
			dataType: "jsonp",
			success: this.parseResponse,
			error: function(req, err){ console.log('API call failed' + err); }
		});

	}

	parseResponse = (parsed_json) => {

		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/observations/
		 *
		 * @Returns the following observations (and more) as a json document.
		*/
		console.log(parsed_json);

		var date = parsed_json.response[0].obDateTime;
		var path = parsed_json.response[0].ob;


		var temp_c = path.tempC;
		var weatherType = path.weather;
		var windDirection = path.windDir;
		var humidity = path.humidity;
		var visibility = path.visibilityMI;
		var windSpeed = path.windSpeedMPH;
		var sunrise = path.sunriseISO;
		var sunset = path.sunsetISO;
		var currentCloud = path.sky;
		var precipitation = path.precipMM;


		// set states for fields so they could be rendered later on
		this.setState({
			date: ((((date.split("T")[0]).split("-"))[2])+"."+(((date.split("T")[0]).split("-"))[1])+"."+(((date.split("T")[0]).split("-"))[0])),
			temp: temp_c,
			cond: weatherType,
			//feels: feelsLike,
			windDirection: this.windDirectionTypes[windDirection],
			humidity: humidity,
			//windGust: windGust,
			visibility: visibility,
			windSpeed: windSpeed,
			//precProp: precProp
			//moonPhase: moonPhase
			currentCloud: currentCloud,
			// precipitation: precipitation,
			sunrise: (((((sunrise.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((sunrise.split("T")[1]).split("+"))[0]).split(":"))[1]),
			sunset: (((((sunset.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((sunset.split("T")[1]).split("+"))[0]).split(":"))[1])
		});

		//old one
		//var url = "http://api.aerisapi.com/sunmoon/?p="+this.lat+","+this.lon+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO";

		var urlMoon = "http://api.aerisapi.com/sunmoon/?p="+this.lat+","+this.lon+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO";

		$.ajax({
			url: urlMoon,
			dataType: "jsonp",
			success: this.parseResponseMoon,
			error: function(req, err){ console.log('API call failed' + err); }
		});
		//Test url:
		//http://api.aerisapi.com/forecasts/51.5074,-0.127758?filter=3hr&limit=3&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO

		var urlCloud = "http://api.aerisapi.com/forecasts/"+this.lat+","+this.lon+"?filter=3hr&limit=3&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO";
		$.ajax({
			url: urlCloud,
			dataType: "jsonp",
			success: this.parseResponseCloud,
			error: function(req, err){ console.log('API call failed' + err); }
		});
		var urlPrecip = "http://api.aerisapi.com/forecasts/"+this.lat+","+this.lon+"?&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO";
		$.ajax({
			url: urlCloud,
			dataType: "jsonp",
			success: this.parseResponsePrecip,
			error: function(req, err){ console.log('API call failed' + err); }
		});
	}

	parseResponseMoon = (parsed_json) =>
	{
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/sunmoon-moonphases/
		 * (at bottom of page.)
		 * @Returns the next 4 cycles. 0 is used here to get cycle 1.
		*/
		var path = parsed_json.response[0].moon;
		var moonPhase = path.phase.name;
		var moonrise = path.riseISO;
		var moonset = path.setISO;

		this.setState({
			moonPhase:moonPhase,
			moonrise: (((((moonrise.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((moonrise.split("T")[1]).split("+"))[0]).split(":"))[1]),
			moonset: (((((moonset.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((moonset.split("T")[1]).split("+"))[0]).split(":"))[1])
		});
		console.log(parsed_json);


	}
	parseResponseCloud = (parsed_json) =>
	{
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/
		 *
		 * @Returns the next 3 cycles. 0 is used here to get cycle 1. Cycle through using periods[cycle].
		*/
		this.setState({cloudCover: parsed_json.response[0].periods[this.cloudInterval].sky}, {precipitation: parsed_json.response[0].periods[0].precipMM});
		console.log(parsed_json);
	}
	parseResponsePrecip = (parsed_json) =>
	{
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/
		 *
		 * @Returns the expected precipitation taking into account the next 7 days.
		*/
		this.setState({precipitation: parsed_json.response[0].periods[0].precipMM});
		console.log(parsed_json);
	}

	windDirectionTypes = {
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

	// function parseTimeFromISO(time)
	// {
	// 	return (((time.split("T")[1]).split("+"))[0]);
	// }
}
