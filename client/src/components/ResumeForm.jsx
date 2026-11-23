import { useState } from 'react';
import axios from 'axios';
import '../styles/components.css';

export default function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('manual'); // 'manual' or 'file'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formDataFile = new FormData();
    formDataFile.append('file', file);

    try {
      const response = await axios.post('/api/resume/parse', formDataFile, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          ...response.data.parsedData,
        }));
        setUploadMethod('manual');
        alert('File uploaded and parsed successfully!');
      }
    } catch (error) {
      alert(`Error uploading file: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Step 1: Your Resume</h2>
      
      {/* Upload Method Selector */}
      <div className="upload-method-selector">
        <label>How would you like to provide your resume?</label>
        <div className="method-buttons">
          <button
            type="button"
            className={`method-btn ${uploadMethod === 'file' ? 'active' : ''}`}
            onClick={() => setUploadMethod('file')}
          >
            📁 Upload File (PDF, Word, Text)
          </button>
          <button
            type="button"
            className={`method-btn ${uploadMethod === 'manual' ? 'active' : ''}`}
            onClick={() => setUploadMethod('manual')}
          >
            ✏️ Type Manually
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      {uploadMethod === 'file' && (
        <div className="file-upload-section">
          <div className="file-input-wrapper">
            <label htmlFor="resumeFile" className="file-label">
              {loading ? '⏳ Processing file...' : '📄 Choose Resume File'}
            </label>
            <input
              id="resumeFile"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              disabled={loading}
              className="file-input"
            />
            <p className="file-help">Supported: PDF, Word (.doc, .docx), Plain Text</p>
          </div>
        </div>
      )}

      {/* Manual Entry Form */}
      {uploadMethod === 'manual' && (
        <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Professional Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief overview of your professional background and goals..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="List your skills separated by commas or one per line..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Work Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Your professional experience and accomplishments..."
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="education">Education</label>
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Your educational background..."
            rows="4"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Next: Add Job Description
        </button>
      </form>
      )}
    </div>
  );
}
