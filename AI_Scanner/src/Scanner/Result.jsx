import React from "react";

const Result = ({ report }) => {
  if (!report) return null;

  return (
    <div>
      <h2>Scan Result</h2>

      <h3>Overall Score: {report.overallScore}%</h3>
      <h3>Match Score: {report.matchScore}%</h3>

      <p>{report.summary}</p>

      <h4>Strengths</h4>
      <ul>
        {report.strengths?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>Weaknesses</h4>
      <ul>
        {report.weaknesses?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>Matched Skills</h4>
      <ul>
        {report.skills?.matched?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>Missing Skills</h4>
      <ul>
        {report.skills?.missing?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>Suggestions</h4>
      <ul>
        {report.suggestions?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;