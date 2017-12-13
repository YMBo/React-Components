import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Marquee.css';


class App extends Component {
	static propTypes={
		interval:PropTypes.number,
		direction:PropTypes.string,
		itemHeight:PropTypes.number
	};
	static defaultProps={
		/*移动方向,默认向上*/
		direction:'up',
		/*移动间隔*/
		interval:2000,
	}
	constructor(){
		super();
		this.duration=300;
		this.cloneNode=null;
		/*子元素个数*/
		this.length=0;
		/*滚动高度*/
		this.itemHeight=0;
		this.state={
			/*当前元素*/
			currentIndex:0,
			currenTranslateY:0,
			/*是否动画*/
			noAnimate:false
		}
	}
	componentDidMount(){
		this.destory();
		this.init();
		this.start();
	}
	componentWillReceiveProps(){
		this.destory();
		this.init();
		this.start();
	}
	destory(){
		this.timer && clearInterval(this.timer)
	}
	/*初始化*/
	init(){
		if(this.cloneNode){
			this.marquee.removeChild(this.cloneNode);
		}
		this.cloneNode=null;
		let firstItem=this.marquee.firstChild;
		if(!firstItem){return;}
		let lastItem=this.marquee.lastChild;
		this.length=this.marquee.children.length;
		this.itemHeight=this.props.itemHeight || firstItem.offsetHeight;
		if(this.props.direction === 'up'){
			this.cloneNode=firstItem.cloneNode(true);
			this.marquee.appendChild(this.cloneNode);
		}else{
			this.cloneNode=lastItem.cloneNode(true);
			this.marquee.insertBefore(this.cloneNode,firstItem);
		}
	}
	start(){
		if(this.props.direction === 'down'){this.go(false);}
		this.timer=setInterval(()=>{
			if(this.props.direction === 'up'){
				const index=this.state.currentIndex+1;
				this.setState({
					currentIndex:index,
					currenTranslateY:-index * this.itemHeight
				})
			}else{
				const index=this.state.currentIndex-1;
				this.setState({
					currentIndex:index,
					currenTranslateY:-(index+1) * this.itemHeight
				})
			}
			if(this.state.currentIndex === this.length){
				setTimeout(()=>{
					this.go(true);
				},this.duration)
			}else if(this.state.currentIndex === -1){
				setTimeout(()=>{
					console.log('8888')
					this.go(false);
				},this.duration)
			}else{
				this.setState({
					noAnimate:false
				})
			}
		},this.duration+this.props.interval)
	}
	/*到临界点时*/
	go(toFirst){
		if(toFirst){
			this.setState({
				noAnimate:true,
				currentIndex:0,
				currenTranslateY:0
			})
		}else{
			this.setState({
				noAnimate:true,
				currentIndex:this.length-1,
				currenTranslateY:-(this.length)*this.itemHeight
			})
		}
	}
	
	render() {
		const childDom=React.Children.map(this.props.children,(child)=>{
			return child;
		})
		return (
		<div  className='marquee_box'>
			<ul ref={(marquee)=>this.marquee=marquee} style={{transform: `translate3d(0,${this.state.currenTranslateY}px,0)`, transition: `transform ${this.state.noAnimate ? 0 : this.duration}ms`}}>
				{childDom}
			</ul>
		</div>)
	}
}

export default App;
