/**
 * Service for interacting with OpenAI API via the local API route
 */

export type OpenAIRequestOptions = {
    prompt: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  };
  
  export type OpenAIResponse = {
    result: string | null;
    error?: string;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
  
  /**
   * Generates a learning path using OpenAI's GPT models
   * @param options Request options for the OpenAI API
   * @returns A promise that resolves to the OpenAI response
   */
  export async function generateLearningPath({
    prompt,
    model = "gpt-3.5-turbo",
    maxTokens = 1500,
    temperature = 0.7,
    systemPrompt = "You are a learning path advisor that helps users create personalized learning paths based on their interests, goals, and current skill level."
  }: OpenAIRequestOptions): Promise<OpenAIResponse> {
    try {
      // Format the prompt for learning path generation
      const formattedPrompt = formatLearningPathPrompt(prompt);
      
      // Call our API route
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formattedPrompt,
          model,
          maxTokens,
          temperature,
          systemPrompt
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to generate learning path: ${response.status}`);
      }
  
      const data = await response.json();
      return {
        result: data.result,
        usage: data.usage
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
  
  Format the learning path with clear headings, bullet points, and structured sections to make it easy to follow.`;
  }