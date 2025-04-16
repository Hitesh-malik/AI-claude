// File: src/app/components/AssessmentButton.tsx

'use client';

import Link from 'next/link';

// Assessment Button Component - Used to start an assessment from a learning path
export default function AssessmentButton({ topic, subtopic }: { topic: string, subtopic?: string }) {
  return (
    <Link 
      href={`/assessment?topic=${encodeURIComponent(topic)}${subtopic ? `&subtopic=${encodeURIComponent(subtopic)}` : ''}`}
      className="inline-block px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
    >
      Test Your Knowledge
    </Link>
  );
}