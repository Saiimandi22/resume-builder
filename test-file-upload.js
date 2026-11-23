#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_URL = 'http://localhost:5000';

console.log('🧪 Resume File Upload Test Suite\n');

async function testFileUploadWithMultipart() {
  console.log('📁 Test 1: Text File Upload via Multipart');
  return new Promise((resolve) => {
    try {
      const testFile = path.join(__dirname, 'data/test-resume.txt');
      
      if (!fs.existsSync(testFile)) {
        console.log('❌ Test file not found');
        resolve(false);
        return;
      }

      const fileData = fs.readFileSync(testFile);
      const boundary = '----FormBoundary' + Date.now();
      
      const body = Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test-resume.txt"\r\nContent-Type: text/plain\r\n\r\n`),
        fileData,
        Buffer.from(`\r\n--${boundary}--\r\n`),
      ]);

      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/resume/parse',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length,
        },
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.success && response.parsedData) {
              console.log('✅ File uploaded and parsed successfully');
              console.log(`   - Name: ${response.parsedData.fullName}`);
              console.log(`   - Email: ${response.parsedData.email}`);
              console.log(`   - Has Skills: ${!!response.parsedData.skills}`);
              resolve(true);
            } else {
              console.log('❌ Parse failed:', response.error);
              resolve(false);
            }
          } catch (e) {
            console.log('❌ Invalid response:', e.message);
            resolve(false);
          }
        });
      });

      req.on('error', (error) => {
        console.log('❌ Upload failed:', error.message);
        resolve(false);
      });

      req.write(body);
      req.end();
    } catch (error) {
      console.log('❌ Error:', error.message);
      resolve(false);
    }
  });
}

async function testHealthEndpoint() {
  console.log('\n📊 Test 2: Server Health Check');
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.status === 'ok') {
            console.log('✅ Server is healthy');
            console.log(`   - LLM Provider: ${response.llmProvider}`);
            resolve(true);
          } else {
            console.log('❌ Server health check failed');
            resolve(false);
          }
        } catch (e) {
          console.log('❌ Invalid response:', e.message);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Health check failed:', error.message);
      resolve(false);
    });

    req.end();
  });
}

async function testConfigEndpoint() {
  console.log('\n⚙️  Test 3: Configuration Endpoint');
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/config',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ Config retrieved');
          console.log(`   - Current Provider: ${response.llmProvider}`);
          console.log(`   - Supported: ${response.supportedProviders.join(', ')}`);
          resolve(true);
        } catch (e) {
          console.log('❌ Invalid response:', e.message);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Config check failed:', error.message);
      resolve(false);
    });

    req.end();
  });
}

async function runTests() {
  const results = [];

  results.push(await testHealthEndpoint());
  results.push(await testConfigEndpoint());
  results.push(await testFileUploadWithMultipart());

  console.log('\n' + '='.repeat(50));
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  if (passed === total) {
    console.log(`✅ All tests passed (${passed}/${total})`);
    process.exit(0);
  } else {
    console.log(`⚠️  Partial success (${passed}/${total} passed)`);
    process.exit(passed === total ? 0 : 1);
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
