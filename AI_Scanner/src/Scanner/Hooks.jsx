import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:8000/api/resumes";

const useAuth = () => {
  const [report, setReport] = useState(null);
  const [err, setErr] = useState("");


  const AiScanner = async (data) => {
    try {
      setErr("");

      const formData = new FormData();

      formData.append("resume", data.resume);
      formData.append("jobDescription", data.jobDescription);

      const res = await axios.post(`${API_URL}/upload`, formData);

      console.log(res.data.aiResult);
      setReport(res.data.aiResult);
    } catch (err) {
      console.log(err);
      setErr(err.response?.data?.message || "Something went wrong");
    }
  };

  return {
    err,
    report,
    AiScanner,
  };
};

export default useAuth;