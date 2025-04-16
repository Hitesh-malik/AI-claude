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
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Learning Path Advisor
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Your AI-powered guide to personalized learning journeys.
          </p>
          
          <div className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full mb-8">
            Coming Soon
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              We're working to bring you an enhanced experience for creating customized learning paths
              powered by advanced AI. Stay tuned for our official launch.
            </p>
            
            <p className="text-gray-600">
              In the meantime, you can try our beta version to generate learning paths.
            </p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Link 
            href="/generate-path"
            className="inline-block px-8 py-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors text-lg shadow-lg"
          >
            Try Beta Version
          </Link>
        </div>
        
        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Paths</h3>
            <p className="text-gray-600">
              Advanced AI creates personalized learning journeys based on your goals and skill level.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Timeline</h3>
            <p className="text-gray-600">
              See your learning journey visualized with interactive timelines and progress tracking.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Resources</h3>
            <p className="text-gray-600">
              Get recommended books, courses, and tutorials perfectly matched to your learning path.
            </p>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-20 bg-purple-50 rounded-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Notified at Launch</h2>
            <p className="text-gray-600">Be the first to know when we officially launch.</p>
          </div>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled
              />
              <button 
                type="button" 
                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}