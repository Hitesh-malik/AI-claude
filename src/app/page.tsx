// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">
//           Learning Path Advisor
//         </h1>
        
//         <p className="text-xl text-gray-600 mb-10">
//           Create personalized learning paths tailored to your goals, interests, and skill level.
//         </p>
        
//         <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-16">
//           <h2 className="text-2xl font-semibold mb-4">Generate with OpenAI</h2>
//           <p className="text-gray-600 mb-6">
//             Use OpenAI's powerful language models to create detailed learning paths with resource recommendations.
//           </p>
//           <Link 
//             href="/generate-path"
//             className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Try OpenAI Path Generator
//           </Link>
//         </div>
        
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
//           <ol className="text-left text-gray-700 space-y-4 max-w-xl mx-auto">
//             <li className="flex gap-3">
//               <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</span>
//               <p>Describe your learning goals, current skill level, and interests</p>
//             </li>
//             <li className="flex gap-3">
//               <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</span>
//               <p>Our AI processes your request and creates a personalized learning path</p>
//             </li>
//             <li className="flex gap-3">
//               <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</span>
//               <p>Review your learning path and save it for future reference</p>
//             </li>
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// }



import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Learning Path Advisor
        </h1>
        
        <p className="text-xl text-gray-600 mb-10">
          Create personalized learning paths tailored to your goals, interests, and skill level.
        </p>
        
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-16 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Generate with Claude AI</h2>
          <p className="text-gray-600 mb-6">
            Use Anthropic's Claude AI to create detailed learning paths with resource recommendations.
          </p>
          <Link 
            href="/generate-path"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Claude Path Generator
          </Link>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h2>
          <ol className="text-left text-gray-700 space-y-4 max-w-xl mx-auto">
            <li className="flex gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">1</span>
              <p>Describe your learning goals, current skill level, and interests</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">2</span>
              <p>Claude AI processes your request and creates a personalized learning path</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">3</span>
              <p>Review your learning path and save it for future reference</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}