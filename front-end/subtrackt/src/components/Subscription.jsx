import React, { useState } from 'react';

function Subscription(props){
	return (
		<div class="row">
  			<div class="column">
  				<h4>props[index].title</h4>
  				<img src={props[index].image} alt="Logo">
  			</div>
  			<div class="column">
  				<h4>Description</h4>
  				<p>{props[index].description}</p>
  			</div>
  			<div class="column">
  				<h4>Plan Details</h4>
  				<p>Price: {props[index].plan.price} for {props[index].plan.time_quantity} {props[index].plan.time_unit}</p>
  			</div>
	</div>
	);

}

