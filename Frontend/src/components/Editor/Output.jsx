import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { executeCode, updateTheCodeToDB } from "../../utils/api";
import showAlert from "../alertMessage/Alert";
import Swal from "sweetalert2";

const Output = ({
  editorRef,
  language,
  code,
  problemId,
  setCurrentIndex,
  totalProblems,
  currentIndex,
}) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [needsInput, setNeedsInput] = useState(false);
  const navigate = useNavigate();

  const [expacted, setExpacted] = useState([]);
  const [rslt, setRslt] = useState([]);
  const [getOpt, setGetOpt] = useState([]);
  const [error, setError] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);

  useEffect(() => {
    setUserInput(code);
  }, [code,  currentIndex  ]);

  useEffect(() => {
    if (problemId !== undefined) {
      setCurrentProblem(problemId);
    }
  }, [problemId]);

  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;
    try {
      setIsLoading(true);

      const result = await executeCode(language, code, currentProblem);

      if (result.error) {
        setIsError(true);
        setError(result.details);
        const arr = [];
        setExpacted(arr);
        setRslt(arr);
        setGetOpt(arr);
      } else {
        setIsError(false);
        setError(null);

        console.log(result);
        const getOutput = [];
        const weNeed = [];
        const rstlValue = [];
        Object.values(result).map((rst, index) => {
          getOutput.push(rst.output);
          weNeed.push(rst.test);
          rstlValue.push(rst.passed);
        });

        setExpacted(weNeed);
        setRslt(rstlValue);
        setGetOpt(getOutput);
      }
      // setOutput(result.output.split("\n"));
      // setIsError(!!result.stderr);
      // setShowOutput(true);

      // Check if the code needs input
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    let statusIs = "wrong";
    let marks = 0;

    try {
      const hasFalse = rslt.some((value) => value === false);

      if (hasFalse) {
        statusIs = "wrong";
        console.log("At least one value is false!");
        marks = -10;
      } else {
        statusIs = "right";
        console.log("All values are true!");
        marks = 10;
      }

      const problem_id = currentProblem;
      const student_id = localStorage.getItem("userId");
      const code = editorRef.current.getValue();
      const data = await updateTheCodeToDB(
        problem_id,
        student_id,
        marks,
        code,
        statusIs
      );

      setUserInput(code);

      showAlert({ title: "success", text: data.message, icon: "success" });

      if (currentIndex + 1 < totalProblems) {
        setCurrentIndex((prev) => {
          return prev + 1;
        });
      } else {
        navigate("/completion");
      }
    } catch (error) {
      setShowOutput(false);
    }
  };

  return (
    <div className="h-1/2 p-4 border-t border-gray-700">
      <div className="flex flex-col gap-2">
        {needsInput && (
          <textarea
            className="w-full p-2 border border-gray-500 rounded-md"
            placeholder="Enter input for your code..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        )}

        <div className="flex justify-between">
          <button
            className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
            disabled={isLoading}
            onClick={runCode}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
          <button
            className="px-4 py-2 border  rounded-md hover:bg-blue-500 hover:text-white transition text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {isError ? (
        <div
          className={`mt-2 p-2 text-white border rounded-md overflow-auto max-h-40 ${"border-red-500 text-red-400 bg-red-900"}`}
        >
          <p>{error}</p>
        </div>
      ) : (
        ""
      )}

      {expacted.length > 0 || rslt.length > 0 || getOpt.length > 0 ? (
        <div>
          {Array.from(
            { length: Math.max(expacted.length, rslt.length, getOpt.length) },
            (_, index) => (
              <div
                key={index}
                className="mt-2 p-2 text-white border rounded-md overflow-auto max-h-40 border-gray-700 bg-gray-800"
              >
                <p>
                  Output: {getOpt[index] !== undefined ? getOpt[index] : "N/A"}
                </p>
                <p>
                  Expected:{" "}
                  {expacted[index] !== undefined ? expacted[index] : "N/A"}
                </p>
                <p>
                  Pass:{" "}
                  {rslt[index] !== undefined
                    ? rslt[index]
                      ? "Pass"
                      : "Fail"
                    : "N/A"}
                </p>
              </div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Output;
