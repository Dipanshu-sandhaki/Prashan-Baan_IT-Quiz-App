import React, { useEffect, useState } from "react";
import Editor from "../../components/Editor/EditorMain";
import Footer from "../../utils/Footer";
import StudentHeader from "../../components/student/StudentHeader";
import { getCodingProblems } from "../../apiCalls/examApiManager";

const CodeEditor = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-start via-middle to-end">
      {/* Header */}
      <StudentHeader />

      {/* Main Content - Takes Remaining Space */}
      <div className="flex-grow flex">
        <Editor />
      </div>

      {/* Footer - Always at Bottom */}
      <Footer />
    </div>
  );
};

export default CodeEditor;
