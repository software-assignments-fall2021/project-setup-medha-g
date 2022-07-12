import React from "react";
import PieGraph from "./PieChart";
import BubbleChart from "./BubbleChart";
import Statistics from "./Statistics";
import BarChart from "./BarChart"
import "../styles/Graph.css";



const GraphGatherer = (props) => {
  return (
    <div className="graph-gather">
      <Statistics sublist={props.sublist}/>
      <br/><br/><br></br>
      <div className="row">
        <div className="column">
          <PieGraph sublist={props.sublist}/>
        </div>
        <div className="column">
          <BubbleChart sublist={props.sublist}/>
        </div>
        <div className="column">
          <BarChart sublist={props.sublist}/>
        </div>
      </div><br></br><br></br><br></br>
    </div>
    )
};

export default GraphGatherer;
