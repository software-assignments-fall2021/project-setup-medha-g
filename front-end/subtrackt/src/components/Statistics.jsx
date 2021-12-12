import React, { useEffect, useState } from "react";
import "../styles/Graph.css";

const Statistics = (props) => {
    //TODO: use backend data
    const [data, setData] = useState([["Industry", "Count"]]);
  
    useEffect(() => {
      let map = {};
      for (let sub of props.sublist) {
        for (let tag of sub.tags) {
          if(tag in map) {
            map[tag] += 1;
          } else {
            map[tag] = 1;
          }
        }
      }
  
      let curr = [["Tags", "Count"]]
      for (let tag in map) {
        curr.push([tag, map[tag]]);
      }
      setData(curr);
    }, [props, setData])
  
  
    return (
        <div className="row">
        <div className="column">
          <div className="card">
              <h4><b>$20</b></h4>
              <p>Spent This Month</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
              <h4><b>20</b></h4>
              <p>Subscriptions</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
              <h4><b>$20</b></h4>
              <p>Average Monthly Spending</p>
          </div>
        </div>
      </div>
    )};
  
  export default Statistics;
  


