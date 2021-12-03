import React from "react";
import PieGraph from "./PieChart";

const GraphGatherer = (props) => {
  return (
    <div className="graph-gather">
      <PieGraph sublist={props.sublist}/>
    </div>
    )
};

export default GraphGatherer;
