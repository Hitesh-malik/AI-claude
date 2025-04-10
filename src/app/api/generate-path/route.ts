// src/app/api/generate-path/route.ts
import { NextResponse } from 'next/server';

// Define the response type
type LearningPathResponse = {
  result?: string;
  error?: string;
};

export async function POST(request: Request): Promise<NextResponse<LearningPathResponse>> {
  console.log("Claude API route called");
  try {
    // Parse the request body
    const body = await request.json();
    const {
      prompt,
      maxTokens = 1500,
      temperature = 0.7,
      systemPrompt = "You are a learning path advisor that helps users create personalized learning paths based on their interests, goals, and current skill level."
    } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Anthropic API key is not configured");
      return NextResponse.json(
        { error: 'API key configuration error' },
        { status: 500 }
      );
    }

    console.log(`Calling Claude API, maxTokens: ${maxTokens}`);
    
    // Call Claude API - NOTE THE CORRECTED FORMAT:
    // - system is a top-level parameter
    // - messages only contains user/assistant roles
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt, // System prompt is a top-level parameter
        messages: [
          { role: "user", content: prompt } // Only user message in the array
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log completion
    console.log("Claude API call completed successfully");

    // Return the response
    return NextResponse.json({
      result: data.content[0].text
    });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    
    // Return appropriate error responses based on error type
    if (error.message?.includes('429')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    } else if (error.message?.includes('401')) {
      return NextResponse.json(
        { error: 'Authentication error. Check your API key.' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Something went wrong while generating the learning path' },
      { status: 500 }
    );
  }
}