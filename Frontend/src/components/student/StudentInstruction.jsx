import React, { useEffect, useState } from "react";
import InstructionsList from "../InstructionsList";
import {
  guidelines,
  examStructure,
  scoring,
  timeLimit,
  importantInstructions,
} from "../../data/QuizData";

export const StudentInstruction = () => {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API or database
    const fetchInstructions = async () => {
      try {
        const response = await fetch("/api/instructions"); // Update with the correct API endpoint
        const data = await response.json();
        setInstructions(data);
      } catch (error) {
        console.error("Error fetching instructions:", error);
      }
    };

    fetchInstructions();
  }, []);

  return (
    <div
      className="p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-white"
      style={{
        backgroundImage: "url('/path/to/marble-texture.png')", // Replace with your marble texture path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8, // Adjust opacity for transparency
      }}
    >
      <h2 className="text-3xl font-bold mb-4">Student Instructions</h2>
      <div className="max-h-600 overflow-y-auto p-4 border rounded-lg shadow-sm backdrop-blur-md bg-white bg-opacity-20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
        <InstructionsList title="1. General Guidelines" items={guidelines} />
        
        {Object.entries(examStructure).map(([section, points], index) => (
          <InstructionsList key={index} title={`2. ${section}`} items={points} />
        ))}

        <InstructionsList title="3. Scoring & Evaluation" items={scoring} />
        <InstructionsList title="4. Time Limit" items={timeLimit} />
        <InstructionsList title="5. Important Instructions" items={importantInstructions} />
      </div>
    </div>
  );
};