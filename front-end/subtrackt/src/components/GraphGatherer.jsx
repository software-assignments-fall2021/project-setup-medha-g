import React, { useState } from "react";
import BarChart from "./BarChart.jsx";
import PieGraph from "./PieChart.jsx";

const totalPricesLastSixMonths = [4, 8, 5, 6, 7];
const subcriptionPriceMapping = [2, 9, 4, 9, 2];

const GraphGatherer = (props) => {
  const [monthlySpending, setMonthlySpending] = useState(
    totalPricesLastSixMonths
  );
  const [subcriptionPriceMapping, setSubscriptionPriceMapping] = useState(
    subcriptionPriceMapping
  );

  return (
    <div class="column">
      <div className="MonthlySpendingGraph">
        <BarChart data={monthlySpending} />
      </div>
      <div className="LastMonthPieChart">
        <PieGraph data={subcriptionPriceMapping} />
      </div>
    </div>
  );
};

export default GraphGatherer;
