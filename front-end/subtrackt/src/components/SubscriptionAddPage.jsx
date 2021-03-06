import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "./use-auth";
import placeholderImage from '../images/placeholder_icon.png';
import ParseOption from "./ParseOption";


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

    // eslint-disable-next-line no-unused-vars
    const [subscriptionTitle, setTitle] = useState("");
    const [link_token, setLink] = useState(null);
    const [access_token, setAccess] = useState(null);
    const auth = useAuth();

    /**
     * plan state variable should follow this format
     * {
     *  price: price of the plan
     *  time_quantity: quantity of time unit
     *  time_unit: time unit of the plan
     * }
     */
    const [plan, setPrice, setTimeQuantity, setTimeUnit] = usePlan();

    const createLinkToken = useCallback(async (jwt) => {
        const config = {
            headers: {
                Authorization: `Token ${jwt}`
            }
        }
        const res = await axios.get('/api/plaid/create_link_token', config);
        setLink(res.data.link_token);
    }, []);

    const getAccessToken = async (public_token) => {
        const config = {
            headers: {
                Authorization: `Token ${auth.jwt}`
            }
        }

        const res = await axios.post('/api/plaid/get_access_token', { public_token: public_token }, config);
        setAccess(res.data.access_token);
    }

    useEffect(() => {
        if(auth.jwt) createLinkToken(auth.jwt);
    }, [createLinkToken, auth.jwt]);


    // Handlers ==================================================================================================

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

        const  {REACT_APP_CLEARBIT_API_KEY} = process.env //retrieves api key from .env
        var clearbit = require('clearbit')(REACT_APP_CLEARBIT_API_KEY); //creates api call 
        clearbit.Company.find({domain: givenDomain, stream: true})
        .then(function (company) {
            console.log('Description: ', company.description);
            console.log('Name: ', company.name);
            console.log('Company: ', company)
        
            props.handleSubmit({
                image: company.logo,
                title: company.name,
                description: company.description,
                plan: plan,
                tags: company.tags            
            })
            
        })
        .catch((error) => { 
            console.log(error)
            props.handleSubmit({
                image: placeholderImage, 
                title: givenDomain,
                description: givenDomain,
                plan: plan,
                tags: []
            })
          });
        
        props.handleBack();
    }

    return (
        <div className="custom-form pop-up">
            <label>Subscription URL:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    defaultValue={subscriptionTitle}
                    placeholder="Subsciption"
                    id="subscriptionURLInputID"
                />
            </div>
            <br />
            <label>Subscription plan:</label>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                    type="number"
                    value={plan.price}
                    className="form-control"
                    onChange={handlePrice}
                />
                <span className="input-group-text">/</span>
                <input
                    type="number"
                    value={plan.time_quantity}
                    className="form-control"
                    onChange={handleTimeQuantity}
                />
                <select className="form-select" onChange={handleTimeUnit}>
                    <option value="day">day(s)</option>
                    <option value="month">month(s)</option>
                    <option value="year">year(s)</option>
                </select>
            </div>
            <div>
                <button className="custom-button" onClick={handleSubmit}>Submit</button>
                <button className="custom-button" onClick={props.handleBack}>Close</button>
            </div><br/>
            <div>
                <ParseOption access_token={access_token} token={link_token} getAccessToken={getAccessToken} handleRender={props.handleRender} />
            </div>
        </div>
    );
};

export default SubscriptionAddPage;
