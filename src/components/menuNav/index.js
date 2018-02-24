// import preact
import { h, render, Component } from 'preact';
import style_iphone from '../button/style_iphone';
import style from './style.less';

export default class menuNav extends Component {

	render() {
		return (
			<div>
				<div id="MenuNav" class="menuNav">
					<a href="#" class="closeButton" onclick="closeMenu()">&times;
					</a>
					<div class="links">
						<a href="#" >Unit Preferences</a>
						<a href="#" >Settings</a>
					</div>
				</div>

				<div>
					<span onclick="openMenu()">
						<div class="openButton"></div>
						<div class="openButton"></div>
						<div class="openBotton"></div>
					</span>
				</div>
			</div>
		);
	}

// this function opens the menu
	openMenu() {
		document.getElementById("MenuNav").style.width = "225px";
	}

// this function closes the menu
	closeMenu() {
		document.getElementById("MenuNav").style.width = "0";
	}


}
