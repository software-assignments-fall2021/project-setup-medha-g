/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";


const BarChart = (props) => {
  const [data, setData] = useState([['Subscription', 'Cost']]);

  useEffect(() => {
    let map = {};
    let money_per_day = 0;

    for (let sub of props.sublist) {
      money_per_day = 0;
      if (sub.plan.time_unit === "month(s)"){
        money_per_day = sub.plan.price/sub.plan.time_quantity*30;
        }
        else if (sub.plan.time_unit === "year(s)"){
            money_per_day = sub.plan.price/sub.plan.time_quantity*365;
        }   
        else{
            money_per_day = sub.plan.price/sub.plan.time_quantity;
        }
      map[sub.title] = money_per_day/30;
      
    }

    let curr = [['Subscription', 'Cost']]
    for (let val in map) {
      curr.push([val, map[val]]);
    }
    setData(curr);
  }, [props, setData])
  return (
  <Chart

    width={'500px'}
    height={'300px'}
    chartType="BarChart"

    
    loader={<div>Loading Chart</div>}
    data={data}
    options={{
      title: 'Subscriptions By Cost Per Month in USD',
      titleTextStyle: {color: "#b4896c"},
      chartArea: {
        titleTextStyle: {color: "#b4896c"},
        backgroundColor: "#f2fff9",

      },
      backgroundColor: "#f2fff9",
      colors: ['#C0E0DE', '#98ccb3', '#F5F58C','#e8e8b7','#d2eb98','#b2eb98','#98ebac','#98ebd2','#95e0ed']

    }}


  />
  )};

export default BarChart;
