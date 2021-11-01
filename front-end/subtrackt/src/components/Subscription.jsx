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
				<img src={props.image} alt="Logo"></img>
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
				{/* <button type="button" onClick={handleClick}><img src ="../images/delete_icon.png" alt = "Delete"> </img>Delete</button> */}
				{/* <input type="image" size = "10" src = {deleteImage} onClick={handleClick} alt="Delete"/>  */}
				<img src  = {deleteImage} onClick={handleClick} alt="Delete" className="custom-delete"/>
			</div>
		</div>
	);

}

export default Subscription;