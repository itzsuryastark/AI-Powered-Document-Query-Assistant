import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UploadDocument from "./components/UploadDocument";
import QueryDocument from "./components/QueryDocument";
import "./styles/global.css";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <UploadDocument onFileUpload={handleFileUpload} />
        <QueryDocument uploadedFile={uploadedFile} />
      </main>
    </div>
  );
};

export default App;