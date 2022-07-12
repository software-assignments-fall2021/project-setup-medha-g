import React, { useEffect, useState } from "react";
import "../styles/Graph.css";

const Statistics = (props) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      let subcount = 0;
      let money_per_day = 0;

      for (let sub of props.sublist) {
          subcount += 1;
          if (sub.plan.time_unit === "month"){
            money_per_day += sub.plan.price/(sub.plan.time_quantity*30);
            }
            else if (sub.plan.time_unit === "year"){
                money_per_day += sub.plan.price/(sub.plan.time_quantity*365);
            }   
            else{
                money_per_day += sub.plan.price/sub.plan.time_quantity;
            }
        
      }
  
      let curr = [parseFloat(money_per_day * 365).toFixed(2), subcount, parseFloat(money_per_day * 30).toFixed(2)];
      setData(curr);
    }, [props, setData])
  
  
    return (
        <div className="row">
        <div className="column">
          <div className="card">
              <h4><b>${data[0]}</b></h4>
              <p>Average Yearly Spending</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
              <h4><b>{data[1]}</b></h4>
              <p>Total Subscriptions</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
              <h4><b>${data[2]}</b></h4>
              <p>Average Monthly Spending</p>
          </div>
        </div>
      </div>
    )};
  
  export default Statistics;
  


