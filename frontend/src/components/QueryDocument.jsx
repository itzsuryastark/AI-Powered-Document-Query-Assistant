import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import PropTypes from 'prop-types';

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
    <div className="mt-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Your Query</h2>
        <textarea
          rows="4"
          placeholder="Enter your query or specific instructions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        onClick={handleQuery}
        disabled={loading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <FiSend size={18} />
        <span>{loading ? "Processing..." : "Process Document"}</span>
      </button>

      {queryResponse && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Response:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{queryResponse}</p>
        </div>
      )}
    </div>
  );
}

QueryDocument.propTypes = {
  uploadedFile: PropTypes.object,
};

export default QueryDocument;
