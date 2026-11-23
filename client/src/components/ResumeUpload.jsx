import { useState } from 'react';
import '../styles/components.css';

export default function ResumeUpload({ onSubmit, onSkip }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setExtractedText('');
    }
  };

  const extractTextFromFile = async (file) => {
    try {
      if (file.type === 'application/pdf') {
        // For PDF files, we'll ask user to copy-paste for now
        // (PDF parsing requires additional library)
        setError('PDF support coming soon. Please copy-paste your resume text below.');
        return '';
      } else if (file.type === 'text/plain' || file.type === 'text/csv') {
        // Plain text files
        return await file.text();
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        setError('Word document support coming soon. Please copy-paste your resume text below.');
        return '';
      } else {
        // Try reading as text
        return await file.text();
      }
    } catch (err) {
      setError('Could not read file. Please try a different format or copy-paste instead.');
      return '';
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const text = await extractTextFromFile(file);
      
      if (text) {
        setExtractedText(text);
        // Parse the extracted text into resume fields
        const resumeData = parseResumeText(text);
        onSubmit(resumeData);
      } else {
        setError('Could not extract text from file. Please use the manual form or paste text.');
      }
    } catch (err) {
      setError('Error processing file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseResumeText = (text) => {
    // Simple parsing logic - extract common resume sections
    const lines = text.split('\n').filter(line => line.trim());
    
    // Try to extract name (usually first line)
    const fullName = lines[0]?.trim() || 'Your Name';
    
    // Extract email
    const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    const email = emailMatch ? emailMatch[0] : 'email@example.com';
    
    // Extract phone
    const phoneMatch = text.match(/(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}[-.\s]?\d{1,14})/);
    const phone = phoneMatch ? phoneMatch[0] : '';
    
    // Extract sections
    const extractSection = (keywords) => {
      const startIdx = text.toLowerCase().search(new RegExp(keywords.join('|')));
      if (startIdx === -1) return '';
      
      const nextSectionIdx = text.toLowerCase().search(/\n(experience|education|skills|summary|objective|work)/i);
      const endIdx = nextSectionIdx === -1 ? text.length : nextSectionIdx;
      
      return text.substring(startIdx, Math.min(endIdx, startIdx + 500)).trim();
    };
    
    return {
      fullName,
      email,
      phone,
      summary: extractSection(['objective', 'summary', 'professional']),
      skills: extractSection(['skills', 'technical']),
      experience: extractSection(['experience', 'work', 'employment']),
      education: extractSection(['education', 'degree', 'university']),
    };
  };

  return (
    <div className="form-container">
      <h2>Step 1: Upload Your Resume</h2>
      
      <div className="upload-section">
        <div className="upload-area">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.md"
            id="resume-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="resume-upload" className="upload-label">
            <div className="upload-icon">📄</div>
            <div className="upload-text">
              {file ? `Selected: ${file.name}` : 'Click to select or drag resume file'}
            </div>
            <div className="upload-hint">(PDF, Word, or Text)</div>
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        {file && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="upload-button"
          >
            {loading ? 'Processing...' : 'Upload & Extract'}
          </button>
        )}

        <div className="divider">— OR —</div>

        <button
          type="button"
          onClick={onSkip}
          className="skip-button"
        >
          Skip Upload & Fill Manually
        </button>
      </div>
    </div>
  );
}
