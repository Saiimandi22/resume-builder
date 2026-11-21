import { useState } from 'react';
import '../styles/components.css';

export default function ResultsDisplay({ results, jobDescription, onNewApplication }) {
  const [viewMode, setViewMode] = useState('split'); // 'split', 'original', 'tuned'

  const renderResume = (resume) => {
    return (
      <div className="resume-content">
        <h3>{resume.fullName}</h3>
        <p className="contact-info">
          {resume.email}
          {resume.phone && ` | ${resume.phone}`}
        </p>

        {resume.summary && (
          <section>
            <h4>Professional Summary</h4>
            <p>{resume.summary}</p>
          </section>
        )}

        {resume.skills && (
          <section>
            <h4>Skills</h4>
            <p>{resume.skills}</p>
          </section>
        )}

        {resume.experience && (
          <section>
            <h4>Experience</h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.experience}</p>
          </section>
        )}

        {resume.education && (
          <section>
            <h4>Education</h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.education}</p>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="results-container">
      <h2>Fine-Tuning Results</h2>

      <div className="view-mode-selector">
        <button
          className={`mode-btn ${viewMode === 'split' ? 'active' : ''}`}
          onClick={() => setViewMode('split')}
        >
          Split View
        </button>
        <button
          className={`mode-btn ${viewMode === 'original' ? 'active' : ''}`}
          onClick={() => setViewMode('original')}
        >
          Original
        </button>
        <button
          className={`mode-btn ${viewMode === 'tuned' ? 'active' : ''}`}
          onClick={() => setViewMode('tuned')}
        >
          Fine-tuned
        </button>
      </div>

      {viewMode === 'split' ? (
        <div className="split-view">
          <div className="resume-panel">
            <h3 className="panel-title">Original Resume</h3>
            {renderResume(results.originalResume)}
          </div>
          <div className="resume-panel">
            <h3 className="panel-title">Fine-tuned Resume</h3>
            {renderResume(results.fineTunedResume)}
          </div>
        </div>
      ) : viewMode === 'original' ? (
        <div className="resume-panel full-width">
          <h3 className="panel-title">Original Resume</h3>
          {renderResume(results.originalResume)}
        </div>
      ) : (
        <div className="resume-panel full-width">
          <h3 className="panel-title">Fine-tuned Resume</h3>
          {renderResume(results.fineTunedResume)}
        </div>
      )}

      <div className="job-description-section">
        <h3>Referenced Job Description</h3>
        <div className="job-description-content">{jobDescription}</div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Results
        </button>
        <button className="btn btn-secondary" onClick={onNewApplication}>
          New Application
        </button>
      </div>
    </div>
  );
}
