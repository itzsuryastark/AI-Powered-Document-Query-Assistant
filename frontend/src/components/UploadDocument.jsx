import { useState, useRef } from "react";
import { FiUpload, FiChevronDown } from "react-icons/fi";
import Spinner from "./LoadingSpinner";
import PropTypes from 'prop-types';

function UploadDocument({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [processingType, setProcessingType] = useState("Generate Summary");
  const [uploadResponse, setUploadResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("processingType", processingType);

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

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Upload Document</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg">
              <span className="text-gray-500 truncate">
                {file ? file.name : "No file chosen"}
              </span>
              <button 
                type="button"
                onClick={handleChooseFile}
                className="px-4 py-2 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Choose File
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          <div className="text-gray-400">
            <FiUpload size={24} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Processing Type</h2>
        <p className="text-sm text-gray-500 mb-2">
          Choose how you want to process the document
        </p>
        <div className="relative">
          <select
            value={processingType}
            onChange={(e) => setProcessingType(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow pr-10"
          >
            <option value="Generate Summary" className="py-2">Generate Summary</option>
            <option value="Extract Information" className="py-2">Extract Information</option>
            <option value="Analyze Content" className="py-2">Analyze Content</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <FiChevronDown size={20} />
          </div>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <>
            <Spinner />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FiUpload size={18} />
            <span>Process Document</span>
          </>
        )}
      </button>
      
      {uploadResponse && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <h3 className="font-medium">Results</h3>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{uploadResponse}</p>
        </div>
      )}
    </div>
  );
}

UploadDocument.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default UploadDocument;