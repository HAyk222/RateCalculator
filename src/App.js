import React, { Component } from 'react';
import Load from './images/loading.gif';
import './App.css';
import Rate from './components/Rate';
import Calculator from './components/Calculator';
import Bitcoin from './components/Bitcoin';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      rateData : {},
      currency : "USD",
      inputValue : "",
      showBitcoin : false,
      isLoaded : false,
    }

    this.changeRate = this.changeRate.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.showBitcoin = this.showBitcoin.bind(this);
  }

  // changing currency
  changeRate (currency) { this.setState({ currency }) }

  //  changing input value
  changeInputValue (inputValue) { this.setState({ inputValue }) }

  // fetching rateData from url 
  componentDidMount () {
    fetch('http://cb.am/latest.json.php')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded : true,
          rateData : json
        })
      })
  }

  // showing or hiding bitcoin
  showBitcoin () { this.setState({ showBitcoin: !this.state.showBitcoin }) }

  render() {
    const { rateData, currency, showBitcoin, isLoaded, inputValue } = this.state
    if(!isLoaded){
      return <img src={Load} alt="loading" className="loading" />;
    }
    return (
      <div className="content">
        <h1>Rate Calculator</h1>
        <Rate 
          rateData = {rateData} 
          currency={currency} 
          changeRate={this.changeRate} />
        <Calculator 
          rateData = {rateData} 
          currency={currency} 
          inputValue={inputValue} 
          changeInputValue={this.changeInputValue} />
        <span className="bicoinSpan" onClick={this.showBitcoin}>{showBitcoin ? "Hide" : "Show"} Bitcoin rate</span>
        {showBitcoin && <Bitcoin />}
      </div>
    );
  }
}

export default App;
