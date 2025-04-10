'use client';

import { useState } from 'react';

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
          {/* Simple markdown renderer */}
          {content.split('\n').map((line, i) => {
            // Handle headings
            if (line.startsWith('# ')) {
              return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold mt-5 mb-3">{line.slice(3)}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(4)}</h3>;
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