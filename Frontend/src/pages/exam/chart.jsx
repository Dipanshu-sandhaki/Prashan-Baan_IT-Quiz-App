import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HorizontalBarChart ({chartData}){
  const data = {
    labels: ["Attempted Questions", "Mark For Review", "Remaining Questions"],
    datasets: [
      {
        label: "Questions",
        data: chartData,
        backgroundColor: [ "rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)","rgba(54, 162, 235, 0.6)",],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Questions: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white", // Set x-axis label color to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis label color to white
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-full h-40">
          <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;
