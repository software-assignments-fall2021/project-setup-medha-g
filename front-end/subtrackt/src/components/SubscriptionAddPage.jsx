import React, { useState } from "react";

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
    const [image, setImage] = useState("");
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
    const handleTitle = (event) => {
        console.log(`Title changed to: ${event.target.value}`);
        setTitle(event.target.value);
    };
    const handleDescription = (event) => {
        console.log(`Description changed to: ${event.target.value}`);
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
        props.handleSubmit({
            image: image,
            title: subscriptionTitle,
            description: description,
            plan: plan
        });
    }

    return (
        <form>
            <label>Subscription Title:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={subscriptionTitle}
                    onChange={handleTitle}
                    placeholder="Subsciption"
                />
            </div>
            <br />
            <label>Subscription Description:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Subscription Description"
                />
            </div>
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
                    <option selected>Select timeunit</option>
                    <option value="day">day</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );
};
