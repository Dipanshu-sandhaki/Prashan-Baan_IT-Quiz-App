import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const questions = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Write a program that takes two integers as input and prints their sum.",
    language: "cpp",
    boilerplate: `#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << (a + b);\n    return 0;\n}`,
  },
  {
    id: 2,
    title: "Factorial of a Number",
    description: "Write a C program that calculates the factorial of a number.",
    language: "c",
    boilerplate: `#include <stdio.h>\nint main() {\n    int n, i, fact = 1;\n    scanf("%d", &n);\n    for(i = 1; i <= n; i++)\n        fact *= i;\n    printf("%d", fact);\n    return 0;\n}`,
  },
];

const MonacoCodeEditor = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [code, setCode] = useState(selectedQuestion.boilerplate);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to send code to the backend
  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post("http://localhost:5000/run", {
        code,
        language: selectedQuestion.language,
      });

      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running code.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">C/C++ Code Editor</h1>

      <select
        className="border p-2 mt-2"
        onChange={(e) => {
          const selected = questions.find(q => q.id === Number(e.target.value));
          setSelectedQuestion(selected);
          setCode(selected.boilerplate);
          setOutput("");
        }}
      >
        {questions.map(q => (
          <option key={q.id} value={q.id}>{q.title}</option>
        ))}
      </select>

      <p className="mt-2 font-semibold">{selectedQuestion.description}</p>

      <Editor
        height="300px"
        language={selectedQuestion.language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button className="mt-2 bg-blue-500 text-white px-4 py-2" onClick={runCode} disabled={loading}>
        {loading ? "Running..." : "Run Code"}
      </button>

      <pre className="bg-gray-200 p-2 mt-2 whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default MonacoCodeEditor;
