'use client';

import { useState } from 'react';
import { AssessmentButton } from './SlidePanelAssessment';
import { GraphicalRepresentationButton } from './GraphicalRepresentation';

interface ResultDisplayProps {
  content: string;
  title?: string;
  className?: string;
}

export default function ResultDisplay({
  content,
  title = 'Results',
  className = ''
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-white text-gray-700 rounded border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="p-6 overflow-auto">
        <div className="prose prose-blue max-w-none">
          {content.split('\n').map((line, i) => {
            // Handle headings with assessment buttons
            if (line.startsWith('# ')) {
              const headingText = line.slice(2);
              return (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 mt-6 mb-4">
                  <h1 className="text-2xl font-bold">{headingText}</h1>
                  <GraphicalRepresentationButton topic={headingText} content={content} />
                </div>
              );
            } else if (line.startsWith('## ')) {
              const headingText = line.slice(3);
              return (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 mt-5 mb-3">
                  <h2 className="text-xl font-bold">{headingText}</h2>
                  <AssessmentButton topic={findParentTopic(i, content) || headingText} subtopic={headingText} />
                </div>
              );
            } else if (line.startsWith('### ')) {
              const headingText = line.slice(4);
              return (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 mt-4 mb-2">
                  <h3 className="text-lg font-bold">{headingText}</h3>
                  <AssessmentButton topic={findParentTopic(i, content) || headingText} subtopic={headingText} />
                </div>
              );
            }
            
            // Handle bullet points
            else if (line.startsWith('- ') || line.startsWith('* ')) {
              return <li key={i} className="ml-4">{line.slice(2)}</li>;
            } else if (line.startsWith('  - ') || line.startsWith('  * ')) {
              return <li key={i} className="ml-8">{line.slice(4)}</li>;
            }
            
            // Handle numbered lists
            else if (/^\d+\.\s/.test(line)) {
              const content = line.replace(/^\d+\.\s/, '');
              return <li key={i} className="ml-4">{content}</li>;
            }
            
            // Handle empty lines
            else if (line.trim() === '') {
              return <br key={i} />;
            }
            
            // Regular paragraph
            else {
              return <p key={i} className="my-2">{line}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

// Helper function to find the parent topic for a subtopic
function findParentTopic(currentIndex: number, content: string): string | null {
  const lines = content.split('\n');
  
  // Look backward from the current line to find the nearest h1 heading
  for (let i = currentIndex - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.startsWith('# ')) {
      return line.slice(2);
    }
  }
  
  return null;
}