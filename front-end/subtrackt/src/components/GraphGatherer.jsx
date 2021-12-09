import React from "react";
import PieGraph from "./PieChart";
import "../styles/Graph.css";

const GraphGatherer = (props) => {
  return (
    <div className="graph-gather">
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="container">
              <h4><b>20</b></h4>
              <p>Subscriptions</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="container">
              <h4><b>20</b></h4>
              <p>Subscriptions</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="container">
              <h4><b>20</b></h4>
              <p>Subscriptions</p>
            </div>
          </div>
        </div>
      </div>

      <PieGraph sublist={props.sublist}/>
    </div>
    )
};

export default GraphGatherer;
