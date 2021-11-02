import React, { useState} from "react";
// import 'bootstrap/dist/css/min.css';
import deleteImage from '../images/delete_icon.png';

function usePlan() {
    const [plan, setPlan] = useState({
        price: 0.0,
        time_quantity: 1,
        time_unit: "month"
    });

    const setPrice = (newprice) => {
        setPlan((prevPlan) => ({
            price: newprice,
            time_quantity: prevPlan.time_quantity,
            time_unit: prevPlan.time_unit
        }));
    };

    const setTimeQuantity = (newQuantity) => {
        setPlan((prevPlan) => ({
            price: prevPlan.price,
            time_quantity: newQuantity,
            time_unit: prevPlan.time_unit
        }));
    };

    const setTimeUnit = (newUnit) => {
        setPlan((prevPlan) => ({
            price: prevPlan.price,
            time_quantity: prevPlan.time_quantity,
            time_unit: newUnit
        }));
    };

    return [plan, setPrice, setTimeQuantity, setTimeUnit];
}

const SubscriptionAddPage = (props) => {
    
    
    const [image, setImage] = useState(""); // can remove these variables
    const [subscriptionTitle, setTitle] = useState("");
    const [description, setDescription] = useState("");

    /**
     * plan state variable should follow this format
     * {
     *  price: price of the plan
     *  time_quantity: quantity of time unit
     *  time_unit: time unit of the plan
     * }
     */
    const [plan, setPrice, setTimeQuantity, setTimeUnit] = usePlan();

    // Handlers ==================================================================================================

    const handleImage = () => {
        // TODO: Use subscription title to find image logo
    };
    // const handleTitle = (event) => {
    //     console.log(`Title changed to: ${event.target.value}`);
    //     var givenDomain = event.target.value;

    //     // setTitle(givenDomain)

    // };
    const handleDescription = (event) => {  
        setDescription(event.target.value);
        
    };
    const handlePrice = (event) => {
        console.log(`Price changed to: ${event.target.value}`);
        setPrice(event.target.value);
    };
    const handleTimeQuantity = (event) => {
        console.log(`Quantity changed to: ${event.target.value}`);
        setTimeQuantity(event.target.value);
    };
    const handleTimeUnit = (event) => {
        console.log(`Time Unit changed to: ${event.target.value}`);
        setTimeUnit(event.target.value);
    };
    const handleSubmit = () => {
        console.log("Submit form");

        var givenDomain = document.getElementById("subscriptionURLInputID").value
        console.log(givenDomain)

        const  {REACT_APP_CLEARBIT_API_KEY} = process.env
        // console.log(REACT_APP_CLEARBIT_API_KEY)
        var clearbit = require('clearbit')(REACT_APP_CLEARBIT_API_KEY);
        // console.log(clearbit)
        // var clearbit = require('clearbit')('sk_c73c308d95520576dc23e68b02ff6a81');
        clearbit.Company.find({domain: givenDomain, stream: true})
        .then(function (company) {
            console.log('Description: ', company.description);
            console.log('Name: ', company.name);
            // setDescription(company.description);
            // setTitle(company.name);
            // setImage(company.logo);
            props.handleSubmit({
                image: company.logo,
                title: company.name,
                description: company.description,
                plan: plan
    
                
            })
            // .catch((error) => { //TODO: need to add error handler for invalid urls
            //     console.log(error)
            //     props.handleSubmit({
            //         image: {placeholderImage}, //TODO: find and add placeholder image
            //         title: givenDomain,
            //         description: givenDomain,
            //         plan: plan
            //     })
            //   });
        });
        // setTitle(prev => prev.trim().toUpperCase());
        
        props.handleBack();
    }

    return (
        <div className="custom-form ">
            <label>Subscription URL:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    defaultValue={subscriptionTitle}
                    // onChange={handleTitle}
                    placeholder="Subsciption"
                    id = "subscriptionURLInputID"
                />
            </div>
            {/* <br />
            <label>Subscription Description:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Subscription Description"
                />
            </div> */}
            <br />
            <label>Subscription plan:</label>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                    type="text"
                    value={plan.price}
                    className="form-control"
                    onChange={handlePrice}
                />
                <span className="input-group-text">/</span>
                <input
                    type="text"
                    value={plan.time_quantity}
                    className="form-control"
                    onChange={handleTimeQuantity}
                />
                <select className="form-select" onChange={handleTimeUnit}>
                    <option defaultValue>Select timeunit</option>
                    <option value="day">day</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                </select>
            </div>
            <div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-primary" onClick={props.handleBack}>Go Back</button>
            </div>
        </div>
    );
};

export default SubscriptionAddPage;