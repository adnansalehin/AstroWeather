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
			url: "http://ip-api.com/json",
			dataType: "json",
			success : this.parseResponseLocation,
			error : function(req, err){ console.log('API call failed 1' + err); }
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
					<div class={ style.relative }>
						<div class={ style.city }>{ this.state.locate }</div>
						<div class={ style.conditions }>{ this.state.cond }</div>
						<span class={ style.conditions }>Actual Temperature: { this.state.temp }</span>

						<span class={ style.conditions }>Wind Direction: { this.state.windDirection }</span>
						<span class={ style.conditions }>Humidity: { this.state.humidity }%</span>

						<span class={ style.conditions }>Visibility: { this.state.visibility }miles</span>
						<span class={ style.conditions }>Wind Speed: { this.state.windSpeed }mph</span>
					</div>
				</div>
				<div class={ style.section }>
					<div class={ style.temperature }>

					</div>
					<div class={ style.overflowHidden }>
						<div class={ style.overflowAuto }>
							<div class= { style.cloudCover }>
								<div class= { style.subtitles }>CLOUD COVER</div>
								<div class= { style.relativeSection }>
									<div class= { style.absoluteSection }>
										<div class= { style.low }>
											LOW
											29%
										</div>
									</div>
									<div class= { style.absoluteSection }>
										<div class= { style.mid }>
											MID
											83%
										</div>
									</div>
									<div class= { style.absoluteSection }>
										<div class= { style.high }>
											HIGH
											12%
										</div>
									</div>
								</div>

							</div>
							<div class= { style.chanceOfRain }>
								<div class= { style.subtitles }>CHANCE OF RAIN</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSRain }>
										30%
									</div>
								</div>
							</div>
							<div class= { style.moonPhase }>
								<div class= { style.subtitles }>MOON PHASE</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSMoon }>
										<img src="Moon/Waning Crescent.png" alt="Waning Crescent"/>
									</div>
									<div class= { style.phase }>
										Waning Crescent
									</div>
									<div class= { style.moonPercent }>
										13%
									</div>
									<div class= { style.moonDistance }>
										Moon Distance: 405,905km
									</div>
								</div>
							</div>
							<div class= { style.wind }>
								<div class= { style.subtitles }>WIND</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSWind }>
										<img src="rsz_wind.png" alt="Wind"/>
									</div>
									<div class= { style.windInfo }>
										14 mph
										North-west
									</div>
								</div>
							</div>
							<div class= { style.skyVisability }>
								<div class= { style.subtitles }>SKY VISABILITY</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSSky }>
										16Km
									</div>
								</div>
							</div>
							<div class= { style.sunRise }>
								<div class= { style.subtitles }>SUNRISE AND SUNSET</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSSun }>
										<img src="rsz_sunrise.png" alt="Sunrise"/>
									</div>
									<div class= { style.sunriseInfo }>
										7:20am
									</div>
									<div class= { style.aSSunset }>
										<img src="rsz_sunset.png" alt="Sunset"/>
									</div>
									<div class= { style.sunsetInfo }>
										5:09pm
									</div>
								</div>
							</div>
							<div class= { style.humidity }>
								<div class= { style.subtitles }>HUMIDITY</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSHumidity }>
										56%
									</div>
								</div>
							</div>
							<div class= { style.precipitation }>
								<div class= { style.subtitles }>PRECIPITATION</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSPrecipitation }>
										0.0057 in
									</div>
								</div>
							</div>
							<div class= { style.pollution }>
								<div class= { style.subtitles }>POLLUTION</div>
								<div class= { style.relativeSection }>
									<div class= {style.aSPollutionStatus }>
										VERY LOW
									</div>
									<div class= { style.aSPollutionInfo }>
										14 (AQI)
									</div>
								</div>
							</div>
							<div class= { style.pressure }>
								<div class= { style.subtitles }>PRESSURE</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSPressure }>
										1005 hPa
									</div>
								</div>
							</div>
							<div class= { style.astroTwilight }>
								<div class= { style.subtitles }>ASTRONOMICAL TWILIGHT</div>
								<div class= { style.relativeSection }>
									<div class= { style.aSATStart }>
										START
									</div>
									<div class= { style.aSATStartInfo }>
										5:27am
									</div>
									<div class= { style.aSATEnd }>
										END
									</div>
									<div class= { style.aSATEndInfo }>
										7:02pm
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class={ style.details }></div>

			</div>
		);
	}



	lat;
	lon;

	parseResponseLocation = (parsed_json) =>
	{
		console.log(parsed_json);
		this.lat = parsed_json.lat;
		this.lon = parsed_json.lon;


		var city = parsed_json.city;



		this.setState({
			locate: city,

		});

		$.ajax({
			url: "http://api.aerisapi.com/observations/closest?p="+this.lat+","+this.lon+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO",
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed 2' + err); }
		});

	}



	parseResponse = (parsed_json) => {
		// var location = parsed_json['current_observation']['display_location']['city'];
		// var temp_c = parsed_json['current_observation']['temp_c'];
		// var conditions = parsed_json['current_observation']['weather'];
		console.log(parsed_json);
		var path = parsed_json.response[0].ob;

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
			windDirection: this.windDirectionTypes[windDirection],
			humidity: humidity,
			//windGust: windGust,
			visibility: visibility,
			windSpeed: windSpeed,
			//precProp: precProp
		});

		var url = "http://api.aerisapi.com/sunmoon/?p="+this.lat+","+this.lon+"&client_id=LjX7d3shjnQkIOoUvzkPy&client_secret=Xq3gn57MIiP3N7PSbqPAdsmobfZKqilLftOGZ3bO";

		$.ajax({
			url: url,

			dataType: "jsonp",
			success : this.parseResponseMoon,
			error : function(req, err){ console.log('API call failed 3' + err); }
		});
	}

	parseResponseMoon = (parse_json) =>
	{
		console.log(parse_json);



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
