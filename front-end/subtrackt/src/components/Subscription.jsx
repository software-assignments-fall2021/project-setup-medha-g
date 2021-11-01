import React from 'react';


function Subscription(props) {
	// Handlers ==================================================================================================

	const handleClick = (event) => {
		props.deleteSublist(props.index)
	}

	return (
		<div className="row">
			<div className="column col-xs-6 col-md-4">
				<h4>{props.title}</h4>
				<img src={props.image} alt="Logo"></img>
			</div>
			<div className="column col-xs-6 col-md-4">
				<h4>Description</h4>
				<p>{props.description}</p>
			</div>
			<div className="column col-xs-6 col-md-4">
				<h4>Plan Details</h4>
				<p>Price: {props.plan.price} for {props.plan.time_quantity} {props.plan.time_unit}</p>
			</div>
			<div className="column col-xs-6 col-md-4">
				<button type="button" onClick={handleClick}>Delete</button>
			</div>
		</div>
	);

}

export default Subscription;