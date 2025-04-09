import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Green, Orange, Red

const PieChartt = ({ chartData }) => {
  const data = [
    { name: "Answered", value: chartData[0] },
    { name: "Marked for Review", value: chartData[1] },
    { name: "Total Questions", value: chartData[2] },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Quiz Progress</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartt;
