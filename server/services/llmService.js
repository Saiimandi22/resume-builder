import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const anthropicClient = new Anthropic();
const googleClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const LLM_PROVIDER = process.env.LLM_PROVIDER || 'claude';

// Claude fine-tuning
async function fineTuneWithClaude(resume, jobDescription) {
  const prompt = `You are an expert resume writer and recruiter. Your task is to fine-tune the given resume to match the job description as closely as possible.

IMPORTANT INSTRUCTIONS:
1. Keep the resume structure and formatting similar
2. Highlight relevant skills and experience that match the job description
3. Reword bullet points to use keywords from the job description
4. Focus on accomplishments that align with the job requirements
5. Do NOT make up experience that doesn't exist
6. Keep the same length and professionalism level
7. Return ONLY the refined resume JSON, no explanations

Current Resume:
${typeof resume === 'string' ? resume : JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Return the fine-tuned resume in the same JSON format as the input, with refined content.`;

  try {
    const message = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error with Claude:', error);
    throw new Error(`Claude fine-tuning failed: ${error.message}`);
  }
}

// Google Gemini fine-tuning
async function fineTuneWithGoogle(resume, jobDescription) {
  const prompt = `You are an expert resume writer and recruiter. Your task is to fine-tune the given resume to match the job description as closely as possible.

IMPORTANT INSTRUCTIONS:
1. Keep the resume structure and formatting similar
2. Highlight relevant skills and experience that match the job description
3. Reword bullet points to use keywords from the job description
4. Focus on accomplishments that align with the job requirements
5. Do NOT make up experience that doesn't exist
6. Keep the same length and professionalism level
7. Return ONLY the refined resume JSON, no explanations

Current Resume:
${typeof resume === 'string' ? resume : JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Return the fine-tuned resume in the same JSON format as the input, with refined content.`;

  try {
    const model = googleClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error with Google Gemini:', error);
    throw new Error(`Google fine-tuning failed: ${error.message}`);
  }
}

// Claude job analysis
async function analyzeJobDescriptionWithClaude(jobDescription) {
  const prompt = `Analyze the following job description and extract key information:
1. Required skills (technical and soft skills)
2. Key responsibilities
3. Experience level required
4. Industry focus
5. Top 5 most important keywords

Job Description:
${jobDescription}

Provide a structured analysis.`;

  try {
    const message = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Error with Claude:', error);
    throw new Error(`Claude analysis failed: ${error.message}`);
  }
}

// Google Gemini job analysis
async function analyzeJobDescriptionWithGoogle(jobDescription) {
  const prompt = `Analyze the following job description and extract key information:
1. Required skills (technical and soft skills)
2. Key responsibilities
3. Experience level required
4. Industry focus
5. Top 5 most important keywords

Job Description:
${jobDescription}

Provide a structured analysis.`;

  try {
    const model = googleClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error with Google Gemini:', error);
    throw new Error(`Google analysis failed: ${error.message}`);
  }
}

// Main functions that route to the correct provider
export async function fineTuneResume(resume, jobDescription) {
  if (LLM_PROVIDER === 'google') {
    return fineTuneWithGoogle(resume, jobDescription);
  }
  return fineTuneWithClaude(resume, jobDescription);
}

export async function analyzeJobDescription(jobDescription) {
  if (LLM_PROVIDER === 'google') {
    return analyzeJobDescriptionWithGoogle(jobDescription);
  }
  return analyzeJobDescriptionWithClaude(jobDescription);
}

export function getLLMProvider() {
  return LLM_PROVIDER;
}
