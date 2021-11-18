import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Subscription from './Subscription';
import SubcriptionAddPage from './SubscriptionAddPage';
import useAsync from './use-async';
import { useAuth } from './use-auth';
import useRender from './use-render';

/* Test variable and functions ===================================================================================

*/

function generateRandomSub() {
    return {
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
            return [...prev, sub]
        });
    }
    const deleteSublist = index => {
        setSublist(prev => {
            // create new array
            var newarr = [...prev];
            newarr.splice(index, 1);
            return newarr;
        });
    }

    return [sublist, addSublist, deleteSublist, setSublist];
}

const SubscriptionList = () => {

    /**
     * Array to keep track of subscriptions, subscription object should have the following property:
     * {
     *  image: logo image link,
     *  title: title/name of the subscription,
     *  description: description of the subscription,
     *  plan: price plan
     * }
     */
    const [sublist, addList, deleteList, setList] = useSubList([]);
    const [seePage, toggleSeePage] = useState(false);
    const auth = useAuth();
    const forceRender = useRender();

    const getDBList = useCallback(async () => {
        if (auth.jwt) {
            const res = await axios.get("/api/users/getsublist", {
                headers: {
                    Authorization: `Token ${auth.jwt}`
                }
            });

            auth.setJwt(res.data.user.token);
            setList(res.data.subscriptions);
        }
    }, [auth, setList, forceRender.state])

    const dblist = useAsync(getDBList);

    // Handlers ==================================================================================================

    const handleAddSub = sub => {
        // sub = generateRandomSub(); 
        axios.post("/api/users/addsubscriptioninfo", { sub_info: sub }, {
            headers: {
                Authorization: `Token ${auth.jwt}`
            }
        }).then(res => auth.setJwt(res.data.user.token));
        addList(sub);
    }
    const handleDeleteSub = index => {
        axios.post("/api/users/removesubscriptioninfo", { index: index }, {
            headers: {
                Authorization: `Token ${auth.jwt}`
            }
        }).then(res => auth.setJwt(res.data.user.token));
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
        currAddButton.style.display = "inline-block";
    }


    // Handlers END ===============================================================================================

    const renderList = () => {
        if (dblist.status === "idle") {
            return <li key={0}>Fetching</li>
        }

        if (dblist.status === "error") {
            return <li key={0}>Error when fetching data</li>
        }

        return sublist.map((item, index) => <li key={index}>
            <Subscription index={index} image={item.image} title={item.title} description={item.description} plan={item.plan} deleteSublist={handleDeleteSub} />
        </li>);
    }

    // Still need to add proper add button
    return (
        <div className="SubscriptionBox">
            <h3>Your Subscriptions</h3>
            <button className="btn btn-primary" onClick={handleSeePage} id="addButton">+</button>
            {seePage ? <SubcriptionAddPage handleSubmit={handleAddSub} handleBack={handleUnseePage} handleRender={forceRender} /> : null}
            <ol className="SubscriptionList">
                {renderList()}
            </ol>
        </div>
    )
}



export default SubscriptionList;