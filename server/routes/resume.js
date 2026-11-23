import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { saveResume, getResume, listResumes } from '../services/storageService.js';
import { parseResumeFile } from '../services/fileParserService.js';

const router = express.Router();

// Setup multer for file uploads
const uploadDir = 'data/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExts = ['.pdf', '.doc', '.docx', '.txt'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (allowedExts.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, Word, and Text files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/parse', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const parsedData = await parseResumeFile(filePath);

    // Clean up the uploaded file after parsing
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    res.json({
      success: true,
      parsedData
    });
  } catch (error) {
    // Clean up the uploaded file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post('/create', (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const resumeId = `resume-${Date.now()}`;
    saveResume(resumeId, resume);

    res.json({
      success: true,
      resumeId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const resume = getResume(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', (req, res) => {
  try {
    const resumes = listResumes();
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
