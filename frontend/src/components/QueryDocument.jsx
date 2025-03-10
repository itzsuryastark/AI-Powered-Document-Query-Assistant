import React, { useState } from "react";
import "../styles/components.css";

function QueryDocument({ uploadedFile }) {
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!uploadedFile) {
      alert("Please upload a document first.");
      return;
    }

    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("query", query);

    try {
      const response = await fetch("http://127.0.0.1:5000/query-upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setQueryResponse(data.answer || data.error);
    } catch (error) {
      console.error("Error querying document:", error);
      setQueryResponse("Failed to query document.");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Query Document</h2>
      <textarea
        rows="4"
        placeholder="Enter your query here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="textarea"
      ></textarea>
      <button className="button" onClick={handleQuery} disabled={loading}>
        {loading ? "Processing..." : "Submit Query"}
      </button>
      {queryResponse && (
        <div className="response">
          <h3>Response:</h3>
          <pre className="scrollable-text">{queryResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default QueryDocument;
