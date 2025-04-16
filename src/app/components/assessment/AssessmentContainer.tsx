// File: src/app/components/AssessmentContainer.tsx

'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/app/lib/assessment-service';
import AssessmentQuestionCard from './AssessmentQuestionCard';
import AssessmentResultCard from './AssessmentResultCard';

interface AssessmentResult {
  assessmentId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'needs practice';
  answeredQuestions: {
    questionId: string;
    userAnswer: number;
    isCorrect: boolean;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
  recommendedResources?: string[];
}

export default function AssessmentContainer({ topic, subtopic }: { topic: string, subtopic?: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    questionId: string;
    userAnswer: number;
    isCorrect: boolean;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MAX_QUESTIONS = 5;
  
  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        
        const response = await fetch('/api/assessment/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            subtopic,
            count: 15, // Generate extra for adaptive selection
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load questions: ${response.status}`);
        }
        
        const data = await response.json();
        setQuestions(data.questions);
        
        // Select the first question (beginner level)
        const beginnerQuestions = data.questions.filter(
          (q: Question) => q.difficulty === 'beginner'
        );
        
        if (beginnerQuestions.length > 0) {
          setCurrentQuestion(beginnerQuestions[0]);
        } else if (data.questions.length > 0) {
          setCurrentQuestion(data.questions[0]);
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error('Error loading questions:', error);
        setError('Failed to load assessment questions. Please try again.');
        setLoading(false);
      }
    }
    
    loadQuestions();
  }, [topic, subtopic]);
  
  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    const answeredQuestion = {
      questionId: currentQuestion.id,
      userAnswer: answerIndex,
      isCorrect,
      difficulty: currentQuestion.difficulty
    };
    
    const updatedAnsweredQuestions = [...answeredQuestions, answeredQuestion];
    setAnsweredQuestions(updatedAnsweredQuestions);
    
    if (updatedAnsweredQuestions.length >= MAX_QUESTIONS) {
      // Assessment is complete, calculate results
      completeAssessment(updatedAnsweredQuestions);
    } else {
      // Move to next question
      selectNextQuestion(updatedAnsweredQuestions);
    }
  };
  
  const selectNextQuestion = (answered: typeof answeredQuestions) => {
    // Determine current difficulty
    const currentDifficulty = currentQuestion?.difficulty || 'beginner';
    
    // Check the last two answers to potentially adjust difficulty
    let nextDifficulty: 'beginner' | 'intermediate' | 'advanced' = currentDifficulty;
    
    if (answered.length >= 2) {
      const lastTwoQuestions = answered.slice(-2);
      const allCorrect = lastTwoQuestions.every(q => q.isCorrect);
      const allWrong = lastTwoQuestions.every(q => !q.isCorrect);
      
      if (allCorrect && currentDifficulty !== 'advanced') {
        // Increase difficulty if last two answers were correct
        nextDifficulty = currentDifficulty === 'beginner' ? 'intermediate' : 'advanced';
      } else if (allWrong && currentDifficulty !== 'beginner') {
        // Decrease difficulty if last two answers were wrong
        nextDifficulty = currentDifficulty === 'advanced' ? 'intermediate' : 'beginner';
      }
    }
    
    // Filter out answered questions
    const answeredIds = answered.map(q => q.questionId);
    const remainingQuestions = questions.filter(q => !answeredIds.includes(q.id));
    
    // Filter by next difficulty level
    const candidateQuestions = remainingQuestions.filter(q => q.difficulty === nextDifficulty);
    
    let nextQuestion;
    
    if (candidateQuestions.length > 0) {
      // Randomly select a question from the right difficulty
      nextQuestion = candidateQuestions[Math.floor(Math.random() * candidateQuestions.length)];
    } else if (remainingQuestions.length > 0) {
      // Fallback to any remaining question
      nextQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    }
    
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // No more questions available
      completeAssessment(answered);
    }
  };
  
  const completeAssessment = (answered: typeof answeredQuestions) => {
    const correctAnswers = answered.filter(q => q.isCorrect).length;
    const score = Math.round((correctAnswers / answered.length) * 100);
    
    // Determine skill level
    let skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'needs practice';
    
    // Count correct answers by difficulty
    const correctByDifficulty = {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    };
    
    answered.forEach(q => {
      if (q.isCorrect) {
        correctByDifficulty[q.difficulty as keyof typeof correctByDifficulty]++;
      }
    });
    
    // Calculate skill level
    if (score >= 90 && correctByDifficulty.advanced >= 2) {
      skillLevel = 'expert';
    } else if (score >= 70 && correctByDifficulty.advanced >= 1) {
      skillLevel = 'advanced';
    } else if (score >= 60 && correctByDifficulty.intermediate >= 2) {
      skillLevel = 'intermediate';
    } else if (score >= 40) {
      skillLevel = 'beginner';
    } else {
      skillLevel = 'needs practice';
    }
    
// Generate appropriate resources based on skill level
const recommendedResources = getRecommendedResources(topic, skillLevel);
    
const assessmentResult: AssessmentResult = {
  assessmentId: `${topic}-${Date.now()}`,
  score,
  correctAnswers,
  totalQuestions: answered.length,
  skillLevel,
  answeredQuestions: answered,
  recommendedResources
};

setResult(assessmentResult);
setIsComplete(true);
};

const getRecommendedResources = (topic: string, level: string) => {
// This would ideally come from a database or API
// For now, just return some mock recommendations
switch (level) {
  case 'beginner':
    return [
      `"${topic} for Beginners" - Online course`,
      `"Introduction to ${topic}" - Tutorial`,
      `"${topic} Fundamentals" - Interactive practice`
    ];
  case 'intermediate':
    return [
      `"Practical ${topic}" - Project-based learning`,
      `"${topic} Deep Dive" - Advanced tutorial`,
      `"Real-world ${topic}" - Case studies`
    ];
  case 'advanced':
  case 'expert':
    return [
      `"Mastering ${topic}" - Expert guide`,
      `"Advanced ${topic} Techniques" - Specialized course`,
      `"${topic} in Production" - Best practices`
    ];
  case 'needs practice':
    return [
      `"${topic} Basics Revisited" - Review course`,
      `"${topic} Practice Problems" - Exercise set`,
      `"${topic} Step by Step" - Guided learning`
    ];
  default:
    return [];
}
};

if (loading) {
return (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-gray-600">Loading assessment questions...</p>
  </div>
);
}

if (error) {
return (
  <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
    <h3 className="font-medium mb-2">Error</h3>
    <p>{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Try Again
    </button>
  </div>
);
}

if (isComplete && result) {
return <AssessmentResultCard result={result} />;
}

return (
<div className="max-w-2xl mx-auto">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      {topic} Assessment
      {subtopic && ` - ${subtopic}`}
    </h2>
    <p className="text-gray-600">
      This assessment will test your knowledge of {topic}
      {subtopic && ` (${subtopic})`} with 5 questions.
      The difficulty will adapt based on your answers.
    </p>
  </div>
  
  {currentQuestion && (
    <AssessmentQuestionCard
      question={currentQuestion}
      onAnswer={handleAnswer}
      currentNumber={currentQuestionIndex + 1}
      totalQuestions={MAX_QUESTIONS}
    />
  )}
</div>
);
}