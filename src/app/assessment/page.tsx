// File: src/app/assessment/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AssessmentContainer from '../components/assessment/AssessmentContainer';;

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<string | null>(null);
  const [subtopic, setSubtopic] = useState<string | null>(null);
  
  useEffect(() => {
    setTopic(searchParams.get('topic'));
    setSubtopic(searchParams.get('subtopic'));
  }, [searchParams]);
  
  if (!topic) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Assessment</h1>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-yellow-800">
            <p className="font-medium">No topic specified</p>
            <p className="mt-2">Please select a topic from your learning path to take an assessment.</p>
          </div>
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Learning Paths
        </Link>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <AssessmentContainer 
          topic={topic} 
          subtopic={subtopic || undefined} 
        />
      </div>
    </div>
  );
}