#!/usr/bin/env node

/**
 * Quick test script to validate the Resume Fine-Tuner setup
 * Tests API endpoints and basic functionality
 */

import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testResume = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  summary:
    'Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable applications.',
  skills:
    'JavaScript, React, Node.js, Python, SQL, Docker, AWS, Git, REST APIs',
  experience: `Senior Developer at Tech Corp (2021-Present)
  - Led development of microservices architecture
  - Mentored junior developers
  
Developer at StartUp Inc (2019-2021)
  - Built React-based dashboard
  - Implemented CI/CD pipelines`,
  education:
    'BS in Computer Science, State University (2019)\nCS Bootcamp Certification (2018)',
};

const testJobDescription = `We are looking for a Senior Full Stack Developer with expertise in JavaScript and cloud technologies.

Requirements:
- 5+ years of software development experience
- Strong proficiency in React and Node.js
- AWS or similar cloud platform experience
- Experience with Docker and Kubernetes
- Solid understanding of system design and scalability
- Excellent communication skills

Responsibilities:
- Design and implement scalable web applications
- Mentor and lead development teams
- Collaborate with product and design teams
- Implement best practices for performance and security
- Participate in code reviews and architecture discussions

Nice to have:
- Open source contributions
- Experience with GraphQL
- Knowledge of machine learning basics`;

async function runTests() {
  console.log('🚀 Resume Fine-Tuner API Test Suite\n');

  try {
    // Test 1: Health check
    console.log('📋 Test 1: Health Check');
    const healthRes = await axios.get(`${API_BASE.replace('/api', '')}/api/health`);
    console.log('✅ Server is running:', healthRes.data);

    // Test 2: Fine-tune resume
    console.log('\n📋 Test 2: Fine-tune Resume');
    console.log('Sending resume and job description to fine-tuning API...');
    const finetuneRes = await axios.post(`${API_BASE}/jobs/fine-tune`, {
      resume: testResume,
      jobDescription: testJobDescription,
    });

    if (finetuneRes.data.success) {
      console.log('✅ Fine-tuning successful!');
      console.log('   Application ID:', finetuneRes.data.applicationId);
      console.log('   Original resume skills:', testResume.skills);
      console.log('   Fine-tuned summary preview:',
        finetuneRes.data.fineTunedResume.summary?.substring(0, 100) + '...');

      // Test 3: Retrieve application
      console.log('\n📋 Test 3: Retrieve Application');
      const appId = finetuneRes.data.applicationId;
      const appRes = await axios.get(`${API_BASE}/jobs/application/${appId}`);
      console.log('✅ Application retrieved successfully');
      console.log('   ID:', appRes.data.id);
      console.log('   Created:', new Date(appRes.data.createdAt).toLocaleString());
    }

    // Test 4: Save and retrieve resume
    console.log('\n📋 Test 4: Save Resume');
    const saveRes = await axios.post(`${API_BASE}/resume/create`, {
      resume: testResume,
    });
    if (saveRes.data.success) {
      console.log('✅ Resume saved successfully');
      console.log('   Resume ID:', saveRes.data.resumeId);

      const getRes = await axios.get(`${API_BASE}/resume/${saveRes.data.resumeId}`);
      console.log('✅ Resume retrieved successfully');
      console.log('   Name:', getRes.data.fullName);
      console.log('   Email:', getRes.data.email);
    }

    // Test 5: List resumes
    console.log('\n📋 Test 5: List Resumes');
    const listRes = await axios.get(`${API_BASE}/resume`);
    console.log('✅ Resumes listed successfully');
    console.log('   Total resumes:', listRes.data.resumes.length);

    console.log('\n✨ All tests passed! Your API is working correctly.\n');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Check if server is running
axios
  .get(`${API_BASE.replace('/api', '')}/api/health`)
  .then(() => runTests())
  .catch(() => {
    console.error('❌ Error: Server is not running on http://localhost:5000');
    console.error('Please start the server first:');
    console.error('  npm run dev');
    process.exit(1);
  });
