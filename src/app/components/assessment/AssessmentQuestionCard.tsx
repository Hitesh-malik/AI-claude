// File: src/app/components/AssessmentQuestionCard.tsx

'use client';

import { Question } from '@/app/lib/assessment-service';
import { useState } from 'react';

interface AssessmentQuestionCardProps {
  question: Question; 
  onAnswer: (answerIndex: number) => void;
  currentNumber: number;
  totalQuestions: number;
}

export default function AssessmentQuestionCard({ 
  question, 
  onAnswer, 
  currentNumber,
  totalQuestions
}: AssessmentQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };
  
  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted) {
      setIsSubmitted(true);
      onAnswer(selectedAnswer);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentNumber} of {totalQuestions}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      
      <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div 
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedAnswer === index 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-gray-700">{option}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null || isSubmitted}
        className={`w-full py-2 rounded-md font-medium ${
          isSubmitted 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : selectedAnswer === null 
              ? 'bg-blue-300 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitted ? 'Submitted' : 'Submit Answer'}
      </button>
    </div>
  );
}