import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function fineTuneResume(resume, jobDescription) {
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
    const message = await client.messages.create({
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
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(`Failed to fine-tune resume: ${error.message}`);
  }
}

export async function analyzeJobDescription(jobDescription) {
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
    const message = await client.messages.create({
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
    console.error('Error analyzing job description:', error);
    throw new Error(`Failed to analyze job description: ${error.message}`);
  }
}
