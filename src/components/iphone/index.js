// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link, browserHistory} from 'preact-router';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';
import Home from './homepage';


export default class Iphone extends Component {
	constructor(){
		super();
		this.state.lat = "51.5";
		this.state.city = "0.12";
	}

	changeLocation = (newLat, newLong) =>{
		this.setState({
			lat:newLat,
			lon:newLong,
		});
	}


	render() {
		return (
			<Router history = {browserHistory}>
				<Route path="/" component={() => <Home lat={this.state.lat} lon={this.state.lon}/> }/>
				<Route path="/locations" component={() => <Location lat={this.state.lat} lon={this.state.lon} changeLocation = {this.changeLocation}/> }/>
			</Router>
		);
	}
}