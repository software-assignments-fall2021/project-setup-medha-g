import React, { useState } from 'react';
import 'bootstrap/dist/css/min.css';

// Test variable and functions ===================================================================================

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

function generateRandomSub() {
    return {
        index: 0,
        image: (Math.random() + 1).toString(36).substring(7),
        description: (Math.random() + 1).toString(36).substring(7),
        plan: (Math.random() + 1).toString(36).substring(7)
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
            let newSubs = prev.splice(index, 1);
            //update index
            return newSubs.map((value, index) => ({
                index: index,
                image: value.image,
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
     *  index: index of the subscription,
     *  image: logo image link,
     *  title: title/name of the subscription,
     *  description: description of the subscription,
     *  plan: price plan
     * }
     */
    const [sublist, addList, deleteList] = useSubList(startList);

    // Handlers ==================================================================================================

    const handleAddSub = sub => {
        // sub = generateRandomSub(); uncomment for testing
        addList(sub);
    }
    const handleDeleteSub = index => {
        deleteList(index);
    }

    // Handlers END ===============================================================================================

    const renderList = () => {
        /**
         * Content of this function is temporary until Subscription component is completed
         */
        return sublist.map((item) => <li key={item.index}>
            Image: {item.image},
            Description: {item.description},
            Plan: {item.plan}
        </li>);
    }

    // Still need to add proper add button
    return (
        <div className="SubscriptionBox">
            <button onClick={handleAddSub}>+</button>
            <ul className="SubscriptionList">
                {renderList()}
            </ul>
        </div>
    )
}