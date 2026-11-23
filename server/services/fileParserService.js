import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseResumeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    return await parsePDF(filePath);
  } else if (ext === '.docx' || ext === '.doc') {
    return await parseWordDocument(filePath);
  } else if (ext === '.txt') {
    return parseTextFile(filePath);
  } else {
    throw new Error(`Unsupported file format: ${ext}`);
  }
}

async function parsePDF(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(fileBuffer);
  const text = data.text;

  return extractResumeFields(text);
}

async function parseWordDocument(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value;
    return extractResumeFields(text);
  } catch (error) {
    throw new Error(`Failed to parse Word document: ${error.message}`);
  }
}

function parseTextFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  return extractResumeFields(text);
}

function extractResumeFields(text) {
  const lines = text.split('\n').filter(line => line.trim());
  
  // Extract first line as name
  let fullName = '';
  let email = '';
  let phone = '';
  let summary = '';
  let skills = '';
  let experience = '';
  let education = '';

  // Try to identify name (usually first line)
  if (lines.length > 0) {
    fullName = lines[0].trim();
  }

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    email = emailMatch[0];
  }

  // Extract phone number
  const phoneMatch = text.match(/(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
  if (phoneMatch) {
    phone = phoneMatch[0];
  }

  // Split content by common section headers
  const sections = {
    summary: [],
    skills: [],
    experience: [],
    education: []
  };

  let currentSection = null;
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile')) {
      currentSection = 'summary';
    } else if (lowerLine.includes('skill') || lowerLine.includes('expertise') || lowerLine.includes('competencies')) {
      currentSection = 'skills';
    } else if (lowerLine.includes('experience') || lowerLine.includes('employment') || lowerLine.includes('work')) {
      currentSection = 'experience';
    } else if (lowerLine.includes('education') || lowerLine.includes('degree') || lowerLine.includes('university')) {
      currentSection = 'education';
    } else if (currentSection && line.trim() && !lowerLine.match(/^[a-z\s]+$/i)) {
      // Add non-header lines to current section
      if (!line.toLowerCase().match(/^(summary|skills|experience|education|work|employment|objective|profile|degree|university|school)/i)) {
        sections[currentSection].push(line.trim());
      }
    }
  }

  summary = sections.summary.join(' ').substring(0, 500);
  skills = sections.skills.join(', ');
  experience = sections.experience.join('\n');
  education = sections.education.join('\n');

  return {
    fullName: fullName || 'Extracted Resume',
    email: email || '',
    phone: phone || '',
    summary: summary || text.substring(0, 300),
    skills: skills || 'See experience section',
    experience: experience || text.substring(300, 1000),
    education: education || 'Not specified'
  };
}
