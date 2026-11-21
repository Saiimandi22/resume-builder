import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');
const RESUMES_DIR = path.join(DATA_DIR, 'resumes');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RESUMES_DIR)) {
  fs.mkdirSync(RESUMES_DIR, { recursive: true });
}

export function saveResume(resumeId, resumeData) {
  const filePath = path.join(RESUMES_DIR, `${resumeId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(resumeData, null, 2));
  return resumeId;
}

export function getResume(resumeId) {
  const filePath = path.join(RESUMES_DIR, `${resumeId}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function listResumes() {
  if (!fs.existsSync(RESUMES_DIR)) {
    return [];
  }
  const files = fs.readdirSync(RESUMES_DIR);
  return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

export function saveJobApplication(applicationId, data) {
  const applicationsDir = path.join(DATA_DIR, 'applications');
  if (!fs.existsSync(applicationsDir)) {
    fs.mkdirSync(applicationsDir, { recursive: true });
  }
  const filePath = path.join(applicationsDir, `${applicationId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return applicationId;
}

export function getJobApplication(applicationId) {
  const filePath = path.join(DATA_DIR, 'applications', `${applicationId}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
