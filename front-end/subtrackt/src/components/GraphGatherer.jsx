import React from "react";
import PieGraph from "./PieChart";
import Statistics from "./Statistics";


const GraphGatherer = (props) => {
  return (
    <div className="graph-gather">
      <Statistics sublist={props.sublist}/>
      <br/><br/>
      <PieGraph sublist={props.sublist}/>
    </div>
    )
};

export default GraphGatherer;
