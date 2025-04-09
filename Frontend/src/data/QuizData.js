export const guidelines = [
  "This is an individual competition; each participant must attempt the quiz alone.",
  "Participants must follow all rules and maintain academic integrity.",
  "Do not minimize or switch windows/tabs during the quiz. Doing so will trigger automatic submission, and you will be disqualified.",
  "If the quiz window is closed or refreshed, it will be submitted automatically, and you cannot re-enter.",
];

export const examStructure = {
  "2. Section 1: Multiple Choice Questions (MCQs)": [
    "There are 80 MCQs divided into 4 modules.",
    "Each module contains 20 questions based on different subjects:",
    "Module 1: Programming in C",
    "Module 2: Networking",
    "Module 3: Database Management System (DBMS)",
    "Module 4: Computer Fundamentals",
    "Each correct answer carries 1 mark.",
    "Negative marking: 1/3rd mark will be deducted for every incorrect answer.",
    "Important: Section 2 (Coding-Based Questions) will only be unlocked after completing Section 1.",
  ],
  "Section 2: Coding-Based Questions": [
    "This section consists of 2 coding questions.",
    "Each question carries 10 marks, totaling 20 marks.",
  ],
};

export const scoring = [
  "Total Marks: 100",
  "MCQ Section: 80 marks",
  "Coding Section: 20 marks",
  "The final score will be calculated based on correct answers after applying negative marking.",
];

export const timeLimit = [
  "Total duration: 1 hour 30 minutes (90 minutes).",
  "Section 1 (MCQs) must be completed before attempting Section 2 (Coding).",
];

export const importantInstructions = [
  "Do not minimize, switch tabs, or refresh the page during the quiz. Doing so will result in automatic submission and exit.",
  "The quiz platform will auto-submit your answers once the time is over.",
  "Once submitted, answers cannot be changed.",
];


export const codingQuestions = [
  {
    question: "Reverse a String",
    description:
      "Write a function to reverse a given string without using built-in methods. Example: Input: 'hello' → Output: 'olleh'.",
    functionSignature:
      "function reverseString(str) {\n  // Your code here\n}",
    constraints: [
      "Cannot use built-in reverse methods",
      "Must handle empty strings",
      "Should preserve case",
      "Should handle special characters"
    ],
    testCases: [
      {
        input: ["hello"],
        output: "olleh",
        explanation: "Simple string reversal"
      },
      {
        input: ["JavaScript"],
        output: "tpircSavaJ",
        explanation: "Mixed case handling"
      },
      {
        input: ["123!@#"],
        output: "#@!321",
        explanation: "Special characters reversal"
      },
      {
        input: [""],
        output: "",
        explanation: "Empty string case"
      }
    ]
  },
  {
    question: "Find the Largest Number",
    description:
      "Write a function that takes an array of numbers and returns the largest number. Example: Input: [3, 7, 1, 9] → Output: 9.",
    functionSignature:
      "function findLargestNumber(arr) {\n  // Your code here\n}",
    constraints: [
      "Array will always contain at least one number",
      "Numbers can be positive, negative, or zero",
      "Should handle duplicate maximum values"
    ],
    testCases: [
      {
        input: [[3, 7, 1, 9]],
        output: 9,
        explanation: "Simple maximum in array"
      },
      {
        input: [[-5, -2, -8, -1]],
        output: -1,
        explanation: "All negative numbers"
      },
      {
        input: [[42]],
        output: 42,
        explanation: "Single element array"
      },
      {
        input: [[5, 5, 5, 5]],
        output: 5,
        explanation: "All elements equal"
      }
    ]
  },
  {
    question: "Two Sum Problem",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. Example: Input: nums = [2, 7, 11, 15], target = 9 → Output: [0,1].",
    functionSignature:
      "function twoSum(nums, target) {\n  // Your code here\n}",
    constraints: [
      "Each input has exactly one solution",
      "Cannot use the same element twice",
      "Return indices of the two numbers",
      "Numbers can be positive or negative",
      "Array length is at least 2"
    ],
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        output: [0, 1],
        explanation: "2 + 7 = 9"
      },
      {
        input: [[3, 2, 4], 6],
        output: [1, 2],
        explanation: "2 + 4 = 6"
      },
      {
        input: [[-3, 4, 3, 90], 0],
        output: [0, 2],
        explanation: "-3 + 3 = 0"
      }
    ]
  }
];

export const problem = codingQuestions[2]; // The Two Sum problem