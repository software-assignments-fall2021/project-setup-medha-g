import React, { useState, useEffect } from 'react';
import Subscription from './Subscription';
import SubcriptionAddPage from './SubscriptionAddPage';

/* Test variable and functions ===================================================================================

var startList = [{
    index: 0,
    image: "image0",
    description: "desc0",
    plan: "plan0"
},
{
    index: 1,
    image: "image1",
    description: "desc1",
    plan: "plan1"
},
{
    index: 2,
    image: "image2",
    description: "desc2",
    plan: "plan2"
}]

*/

function generateRandomSub() {
    return {
        index: 0,
        image: (Math.random() + 1).toString(36).substring(7),
        title: (Math.random() + 1).toString(36).substring(7),
        description: (Math.random() + 1).toString(36).substring(7),
        plan: {
            price: (Math.random() + 1).toString(36).substring(7),
            time_quantity: 3,
            time_unit: "month"
        }
    }
}

// Test variable and functions END ===============================================================================

/**
 * Hook function for sublist
 */
function useSubList(initList) {
    const [sublist, setSublist] = useState(initList);

    const addSublist = sub => {
        setSublist(prev => {
            sub.index = prev.length;
            return [...prev, sub]
        });
    }
    const deleteSublist = index => {
        setSublist(prev => {
            // create new array
            var newarr = [...prev];
            newarr.splice(index, 1);
            //update index
            return newarr.map((value, index) => ({
                index: index,
                image: value.image,
                title: value.title,
                description: value.description,
                plan: value.plan,
            }))
        });
    }

    return [sublist, addSublist, deleteSublist];
}

const SubscriptionList = () => {
    /**
     * Array to keep track of subscriptions, subscription object should have the following property:
     * {
     *  index: index of the subscription, //index is the key of the following elements
     *  image: logo image link,
     *  title: title/name of the subscription,
     *  description: description of the subscription,
     *  plan: price plan
     * }
     */
    const [sublist, addList, deleteList] = useSubList([]);
    const [seePage, toggleSeePage] = useState(false); 

    // Handlers ==================================================================================================

    const handleAddSub = sub => {
        // sub = generateRandomSub(); 
        addList(sub);
    }
    const handleDeleteSub = index => {
        deleteList(index);
    }
    const handleSeePage = () => {
        toggleSeePage(true);
        var currAddButton = document.getElementById("addButton");
        currAddButton.style.display = "none";
        
        
    }
    const handleUnseePage = () => {
        toggleSeePage(false);
        var currAddButton = document.getElementById("addButton");
        currAddButton.style.display = "block";
    }
    

    // Handlers END ===============================================================================================

    const renderList = () => {
        /**
         * Content of this function is temporary until Subscription component is completed
         */
        return sublist.map((item) => <li key={item.index}>
            <Subscription index={item.index} image={item.image} title={item.title} description={item.description} plan={item.plan} deleteSublist={handleDeleteSub}/>
        </li>);
    }

    // Still need to add proper add button
    return (
        <div className="SubscriptionBox">
            <h3>Your Subscriptions</h3>
            <button className= "btn btn-primary custom-button" onClick={handleSeePage} id="addButton">+</button>
            {seePage ? <SubcriptionAddPage handleSubmit={handleAddSub} handleBack={handleUnseePage}/> : null}
            <ol className="SubscriptionList">
                {renderList()}
            </ol>
        </div>
    )
}



export default SubscriptionList;