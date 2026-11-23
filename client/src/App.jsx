import { useState } from 'react';
import axios from 'axios';
import ResumeUpload from './components/ResumeUpload';
import ResumeForm from './components/ResumeForm';
import JobDescriptionForm from './components/JobDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import './styles/app.css';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('upload'); // 'upload', 'resume', 'job', 'results'

  const handleResumeUpload = (resumeData) => {
    // Parse resume data into the format we need
    const formattedResume = {
      name: resumeData.fullName || 'Your Name',
      email: resumeData.email || 'email@example.com',
      phone: resumeData.phone || '',
      summary: resumeData.summary || '',
      skills: resumeData.skills || '',
      experience: resumeData.experience || '',
      education: resumeData.education || '',
    };
    setResume(formattedResume);
    setStep('job');
    setError(null);
  };

  const handleResumeFormSubmit = (resumeData) => {
    // Convert form data to expected format
    const formattedResume = {
      name: resumeData.fullName,
      email: resumeData.email,
      phone: resumeData.phone || '',
      summary: resumeData.summary,
      skills: resumeData.skills,
      experience: resumeData.experience,
      education: resumeData.education,
    };
    setResume(formattedResume);
    setStep('job');
    setError(null);
  };

  const handleJobSubmit = async (jobDesc) => {
    setJobDescription(jobDesc);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/jobs/fine-tune', {
        resume,
        jobDescription: jobDesc,
      });

      setResults(response.data);
      setStep('results');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fine-tune resume');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResume(null);
    setJobDescription('');
    setResults(null);
    setError(null);
    setStep('upload');
  };

  const handleBackToUpload = () => {
    setResume(null);
    setStep('upload');
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Resume Fine-Tuner</h1>
        <p>Upload your resume and job description to get AI-powered suggestions</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {step === 'upload' && (
          <ResumeUpload
            onSubmit={handleResumeUpload}
            onSkip={() => setStep('resume')}
          />
        )}

        {step === 'resume' && (
          <ResumeForm onSubmit={handleResumeFormSubmit} />
        )}

        {step === 'job' && (
          <JobDescriptionForm
            onSubmit={handleJobSubmit}
            loading={loading}
            onBack={handleBackToUpload}
          />
        )}

        {step === 'results' && results && (
          <ResultsDisplay
            results={results}
            jobDescription={jobDescription}
            onNewApplication={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
