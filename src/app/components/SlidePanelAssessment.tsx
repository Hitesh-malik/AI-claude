'use client';

import { useState, useEffect } from 'react';
import { Question } from '../lib/assessment-service';

// SlidePanelAssessment component that opens on the right side
export function SlidePanelAssessment({ 
  isOpen, 
  onClose, 
  topic, 
  subtopic 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  topic: string; 
  subtopic?: string;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Fetch questions when the panel opens
  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen, topic, subtopic]);
  
  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setCompleted(false);
    }
  }, [isOpen]);
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/assessment/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          subtopic,
          count: 10, // Get exactly 10 questions
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load questions: ${response.status}`);
      }
      
      const data = await response.json();
      setQuestions(data.questions.slice(0, 10)); // Ensure we have exactly 10
      setLoading(false);
    } catch (error: any) {
      console.error('Error loading questions:', error);
      setError('Failed to load assessment questions. Please try again.');
      setLoading(false);
    }
  };
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const completeAssessment = () => {
    // Calculate score
    const correctAnswers = questions.filter((q, index) => 
      userAnswers[index] === q.correctAnswer
    ).length;
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(percentage);
    setCompleted(true);
  };
  
  // Determine if all questions have been answered
  const allQuestionsAnswered = userAnswers.length === questions.length && 
    userAnswers.every(answer => answer !== undefined);
  
  // Get current question if available
  const currentQuestion = questions[currentQuestionIndex];
  
  // Generate skill level based on score
  const getSkillLevel = () => {
    if (score >= 90) return 'Expert';
    if (score >= 75) return 'Advanced';
    if (score >= 60) return 'Intermediate';
    if (score >= 40) return 'Beginner';
    return 'Needs Practice';
  };
  
  // Determine skill level color class
  const getSkillLevelColorClass = () => {
    const level = getSkillLevel().toLowerCase();
    
    switch (level) {
      case 'expert':
        return 'bg-orange-100 text-orange-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'needs practice':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } overflow-y-auto`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {topic} Assessment
            {subtopic && ` - ${subtopic}`}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close assessment panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading assessment questions...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
            <h3 className="font-medium mb-2">Error</h3>
            <p>{error}</p>
            <button
              onClick={fetchQuestions}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && !completed && currentQuestion && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex space-x-1">
                {questions.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 w-8 rounded ${
                      idx === currentQuestionIndex 
                        ? 'bg-blue-600' 
                        : userAnswers[idx] !== undefined 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {currentQuestion.text}
              </h3>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      userAnswers[currentQuestionIndex] === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        userAnswers[currentQuestionIndex] === index 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {userAnswers[currentQuestionIndex] === index && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={goToNextQuestion}
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                    className={`px-4 py-2 rounded-md font-medium ${
                      userAnswers[currentQuestionIndex] === undefined
                        ? 'bg-blue-300 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={completeAssessment}
                    disabled={!allQuestionsAnswered}
                    className={`px-4 py-2 rounded-md font-medium ${
                      !allQuestionsAnswered
                        ? 'bg-green-300 text-white cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Complete Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {completed && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8 border-b">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E6E6E6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="3"
                      strokeDasharray={`${score}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold">{score}%</span>
                  </div>
                </div>
                
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getSkillLevelColorClass()} mb-2`}>
                  {getSkillLevel()}
                </span>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete</h2>
                
                <p className="text-gray-600 text-center max-w-sm">
                  You answered {questions.filter((q, index) => userAnswers[index] === q.correctAnswer).length} out of {questions.length} questions correctly.
                </p>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <h3 className="font-medium text-gray-700 mb-3">Question Review</h3>
              
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const isCorrect = userAnswers[index] === question.correctAnswer;
                  
                  return (
                    <div key={index} className={`p-3 border rounded-md ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <p className="font-medium mb-2">{index + 1}. {question.text}</p>
                      <div className="ml-4 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className={`flex items-center ${
                            optIndex === question.correctAnswer
                              ? 'text-green-700 font-medium'
                              : optIndex === userAnswers[index] && optIndex !== question.correctAnswer
                                ? 'text-red-700 line-through'
                                : 'text-gray-700'
                          }`}>
                            {optIndex === question.correctAnswer && (
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                            {optIndex === userAnswers[index] && optIndex !== question.correctAnswer && (
                              <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            )}
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// AssessmentButton component that triggers the side panel
export function AssessmentButton({ 
  topic, 
  subtopic 
}: { 
  topic: string; 
  subtopic?: string;
}) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  
  const openAssessment = () => {
    setIsAssessmentOpen(true);
  };
  
  const closeAssessment = () => {
    setIsAssessmentOpen(false);
  };
  
  return (
    <>
      <button
        onClick={openAssessment}
        className="inline-block px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
      >
        Test Your Knowledge
      </button>
      
      <SlidePanelAssessment
        isOpen={isAssessmentOpen}
        onClose={closeAssessment}
        topic={topic}
        subtopic={subtopic}
      />
    </>
  );
}