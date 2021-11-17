/* eslint-disable guard-for-in */
/* eslint-disable valid-jsdoc */
/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require('express').Router()
const clearbit = require('clearbit')(CLEARBIT_API_KEY)
const mongoose = require('mongoose')
const auth = require('../auth')
// eslint-disable-next-line no-unused-vars
const Users = mongoose.model('Users')
require("dotenv").config({ silent: true });

const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;

/**
 * Return true if the two subscription object is the same, else return false
 * @param sub1 subscripton object 1
 * @param sub2 subscripton object 2  
 */
function compareSub(sub1, sub2) {
    if(sub1.image !== sub2.image)
    {
        return false;
    }
    if(sub1.title !== sub2.title)
    {
        return false;
    }
    if(sub1.description !== sub2.description)
    {
        return false;
    }
    if(sub1.plan.price !== sub2.plan.price)
    {
        return false;
    }
    if(sub1.plan.time_quantity !== sub2.plan.time_quantity)
    {
            return false;
    }
    if(sub1.plan.time_unit !== sub2.plan.time_unit)
    {
            return false;
    }
    return true;
}


router.get('/parse', auth.required, async (req, res) => {
    const {
        headers: { access_token },
        payload: { _id },
    } = req

    const end_date = new Date()
    const start_date = new Date(today)
    start_date.setFullYear(date.getFullYear() - 1)

    const start_date_string = `${start_date.getFullYear()}-${start_date.getMonth()}-${start_date.getDate()}`
    const end_date_string = `${end_date.getFullYear()}-${end_date.getMonth()}-${end_date.getDate()}`

    const request = {
        access_token: access_token,
        start_date: start_date_string,
        end_date: end_date_string,
    }

    try {
        const response = await client.transactionsGet(request)
        let transactions = response.data.transactions
        const total_transactions = response.data.total_transactions
        while (transactions.length < total_transactions) {
            const paginated_request = {
                access_token: access_token,
                start_date: start_date_string,
                end_date: end_date_string,
                options: {
                    offset: transactions.length,
                },
            }

            const paginated_response = await client.transactionsGet(
                paginated_request
            )
            transactions = transactions.concat(
                paginated_response.data.transactions
            )
        }

        // dictionary containing merchant name and price as a key -> times it was paid as a value
        /**
         * {
         *  merchantName: {
         *      price1: timesPaid
         *      price2: timesPaid
         *  }
         *
         */
        const tranMap = {}

        // loop thru transactions array
        // how do i get user?
        const user = await mongoose.findById(_id)
        for (const curTran in transaction) {
            // parse transactions -- find those with subscription category
            if (
                curTran.category == 'subscription' &&
                curTran.merchant_name != null
            ) {
                const merchant_key = curTran.merchant_name
                const price_key = curTran.amount

                if (!(merchant_key in tranMap)) {
                    tranMap[merchant_key] = {}
                }
                if (!(price_key in tranMap[merchant_key])) {
                    tranMap[merchant_key][price_key] = 0
                }
                // number of times its been paid ++
                tranMap[merchant_key][price_key] += 1

            }
        }

        for(merchant_name in tranMap) {
            for(paid_price in tranMap[merchant_name]) {
                const company = await clearbit.Company.find({ domain: `${merchant_name}.com`, stream: true })

                let time_unit = "";
                let time_quantity = 0;
                if(tranMap[merchant_name][paid_price] == 1) {
                    time_unit = "year";
                    time_quantity = 1;
                } else if(12 / tranMap[merchant_name][paid_price] >= 1){
                    time_unit = "month";
                    time_quantity = int(12 / tranMap[merchant_name][paid_price]);
                }else {
                    time_unit = "day";
                    time_quantity = int(365 / tranMap[merchant_name][paid_price]);
                }

                // make those transactions into subscription objects
                const subObj = {
                    image: company.logo,
                    title: company.name,
                    description: company.description,
                    plan: {
                        price: paid_price,
                        time_quantity: time_quantity,
                        time_unit: time_unit
                    },
                }

                // make sure no duplicates
                const duplicate = false
                for (const sub in user.subscriptions) {
                    duplicate = duplicate | compareSub(sub, subObj)
                    if(duplicate) break;
                    
                }
                // put subscription object into database if no duplicate
                if (!duplicate) {
                    console.log("Adding subobj into db", subObj);
                    user.addSubscriptions(subObj)
                }
            }
        }

        user.save().then(() => res.json("Successfully parsed and added to db"));

    } catch (error) {
        console.log(error)
        return res.status(400).json({ err: error.message })
    }
})
