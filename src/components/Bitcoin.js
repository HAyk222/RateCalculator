import React, { Component } from 'react';
import Load from '../images/loading.gif';

export default class Bitcoin extends Component{
	constructor(props){
		super(props)

		this.state = {
			bitcoinData : {},
			comparedRate : 0,
			isLoaded : false
		}

		this.refreshData = this.refreshData.bind(this)
		this.fetchData = this.fetchData.bind(this)
	}

	// fetching bitcoinData from url 
  componentDidMount () { 
  	this.fetchData();
  	setInterval(this.fetchData, 180000) 
  }

  // comparing new and old values of bitcoin rate 
  componentDidUpdate (prevProps, prevState)  { 
  	let bitcoinValue = this.state.bitcoinData["BTC"]
  	if( prevState.bitcoinData && prevState.bitcoinData["BTC"] && bitcoinValue !== prevState.bitcoinData["BTC"] ){
  		this.setState({ comparedRate : Number(bitcoinValue) - Number(prevState.bitcoinData["BTC"]) })
  	}
  }

  // clear interval when component unmounted
  componentWillUnmount() { clearInterval(this.fetchData,3000); }

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
				<p>Bitcoin rate increase compared with the previous one _ <span>{this.state.comparedRate}</span></p>
				<p>(Bitcoin Rate automatically will be updatedevery 3 minutes)</p>
			</div>
		);
	}
}