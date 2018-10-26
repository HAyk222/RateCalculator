import React, { Component } from 'react';
import Load from '../images/loading.gif';

export default class Bitcoin extends Component{
	constructor(props){
		super(props)

		this.state = {
			bitcoinData : {},
			count: 0,
			isLoaded : false
		}

		this.refreshData = this.refreshData.bind(this)
	}

	// fetching bitcoinData from url 
  componentDidMount () { 
  	let interval = setInterval(() => {
  		this.setState({ count : this.state.count+1 });
  	},10000) 

  	if(this.state.count === 0){
  		this.setState({ isLoaded : false })
  		this.fetchData();
  	}

  	if(this.state.count > 0){
  		this.setState({ count : 0 })
  	}
  }

  // clear interval when component unmounted
  componentWillUnmount() { clearInterval(this.interval); }

  // fetching bicoinData after refresh
  refreshData () {
  	this.setState({ isLoaded : false })
  	this.fetchData()
  }

  // function for fetching data
  fetchData () {
  	fetch('http://cb.am/latest.json.php?coins&currency=BTC')
      .then(res => res.json())
      .then(json => {
        this.setState({
        	isLoaded : true,
          bitcoinData : json
        })
      })
  }

	render(){
		return (
			<div className="bitcoin">
				<div>Current Bitcoin Rate: <span>{this.state.isLoaded ? this.state.bitcoinData['BTC'] : <img src={Load} alt="loading" />}</span> <span className="refresh" onClick={this.refreshData} >Refresh</span></div>
				<p>(Bitcoin Rate automatically will be updatedevery 3 minutes)</p>
			</div>
		);
	}
}