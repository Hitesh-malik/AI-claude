// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Learning Path Advisor',
//   description: 'Create personalized learning paths powered by OpenAI',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <header className="bg-white shadow-sm">
//           <div className="container mx-auto px-4 py-4">
//             <nav className="flex items-center justify-between">
//               <Link href="/" className="text-xl font-bold text-blue-600">
//                 Learning Path Advisor
//               </Link>
              
//               <div className="flex gap-6">
//                 <Link 
//                   href="/generate-path" 
//                   className="text-gray-600 hover:text-blue-600"
//                 >
//                   Generate Path
//                 </Link>
//                 <a
//                   href="https://github.com/yourusername/learning-path-advisor"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-600 hover:text-blue-600"
//                 >
//                   GitHub
//                 </a>
//               </div>
//             </nav>
//           </div>
//         </header>
        
//         <main className="min-h-screen bg-gray-50">
//           {children}
//         </main>
        
//         <footer className="bg-white border-t">
//           <div className="container mx-auto px-4 py-6">
//             <div className="text-center text-gray-500 text-sm">
//               <p>© {new Date().getFullYear()} Learning Path Advisor. All rights reserved.</p>
//               <p className="mt-2">
//                 Powered by Next.js and OpenAI
//               </p>
//             </div>
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }




import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learning Path Advisor',
  description: 'Create personalized learning paths powered by Claude AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-purple-600">
                Learning Path Advisor
              </Link>
              
              <div className="flex gap-6">
                <Link 
                  href="/generate-path" 
                  className="text-gray-600 hover:text-purple-600"
                >
                  Generate Path
                </Link>
              </div>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen bg-white">
          {children}
        </main>
        
        <footer className="bg-white border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Learning Path Advisor. All rights reserved.</p>
              <p className="mt-2">
                Powered by Next.js and Claude AI
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}