/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require('express').Router()
const mongoose = require('mongoose')
const auth = require('../auth')
const Users = mongoose.model('Users')

router.get("/parse", auth.required, async (req,res) => {
    const {
        headers: {access_token},
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

        // dictionary containing merchant name and price as a key -> times it was paid as a value 
        /**
         * {
         * merchantName: {
         *                  price: timesPaid 
         *               }
         * }
         */
        const tranMap = {}

        // loop thru transactions array
        // how do i get user?
        const user = new Users(user)
        for(const curTran in transaction)
        {
            // parse transactions -- find those with subscription category
            if(curTran.category == "subscription")
            {

                            const key = [curTran.merchantName, curTran.price_id];
                            tranMap[key] = tranMap[key] + curTran.date;
                             // make those transactions into subscription objects
                            const subObj =       {
                                image: curTran.image, 
                                title: curTran.title,
                                description: curTran.description,
                                plan: {
                                    price: curTran.price,
                                    time_quantity: tranMap[key].length,
                                    time_unit: curTran.time_unit,
                                },
                            }

                            // make sure no duplicates 
                            const duplicate = false;
                            for(const sub in user.subscriptions)
                            {
                                if(sub == subObj)
                                {
                                    duplicate = true;
                                }
                            }
                            // put subscription object into database if no duplicate
                           if(duplicate == false)
                           {
                                user.addSubscriptions(subObj)
                           }


            }
        }
        

    } catch (error) {
        console.log(error);
        return res.status(400).json({err: error.message});
    }

})



