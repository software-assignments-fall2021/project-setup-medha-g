import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const PieGraph = (props) => {
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
    <Chart
      className="chart"
      width='500px'
      height='300px'
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: "Subscription tag distribution",
        backgroundColor: '#f2fff9'
      }}
      />)
};

export default PieGraph;
