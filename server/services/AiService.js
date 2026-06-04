const Groq = require("groq-sdk");
require("dotenv").config();



const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeResume(resumeText, jobDescription) {
  const prompt = `
You are an expert HR recruiter and ATS specialist.

Compare the resume with the job description and return ATS scan result.

Return only valid JSON. No markdown. No extra text.

JSON format:
{
  "overallScore": 0,
  "matchScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "skills": {
    "matched": [],
    "missing": [],
    "additional": []
  },
  "experience": {
    "years": 0,
    "level": "",
    "highlights": []
  },
  "education": {
    "degree": "",
    "field": "",
    "institutions": []
  },
  "suggestions": [],
  "atsCompatibility": {
    "score": 0,
    "issues": []
  },
  "keywordDensity": [
    {
      "keyword": "",
      "count": 0
    }
  ]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an ATS resume scanner. Always return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 2000,
    response_format: {
      type: "json_object",
    },
  });

  const rawText = response.choices[0].message.content;

  try {
    return JSON.parse(rawText);
  } catch (error) {
    console.error("AI JSON Parse Error:", rawText);
    throw new Error("Invalid AI response format");
  }
}

module.exports = { analyzeResume };