const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },

  fileType: {
    type: String,
    required: true,
  },

  rawText: {
    type: String,
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  jobDescription: {
    type: String,
  },

  aiAnalysis: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
module.exports = mongoose.model('Resume', resumeSchema);
