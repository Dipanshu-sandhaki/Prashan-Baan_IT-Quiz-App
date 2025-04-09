import React from "react";

const InstructionsList = ({ title, items = [], num=0 }) => {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-bold mt-6 mb-4">{title}</h3>
      {items.length > 0 ? (
        <ul className="list-disc pl-8 space-y-2">
          {items.map((item, index) => (
            <li key={index}>{num!==0?num:''}{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No instructions available.</p>
      )}
    </div>
  );
};

export default InstructionsList;
