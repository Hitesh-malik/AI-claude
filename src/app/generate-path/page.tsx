// 'use client';

// import OpenAIPathGenerator from '../components/OpenAIPathGenerator';

// export default function GeneratePathPage() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900">OpenAI Learning Path Generator</h1>
//         <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
//           Create a personalized learning path with OpenAI's powerful language models. 
//           Describe your goals, current skills, and interests to get a tailored learning journey.
//         </p>
//       </div>
      
//       <OpenAIPathGenerator />
      
//       <div className="mt-12 text-sm text-gray-500 text-center max-w-2xl mx-auto">
//         <p>
//           This tool uses OpenAI's GPT models to generate personalized learning paths.
//           Results may vary and should be used as a starting point for your learning journey.
//         </p>
//       </div>
//     </div>
//   );
// }




'use client';

import PathGenerator from '../components/PathGenerator';

export default function GeneratePathPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Claude Learning Path Generator</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Create a personalized learning path with Anthropic's Claude AI. 
          Describe your goals, current skills, and interests to get a tailored learning journey.
        </p>
      </div>
      
      <PathGenerator />
      
      <div className="mt-12 text-sm text-gray-500 text-center max-w-2xl mx-auto">
        <p>
          This tool uses Claude AI to generate personalized learning paths.
          Results are formatted in markdown and should be used as a starting point for your learning journey.
        </p>
      </div>
    </div>
  );
}