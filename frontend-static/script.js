// Upload Document
document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      document.getElementById("extractedText").value = data.extracted_text;
    }
  } catch (error) {
    alert("Error uploading document.");
    console.error(error);
  }
});

// Query Document
document.getElementById("queryButton").addEventListener("click", async () => {
  const documentText = document.getElementById("documentInput").value;
  const query = document.getElementById("queryInput").value;

  if (!documentText || !query) {
    alert("Please provide both document text and a query.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document: documentText,
        query: query,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      document.getElementById("queryResult").querySelector("span").innerText = data.answer;
    }
  } catch (error) {
    alert("Error querying the document.");
    console.error(error);
  }
});

// Summarize Text
document.getElementById("summarizeButton").addEventListener("click", async () => {
  const text = document.getElementById("textInput").value;

  if (!text) {
    alert("Please provide text to summarize.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();
    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      document.getElementById("summaryResult").value = data.summary;
    }
  } catch (error) {
    alert("Error summarizing text.");
    console.error(error);
  }
});
