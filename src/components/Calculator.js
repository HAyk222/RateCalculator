import React, { Component } from 'react';

export default class Calculator extends Component{
	render(){
		const { inputValue, currency, rateData } = this.props
		return (
			<div className="calculator">
				<div>
					<input type="number" min={0} value={inputValue} onChange={ e => this.props.changeInputValue(e.target.value) } />
				</div>
				<div>AMD <span className="coeficent">= {rateData[currency] !== "0" ? (inputValue/rateData[currency]).toFixed(3) : "0"}</span> {currency}</div>
			</div>
		)
	}
}