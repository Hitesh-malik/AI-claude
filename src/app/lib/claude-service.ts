/**
 * Service for interacting with Claude API via the local API route
 */

export type ClaudeRequestOptions = {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
};

export type ClaudeResponse = {
  result: string | null;
  error?: string;
};

/**
 * Generates a learning path using Anthropic's Claude API
 * @param options Request options for the Claude API
 * @returns A promise that resolves to the Claude response
 */
export async function generateLearningPath({
  prompt,
  maxTokens = 1500,
  temperature = 0.7,
  systemPrompt = "You are a learning path advisor that helps users create personalized learning paths based on their interests, goals, and current skill level."
}: ClaudeRequestOptions): Promise<ClaudeResponse> {
  try {
    console.log('Generating learning path with Claude...');
    
    // Format the prompt for learning path generation
    const formattedPrompt = formatLearningPathPrompt(prompt);
    console.log('Formatted prompt:', formattedPrompt);
    // Make sure we're calling the correct API route
    const response = await fetch('/api/generate-path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: formattedPrompt,
        maxTokens,
        temperature,
        systemPrompt
      }),
    });

    console.log('API response status:', response.status,response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to generate learning path: ${response.status}`);
    }

    const data = await response.json();
    console.log('Learning path generated successfully');
    
    return {
      result: data.result
    };
  } catch (error: any) {
    console.error('Error generating learning path:', error);
    return {
      result: null,
      error: error.message
    };
  }
}

/**
 * Formats the user input into a structured prompt for better learning path generation
 * @param userInput The raw user input
 * @returns A formatted prompt
 */
function formatLearningPathPrompt(userInput: string): string {
  return `Based on the following information, create a detailed personalized learning path:
  
User input: ${userInput}

The learning path should include:
1. Key topics to learn in a logical sequence
2. Recommended resources for each topic (books, courses, websites)
3. Estimated time to complete each section
4. Milestones to track progress
5. Projects to reinforce learning

Format the learning path with clear headings, bullet points, and structured sections to make it easy to follow. Use markdown formatting.`;
}