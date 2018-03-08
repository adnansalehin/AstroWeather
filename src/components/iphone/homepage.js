// import preact
import { h, render, Component } from 'preact';

import {Router, Route, Link } from 'preact-router';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';

export default class home extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
        console.log("printed in home page lat" + this.props.lat);
		console.log("printed in home page lon" + this.props.lon);
		console.log("printed in home page city" + this.props.city);
		// button display state
		this.setState(
		{ 
			locate: this.props.city,
			lat: this.props.lat,
			lon: this.props.lon,
			display: false,
		});
		//this.onChange = (address) => this.setState({ address });
		this.fetchWeatherData();
	
	}

	fetchWeatherData = () => {
		if(typeof this.state.lon === "undefined")
		{
			$.ajax({
				url: "http://ip-api.com/json",
				dataType: "json",
				success: this.parseAll,
				error: function(req, err){ console.log('API call failed' + err); }
			});
		}
		else
		{
			$.ajax({
				url: "http://api.aerisapi.com/observations/closest?p="+this.state.lat+","+this.state.lon+"&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM",
				dataType: "jsonp",
				success: this.parseResponse,
				error: function(req, err){ console.log('API call failed' + err); }

			});
		}
	}
	

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}`: style.temperature;

		return (
			<div id={ style.container }>
				<div id = { style.header }>
					<div id = { style.menu  }>
						
						<Link href = {'/'} class={style.buttonHome}> </Link>
						<Link href = {'/locations'} class={style.buttonLocation}>  </Link>
					
					</div>
					<div class={style.relative}>
						<p>{ this.state.date }</p>
						<h1>{ this.state.locate }</h1>
						<div class={style.pH}>
							<p>Current Cloud Cover: {this.state.currentCloud}%</p>
						</div>
					</div>
				</div>
				<div id = {style.section}>
					<div class = {style.scrollmenu}>
						
						{this.state.temp0}
						{this.state.temp1} 
						{this.state.temp2} 
						{this.state.temp3} 
						{this.state.temp4} 
						{this.state.temp5} 
						{this.state.temp6} 
						{this.state.temp7} 
						{this.state.temp8} 
						{this.state.temp9} 
						{this.state.temp10} 
						{this.state.temp11}
					
						</div>
					<div class = {style.scrollmenu}>
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 
						<img src = {this.state.icon0}></img> 



					</div>
				</div>
				
				
				<div id = {style.overflowHidden}>
					<div id = {style.overflowAuto}>
						<div id = {style.cloudCover}>
							<div class={style.pS}>
								<p>CLOUD COVER</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.absoluteSection}>
									<div class={style.low}>
										<p>+3 hrs:</p>
										<p>{this.state.cloudCover0}%</p>
									</div>
								</div>
								<div class={style.absoluteSection}>
									<div class={style.mid}>
										<p>+6 hrs:</p>
										<p>{this.state.cloudCover1}%</p>
									</div>
								</div>
								<div class={style.absoluteSection}>
									<div class={style.high}>
										<p>+9 hrs:</p>
										<p>{this.state.cloudCover2}%</p>
									</div>
								</div>
							</div>
						</div>
						{/* <div id = {style.chanceOfRain}>
							<div class={style.pS}>
								<p>CHANCE OF RAIN</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.aSRain}>
									<p>{this.state.ra}</p>
								</div>
							</div>
						</div> */}
						<div id = {style.moonPhase}>
							<div class={style.pS}>
								<p>MOON PHASE</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.aSMoon}>
									{/* <img src="Moon\Waning Crescent.png" alt="Waning Crescent"/> */}
								</div>
								<div class={style.phase}>
									<p>{this.state.moonPhase}</p>
								</div>
								{/* <div class={style.moonPercent}>
									<p>{this.state.moonPercent}%</p>
								</div> */}
								<div class={style.moonDistance}>
									<p>Moon Distance: {this.state.moonDistance}km</p>
								</div>
							</div>
						</div>
						<div id = {style.wind}>
							<div class= {style.pS}>
								<p>WIND</p>
							</div>
							<div class= {style.relativeSection}>
								<div class= {style.aSWind}>
									{/* <img src="rsz_wind.png" alt="Wind"/> */}
								</div>
								<div class= {style.windInfo}>
									<p>{this.state.windSpeed} mph</p>
									<p>{this.state.windDirection}</p>
								</div>
							</div>
						</div>
						<div id = {style.skyVisability}>
							<div class={style.pS}>
								<p>SKY VISABILITY</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.skyInfo}>
									<p>{this.state.visibility}m</p>
								</div>
							</div>
						</div>
						<div id = {style.sunRise}>
							<div class={style.pS}>
								<p>SUNRISE AND SUNSET</p>
							</div>
							<div class= {style.relativeSection}>
								<div class= {style.aSSun}>
									{/* <img src="rsz_sunrise.png" alt="Sunrise"/> */}
								</div>
								<div class={style.sunriseInfo}>
									<p>{this.state.sunrise}</p>
								</div>
								<div class={style.aSSunset}>
									{/* <img src="rsz_sunset.png" alt="Sunset"/> */}
								</div>
								<div class={style.sunsetInfo}>
									<p>{this.state.sunset}</p>
								</div>
							</div>
						</div>
						<div id = {style.humidity}>
							<div class={style.pS}>
								<p>HUMIDITY</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.humidityInfo}>
									<p>{this.state.humidity}%</p>
								</div>
							</div>
						</div>
						<div id = {style.precipitation}>
							<div class={style.pS}>
								<p>PRECIPITATION</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.precipitationInfo}>
									<p>{this.state.precipitation} mm</p>
								</div>
							</div>
						</div>
						{/* <div id = {style.pollution}>
							<div class={style.pS}>
								<p>POLLUTION LEVEL</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.pollutionStatus}>
									<p>{this.state.}</p>
								</div>

								<div class={style.pollutionInfo}>
									<p>14 (AQI)</p>
								</div>
							</div>
						</div> */}
						<div id = {style.pressure}>
							<div class={style.pS}>
								<p>PRESSURE</p>
							</div>
							<div class={style.relativeSection}>
								{/* <div class={style.pressureInfo}>
									<p>{this.state.pressure}hPa</p>
								</div> */}
							</div>
						</div>
						<div id = {style.astroTwilight}>
							<div class={style.pS}>
								<p>Moon Rise and Moon Set</p>
							</div>
							<div class={style.relativeSection}>
								<div class={style.start}>
									<p>Moonrise</p>
								</div>
								{/* <div class={style.aTStartInfo}>
									<p>{this.state.moonrise}</p>
								</div> */}
								{/* <div class={style.end}>
									<p>Moonset</p>
								</div>
								<div class={style.aTEndInfo}>
									<p>{this.state.moonset}</p>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	
	iconRoot = "/assets/weatherIcons/";
	// range from 0 to 2
	cloudInterval=0;
	parseAll = (parsed_json) =>
	{
		
			//get location
			console.log(parsed_json);
			this.setState({
				locate: parsed_json.city,
				lat: parsed_json.lat,
				lon: parsed_json.lon
			});

			//get everything else
			$.ajax({
				url: "http://api.aerisapi.com/observations/closest?p="+this.state.lat+","+this.state.lon+"&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM",
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
		var time = parsed_json.response[0].obDateTime;
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
		var icon = path.icon;


		// set states for fields so they could be rendered later on
		this.setState({
			date: ((((date.split("T")[0]).split("-"))[2])+"."+(((date.split("T")[0]).split("-"))[1])+"."+(((date.split("T")[0]).split("-"))[0])),
			time: (((((time.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((time.split("T")[1]).split("+"))[0]).split(":"))[1]),
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
			icon: "/assets/weatherSD/"+icon,
			sunrise: (((((sunrise.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((sunrise.split("T")[1]).split("+"))[0]).split(":"))[1]),
			sunset: (((((sunset.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((sunset.split("T")[1]).split("+"))[0]).split(":"))[1])
		});

		//old one
		//var url = "http://api.aerisapi.com/sunmoon/?p="+this.state.lat+","+this.state.lon+"&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM";

		var urlMoon = "http://api.aerisapi.com/sunmoon/"+this.state.lat+","+this.state.lon+"?&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM";

		$.ajax({
			url: urlMoon,
			dataType: "jsonp",
			success: this.parseResponseMoon,
			error: function(req, err){ console.log('API call failed' + err); }
		});
		//Test url:
		//http://api.aerisapi.com/forecasts/51.5074,-0.127758?filter=3hr&limit=3&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM

		var urlCloud = "http://api.aerisapi.com/forecasts/"+this.state.lat+","+this.state.lon+"?filter=3hr&limit=3&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM";
		$.ajax({
			url: urlCloud,
			dataType: "jsonp",
			success: this.parseResponseCloud,
			error: function(req, err){ console.log('API call failed' + err); }
		});
		var urlPrecip = "http://api.aerisapi.com/forecasts/"+this.state.lat+","+this.state.lon+"?&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM";
		$.ajax({
			url: urlCloud,
			dataType: "jsonp",
			success: this.parseResponsePrecip,
			error: function(req, err){ console.log('API call failed' + err); }
		});
		var urlTemp = "http://api.aerisapi.com/forecasts/"+this.state.lat+","+this.state.lon+"?filter=1hr&limit=12&client_id=97vTvh4PH85jyKV2zqioo&client_secret=dsPijAxOaNCwVSMpisEIYA7OhuKWnRSOZMJGTBOM";
		$.ajax({
			url: urlTemp,
			dataType: "jsonp",
			success: this.parseResponseTemp,
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
		var time = parsed_json.response[0].dateTimeISO;
		//!!Warning: moonrise unavailable today.
		this.setState({
			time: (((((time.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((time.split("T")[1]).split("+"))[0]).split(":"))[1]),

			moonPhase: moonPhase,
			//moonrise: (((((moonrise.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((moonrise.split("T")[1]).split("+"))[0]).split(":"))[1]),
			//moonset: (((((moonset.split("T")[1]).split("+"))[0]).split(":"))[0])+":"+(((((moonset.split("T")[1]).split("+"))[0]).split(":"))[1])
		});
		console.log(parsed_json);

	}
	parseResponseCloud = (parsed_json) =>
	{
		console.log(parsed_json);
		// var cloudCover0 = 0;
		// var cloudCover1 = 0;
		// var cloudCover2 = 0;
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/
		 *
		 * @Returns the next 3 cycles. Cycle through using periods[cycle]. 0 is used here to get cycle 1.
		*/
		this.setState({
			cloudCover0: parsed_json.response[0].periods[0].sky,
			cloudCover1: parsed_json.response[0].periods[1].sky,
			cloudCover2: parsed_json.response[0].periods[2].sky
		});

		console.log(parsed_json);
	}
	parseResponsePrecip = (parsed_json) =>
	{
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/
		 *
		 * @Returns the expected precipitation taking into account the next 7 days.
		*/
		this.setState({
			precipitation: parsed_json.response[0].periods[0].precipMM
		});
		console.log(parsed_json);
	}
	parseResponseTemp = (parsed_json) =>
	{
		/*
		 * @Rsponse body details: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/
		 *
		 * @Returns the expected temeratures in the next 12 hours, starting at the next hour.
		*/
		var path = parsed_json.response[0];

		this.setState({
			temp0: path.periods[0].tempC, icon0: this.iconRoot + path.periods[0].icon,
			temp1: path.periods[1].tempC, icon1: this.iconRoot + path.periods[1].icon,
			temp2: path.periods[2].tempC, icon2: this.iconRoot + path.periods[2].icon,
			temp3: path.periods[3].tempC, icon3: this.iconRoot + path.periods[3].icon,
			temp4: path.periods[4].tempC, icon4: this.iconRoot + path.periods[4].icon,
			temp5: path.periods[5].tempC, icon5: this.iconRoot + path.periods[5].icon,
			temp6: path.periods[6].tempC, icon6: this.iconRoot + path.periods[6].icon,
			temp7: path.periods[7].tempC, icon7: this.iconRoot + path.periods[7].icon,
			temp8: path.periods[8].tempC, icon8: this.iconRoot + path.periods[8].icon,
			temp9: path.periods[9].tempC, icon9: this.iconRoot + path.periods[9].icon,
			temp10: path.periods[10].tempC, icon10: this.iconRoot + path.periods[10].icon,
			temp11: path.periods[11].tempC, icon11: this.iconRoot + path.periods[11].icon
		});
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