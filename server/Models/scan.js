const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  jobDescription: { type: String, default: '' },
  result: {
    overallScore: { type: Number, min: 0, max: 100 },
    summary: String,
    strengths: [String],
    weaknesses: [String],
    skills: {
      matched: [String],
      missing: [String],
      additional: [String]
    },
    experience: {
      years: Number,
      level: String,
      highlights: [String]
    },
    education: {
      degree: String,
      field: String,
      institutions: [String]
    },
    suggestions: [String],
    atsCompatibility: {
      score: Number,
      issues: [String]
    },
    keywordDensity: [{ keyword: String, count: Number }]
  },
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
