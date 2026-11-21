import express from 'express';
import { saveResume, getResume, listResumes } from '../services/storageService.js';

const router = express.Router();

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
