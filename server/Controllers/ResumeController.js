const Resume=require('../Models/Resume');
const { analyzeResume } = require('../services/AiService');
const { extractText } = require('../services/parser');


exports.uploadResumeAndScan = async (req, res, next) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded." });
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      return res.status(400).json({ message: "Job description is required." });
    }

    const rawText = await extractText(
      req.file.buffer,
      req.file.originalname
    );

    if (!rawText || rawText.trim().length < 50) {
      return res.status(422).json({
        message: "Could not extract meaningful text from the resume."
      });
    }

    const aiResult = await analyzeResume(
      rawText.trim(),
      jobDescription.trim()
    );

    const resume = await Resume.create({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      rawText: rawText.trim(),
      jobDescription: jobDescription.trim(),
      aiAnalysis: aiResult
    });

    res.status(201).json({
      message: "Resume scanned successfully",
      resume,
      aiResult
    });
  } catch (err) {
    next(err);
  }
};