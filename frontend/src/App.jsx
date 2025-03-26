import React, { useState } from "react";
import UploadDocument from "./components/UploadDocument";
import QueryDocument from "./components/QueryDocument";
import "./styles/global.css";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-2">AI-Powered Document Query System</h1>
        <p className="text-gray-600 mb-8">Upload a document and enter your query to process it.</p>
        <UploadDocument onFileUpload={handleFileUpload} />
        <QueryDocument uploadedFile={uploadedFile} />
      </div>
    </div>
  );
};

export default App;