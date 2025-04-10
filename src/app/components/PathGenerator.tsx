'use client';

import { useState, FormEvent } from 'react';
import { generateLearningPath } from '../lib/claude-service';
import ProgressBar from './ProgressBar';
import ResultDisplay from './ResultDisplay';

export default function PathGenerator() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerationComplete, setIsGenerationComplete] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please describe your learning goals and current skill level.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    setIsGenerationComplete(false);
    
    try {
      const response = await generateLearningPath({ prompt: userInput });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setResult(response.result);
      setIsGenerationComplete(true);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate learning path. Please try again.';
      
      // Check for API limit errors
      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setResult(null);
    setError(null);
    setIsGenerationComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Claude Learning Path Generator</h1>
      
      {!isGenerationComplete && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your learning goals, current skill level, and interests:
            </label>
            <textarea
              id="userInput"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Example: I want to learn machine learning. I have a background in Python programming but no experience with statistics or data science. I'm interested in computer vision applications and want to build a project that can recognize objects in images."
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Learning Path'}
            </button>
          </div>
        </form>
      )}
      
      {loading && (
        <div className="mt-8 space-y-2">
          <p className="text-center text-gray-600">Generating your personalized learning path with Claude AI...</p>
          <ProgressBar />
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <button 
            onClick={handleReset}
            className="mt-2 text-sm text-purple-600 hover:text-purple-800"
          >
            Try again
          </button>
        </div>
      )}
      
      {result && isGenerationComplete && (
        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleReset}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Generate another path
            </button>
          </div>
          <ResultDisplay content={result} title="Your Personalized Learning Path" />
        </div>
      )}
    </div>
  );
}