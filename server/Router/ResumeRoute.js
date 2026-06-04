const express = require('express');
const multer = require('multer');
const { uploadResumeAndScan } = require('../Controllers/ResumeController');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF, DOCX, and TXT files are allowed.'));
  }
});

router.post('/upload', upload.single('resume'), uploadResumeAndScan);


module.exports=router;