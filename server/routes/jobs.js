import express from 'express';
import crypto from 'crypto';
import { fineTuneResume, analyzeJobDescription, getLLMProvider } from '../services/llmService.js';
import { saveJobApplication, getJobApplication } from '../services/storageService.js';

const router = express.Router();

router.post('/fine-tune', async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Resume and job description are required' });
    }

    const fineTunedResume = await fineTuneResume(resume, jobDescription);

    const applicationId = crypto.randomBytes(4).toString('hex');
    const applicationData = {
      id: applicationId,
      createdAt: new Date().toISOString(),
      originalResume: resume,
      fineTunedResume,
      jobDescription,
      llmProvider: getLLMProvider(),
    };

    saveJobApplication(applicationId, applicationData);

    res.json({
      success: true,
      applicationId,
      originalResume: resume,
      fineTunedResume,
      llmProvider: getLLMProvider(),
    });
  } catch (error) {
    console.error('Error fine-tuning resume:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const analysis = await analyzeJobDescription(jobDescription);

    res.json({
      success: true,
      analysis,
      llmProvider: getLLMProvider(),
    });
  } catch (error) {
    console.error('Error analyzing job description:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/application/:id', (req, res) => {
  try {
    const application = getJobApplication(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/provider', (req, res) => {
  res.json({
    provider: getLLMProvider(),
  });
});

export default router;
