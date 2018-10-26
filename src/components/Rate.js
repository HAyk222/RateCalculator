import React, { Component } from 'react';

export default class Rate extends Component{
	render(){
		const data = Object.keys(this.props.rateData);
		return (
			<div className="rate">
				<div>Convert AMD</div>
				<div>
					<select value={this.props.currency} onChange={ e => this.props.changeRate(e.target.value) }>
						{ data.map( (item,index) => <option key={index} value={item}>{item}</option> ) }
					</select>
				</div>
			</div>
		)
	}
}