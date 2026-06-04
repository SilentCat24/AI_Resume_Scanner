import React, { useState } from "react";
import useAuth from "./Hooks";
import Result from "./Result";




const Scanner = () => {
const { err, report, AiScanner } = useAuth();
  
const [data, setData] = useState({
    resume: null,
    jobDescription: "",
  });

  const handleFileChange = (e) => {
    setData({
      ...data,
      resume: e.target.files[0],
    });
    console.log("data from file",data)
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (!data.resume) {
    alert("Please upload resume");
    return;
  }

  if (!data.jobDescription.trim()) {
    alert("Please enter job description");
    return;
  }

  AiScanner(data);
};

  return (
    <div>
      <h2>AI Resume Scanner</h2>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="jobDescription"
        placeholder="Enter Job Description"
        value={data.jobDescription}
        onChange={handleChange}
      />

    <button onClick={handleSubmit}>Start Scanning</button>    
 {report && <Result report={report} />}
    </div>
  );
};

export default Scanner;