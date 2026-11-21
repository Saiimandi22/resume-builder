import { useState } from 'react';
import '../styles/components.css';

export default function JobDescriptionForm({ onSubmit, loading, onBack }) {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    onSubmit(jobDescription);
  };

  return (
    <div className="form-container">
      <h2>Step 2: Job Description</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="jobDesc">Job Description *</label>
          <textarea
            id="jobDesc"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here. Include responsibilities, required skills, qualifications, etc..."
            rows="12"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
            disabled={loading}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Fine-tune My Resume'}
          </button>
        </div>
      </form>
    </div>
  );
}
