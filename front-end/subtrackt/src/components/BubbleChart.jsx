import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const BubbleChart = (props) => {
    const [data, setData] = useState([['Subscription', 'Plan', 'Cost']]);

    useEffect(() => {
      let map = {};
      let money_per_day = 0;
      let count = 1;
      let curr = [['Subscription', 'Plan', 'Cost']]
      let unit = 0;

  
      for (let sub of props.sublist) {
        money_per_day = 0;
        unit = 0;
        if (sub.plan.time_unit === "month(s)"){
          money_per_day = sub.plan.price/sub.plan.time_quantity*30;
          unit = 30;
          }
          else if (sub.plan.time_unit === "year(s)"){
              money_per_day = sub.plan.price/sub.plan.time_quantity*365;
              unit = 365;
          }   
          else{
              money_per_day = sub.plan.price/sub.plan.time_quantity;
              unit = 1;
          }
          curr[count] = [sub.title,unit, money_per_day];
          count+=1;        
      }
    setData(curr);
  }, [props, setData])


  return (
    <Chart
      className="chart"
      width='500px'
      height='300px'
      chartType="BubbleChart"
      loader={<div>Loading Chart</div>}
        data={data}
        options={{
            title: "Your Subscriptions By Plan and Cost in USD",
            titleTextStyle: {color: "#b4896c"},
            hAxis: {title: 'Subscriptions', titleTextStyle: {color: "#b4896c"}},
            vAxis: {title: 'Days', titleTextStyle: {color: "#b4896c"}},

          chartArea: {
            width: '85%',
            height: '85%',
            backgroundColor: "#f2fff9",
            
            
          },
          backgroundColor:"#f2fff9",
          colors: ['#C0E0DE', '#98ccb3', '#F5F58C','#e8e8b7','#d2eb98','#b2eb98','#98ebac','#98ebd2','#95e0ed'],
          pointSize: 10,
          animation: {
            duration: 1000,
            easing: 'out',
            startup: true,
          },
          colors: ['#C0E0DE', '#98ccb3', '#F5F58C','#e8e8b7','#d2eb98','#b2eb98','#98ebac','#98ebd2','#95e0ed'],

          
      }

    }
      />)
};

export default BubbleChart;
