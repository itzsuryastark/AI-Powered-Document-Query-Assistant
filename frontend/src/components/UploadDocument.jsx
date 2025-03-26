import React, { useState } from "react";
import Spinner from "./LoadingSpinner";
import "../styles/components.css";

function UploadDocument({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploadResponse(data.extracted_text || data.error);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadResponse("Failed to upload file.");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Upload & Summarize Document</h2>
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button className="button" onClick={handleUpload} disabled={loading}>
        {loading ? <Spinner /> : "Upload"}
      </button>
      {uploadResponse && (
        <div className="response">
          <h3>Summary:</h3>
          <pre className="scrollable-text">{uploadResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadDocument;