import React from 'react';
import deleteImage from '../images/delete_icon.png';


function Subscription(props) {
	// Handlers ==================================================================================================

	const handleClick = (event) => {
		props.deleteSublist(props.index)
	}

	return (
		<div className="row">
			<div className="col-md-3 col-sm-6 col-xs-12 bootCols">
				<h4>{props.title}</h4>
				<img src={props.image} alt="Logo" height="70px" width="70px"></img>
			</div>
			<div className="col-md-3 col-sm-6 col-xs-12 bootCols">
				<h4>Description</h4>
				<p>{props.description}</p>
			</div>
			<div className="col-md-3 col-sm-6 col-xs-12 bootCols">
				<h4>Plan Details</h4>
				<p>Price: {props.plan.price} for {props.plan.time_quantity} {props.plan.time_unit}</p>
			</div>
			<div className="col-md-3 col-sm-6 col-xs-12 bootCols">
				<img src  = {deleteImage} onClick={handleClick} alt="Delete" className="custom-delete" height="30px" width="30px"/>
			</div>
		</div>
	);

}

export default Subscription;