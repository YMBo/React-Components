import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Marquee from './Marquee.js'
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
	<Marquee direction='down'>
		<li>第一条</li>
		<li>第二条</li>
		<li>第三条</li>
		<li>第四条</li>
		<li>第五条</li>
	</Marquee>
	, document.getElementById('root'));
ReactDOM.render(
	<Marquee interval={1000}>
		<li>第一条</li>
		<li>第二条</li>
		<li>第三条</li>
		<li>第四条</li>
		<li>第五条</li>
	</Marquee>
	, document.getElementById('root2'));
registerServiceWorker();
