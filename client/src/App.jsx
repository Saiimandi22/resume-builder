import { useState } from 'react';
import axios from 'axios';
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
  const [step, setStep] = useState('resume'); // 'resume', 'job', 'results'

  const handleResumeSubmit = (resumeData) => {
    setResume(resumeData);
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
    setStep('resume');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Resume Fine-Tuner</h1>
        <p>Upload your resume and job description to get AI-powered suggestions</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {step === 'resume' && <ResumeForm onSubmit={handleResumeSubmit} />}

        {step === 'job' && (
          <JobDescriptionForm
            onSubmit={handleJobSubmit}
            loading={loading}
            onBack={() => setStep('resume')}
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
