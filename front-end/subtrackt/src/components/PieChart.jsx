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
        title: "Your Subscriptions By Industry",
        titleTextStyle: {color: "#b4896c"},
        backgroundColor: '#f2fff9',
        animation: {
          startup: true,
          easing: 'linear',
          duration: 1500,
        },
        colors: ['#C0E0DE', '#98ccb3', '#F5F58C','#e8e8b7','#d2eb98','#b2eb98','#98ebac','#98ebd2','#95e0ed']
      }
      
    }
      />)
};

export default PieGraph;
