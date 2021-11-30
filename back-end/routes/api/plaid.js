/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require('express').Router()
const mongoose = require('mongoose')
const Users = mongoose.model('Users')
const auth = require('../auth')
const plaid = require('plaid')
require('dotenv').config({ silent: true })

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;

const clearbit = require('clearbit')(CLEARBIT_API_KEY)

const configuration = new plaid.Configuration({
    basePath: plaid.PlaidEnvironments['sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
        },
    },
})

const client = new plaid.PlaidApi(configuration);

router.get("/create_link_token", auth.required, async (req, res) => {
    const {
        payload: {username}
    } = req;

    const request = {
        user: {
            client_user_id: username
        },
        client_name: "Subtrakt",
        products: [plaid.Products.Auth, plaid.Products.Transactions],
        language: "en",
        country_codes: [plaid.CountryCode.Us]
    };

    try {
        const response = await client.linkTokenCreate(request);
        return res.json(response.data);
    } catch (error) {
        if(error.response) return res.status(error.response.status).json({err: error.response.data});
        else res.status(500).json({error: error.message});
    }
})

router.post("/get_access_token", auth.required, async (req, res) => {
    const {
        body: {public_token}
    } = req;

    try {
        const response = await client.itemPublicTokenExchange({public_token: public_token});
        const item_id = response.data.item_id;
        return res.json({access_token: response.data.access_token, item_id: item_id});
    } catch (error) {
        if(error.response) return res.status(error.response.status).json({err: error.response.data});
        else res.status(500).json({error: error.message});
    }
})

router.get("/transaction", auth.required, async (req,res) => {
    const {
        headers: {access_token}
    } = req;

    const end_date = new Date();
    const start_date = new Date(today);
    start_date.setFullYear(date.getFullYear() - 1);

    const start_date_string = `${start_date.getFullYear()}-${start_date.getMonth()}-${start_date.getDate()}`;
    const end_date_string = `${end_date.getFullYear()}-${end_date.getMonth()}-${end_date.getDate()}`

    const request = {
        access_token: access_token,
        start_date: start_date_string,
        end_date: end_date_string
    }

    try {
        const response = await client.transactionsGet(request);
        let transactions = response.data.transactions;
        const total_transactions = response.data.total_transactions;
        while(transactions.length < total_transactions) {
            const paginated_request = {
                access_token: access_token,
                start_date: start_date_string,
                end_date: end_date_string,
                options: {
                    offset: transactions.length
                }
            }

            const paginated_response = await client.transactionsGet(paginated_request);
            transactions = transactions.concat(paginated_response.data.transactions);
        }

        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({err: error.message});
    }

})

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
    const start_date = new Date(end_date)
    start_date.setFullYear(end_date.getFullYear() - 1)

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

        const user = await Users.findById(_id)
        for (const curTran in transactions) {
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
                    user.addSubscriptions(subObj)
                }
            }
        }

        user.save().then(() => res.json("Successfully parsed and added to db"));

    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
})

module.exports = router