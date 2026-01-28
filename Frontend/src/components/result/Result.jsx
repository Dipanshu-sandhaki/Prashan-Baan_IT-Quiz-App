import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Result = ({ results = [] }) => {
  const rowsLimit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsToShow, setRowsToShow] = useState([]);

  const totalPage = Math.ceil(results.length / rowsLimit);

  useEffect(() => {
    changePage(0);
  }, [results]);

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(results.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      changePage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  if (!results || results.length === 0) {
    return (
      <p className="text-white text-xl text-center mt-10">
        No results found for this quiz.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center pt-10 pb-14">
      <div className="w-full max-w-5xl px-2">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Prashanban – Quiz Result Summary
        </h1>

        {/* Table */}
        <div className="w-full overflow-x-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl">
          <table className="table-auto w-full text-left font-inter border border-white/20">
            <thead className="text-white font-semibold">
              <tr className="bg-white/20">
                <th className="py-3 px-3 text-center">Rank</th>
                <th className="py-3 px-3 text-center">Name</th>
                <th className="py-3 px-3 text-center">Email</th>
                <th className="py-3 px-3 text-center">Attempted</th>
                <th className="py-3 px-3 text-center">Correct</th>
                <th className="py-3 px-3 text-center">Score</th>
              </tr>
            </thead>

            <tbody>
              {rowsToShow.map((item, index) => (
                <tr
                  key={item._id}
                  className={`text-white ${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <td className="py-2 px-3 text-center">
                    {currentPage * rowsLimit + index + 1}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {item.student?.name || "Guest User"}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {item.student?.username || "N/A"}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {item.total_attempt}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {item.total_correct}
                  </td>
                  <td className="py-2 px-3 text-center">{item.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-between flex-wrap mt-4 px-1 items-center text-white">
          <div className="text-lg">
            Showing {currentPage * rowsLimit + 1} –{" "}
            {Math.min((currentPage + 1) * rowsLimit, results.length)} of{" "}
            {results.length}
          </div>

          <ul className="flex gap-x-2 items-center mt-3 sm:mt-0">
            <li
              className={`w-[36px] h-[36px] flex justify-center items-center border rounded cursor-pointer ${
                currentPage === 0 && "bg-gray-500 pointer-events-none"
              }`}
              onClick={previousPage}
            >
              <FaAngleLeft />
            </li>

            {Array.from({ length: totalPage }).map((_, index) => (
              <li
                key={index}
                className={`w-[36px] h-[36px] flex justify-center items-center rounded border cursor-pointer ${
                  currentPage === index
                    ? "bg-blue-500 text-white border-blue-300"
                    : "border-gray-400"
                }`}
                onClick={() => changePage(index)}
              >
                {index + 1}
              </li>
            ))}

            <li
              className={`w-[36px] h-[36px] flex justify-center items-center border rounded cursor-pointer ${
                currentPage === totalPage - 1 &&
                "bg-gray-500 pointer-events-none"
              }`}
              onClick={nextPage}
            >
              <FaAngleRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;
