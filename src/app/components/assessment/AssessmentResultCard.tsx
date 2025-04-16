// File: src/app/components/AssessmentResultCard.tsx

'use client';

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

export default function AssessmentResultCard({ result }: { result: AssessmentResult }) {
  const { skillLevel, score, correctAnswers, totalQuestions } = result;
  
  const skillLevelColors = {
    'beginner': 'bg-blue-100 text-blue-800',
    'intermediate': 'bg-green-100 text-green-800',
    'advanced': 'bg-purple-100 text-purple-800',
    'expert': 'bg-orange-100 text-orange-800',
    'needs practice': 'bg-red-100 text-red-800'
  };
  
  const skillLevelColor = skillLevelColors[skillLevel];
  
  const getSkillLevelDescription = (level: string) => {
    switch (level) {
      case 'beginner':
        return "You're starting your journey. Focus on the fundamentals.";
      case 'intermediate':
        return "You've grasped the basics and are ready for more complex concepts.";
      case 'advanced':
        return "You have a strong understanding of the subject. Keep deepening your knowledge.";
      case 'expert':
        return "Excellent! You have mastered this topic very well.";
      case 'needs practice':
        return "You should revisit the basics of this topic for a better foundation.";
      default:
        return "";
    }
  };
  
  return (
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
          
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${skillLevelColor} mb-2`}>
            {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}
          </span>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete</h2>
          
          <p className="text-gray-600 text-center max-w-sm">
            {getSkillLevelDescription(skillLevel)}
          </p>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50">
        <h3 className="font-medium text-gray-700 mb-3">Performance Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Correct Answers:</span>
            <span className="font-medium">{correctAnswers} of {totalQuestions}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Score:</span>
            <span className="font-medium">{score}%</span>
          </div>
        </div>
      </div>
      
      {result.recommendedResources && result.recommendedResources.length > 0 && (
        <div className="px-6 py-4 border-t">
          <h3 className="font-medium text-gray-700 mb-3">Recommended Resources</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {result.recommendedResources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}