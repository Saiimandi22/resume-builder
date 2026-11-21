import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resume.js';
import jobRoutes from './routes/jobs.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/resume', resumeRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    llmProvider: process.env.LLM_PROVIDER || 'claude',
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    llmProvider: process.env.LLM_PROVIDER || 'claude',
    supportedProviders: ['claude', 'google'],
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`LLM Provider: ${process.env.LLM_PROVIDER || 'claude'}`);
});
