'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);

  // Learning path features to showcase
  const features = [
    {
      title: "Personalized Learning Paths",
      description: "Our AI generates custom learning paths based on your goals and existing knowledge.",
      icon: (
        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Interactive Projects",
      description: "Apply your knowledge with real-world projects at each stage of your learning journey.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Progress Tracking",
      description: "Visualize your progress and stay motivated with achievement milestones and analytics.",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup functionality would go here
    console.log({ fullName, email, password, confirmPassword, acceptTerms });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 p-4 overflow-hidden">

      <motion.div
        className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side: Feature showcase */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 p-8 md:p-12 relative">
          <div className="h-full flex flex-col">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="text-white text-xl font-bold">LearningPath</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join our learning community</h1>
              <p className="text-white text-opacity-80">Create an account to start your personalized learning journey today</p>
            </motion.div>

            {/* Feature showcase */}
            <div className="my-8 relative flex-grow">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 bg-indigo-500 bg-opacity-20 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col items-center py-8">
                <motion.div
                  key={`icon-${featureIndex}`}
                  variants={floatingIconVariants}
                  animate="animate"
                  className="mb-4"
                >
                  {features[featureIndex].icon}
                </motion.div>

                <motion.div
                  key={`feature-${featureIndex}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={featureVariants}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {features[featureIndex].title}
                  </h3>
                  <p className="text-white text-opacity-80 max-w-xs mx-auto">
                    {features[featureIndex].description}
                  </p>
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 py-4">
                {features.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === featureIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                    animate={{ scale: idx === featureIndex ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 1, repeat: idx === featureIndex ? Infinity : 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial quote */}
            <motion.div
              className="mt-auto bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-start">
                <svg className="w-8 h-8 text-pink-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white text-opacity-90 text-sm italic">
                    "The structured learning paths helped me transition from a complete beginner to a professional developer in just 8 months!"
                  </p>
                  <p className="text-white text-opacity-70 text-xs mt-2">
                    — Jamie Chen, Software Developer
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side: Signup form */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-6"
          >
            Create your account
          </motion.h2>

          <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label htmlFor="fullname" className="block text-white text-opacity-90 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-white text-opacity-90 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-white text-opacity-90 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-white text-opacity-70">At least 8 characters with letters and numbers</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="confirm-password" className="block text-white text-opacity-90 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black bg-opacity-30 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm text-white text-opacity-80">
                I agree to the <Link href="#" className="text-purple-300 hover:text-purple-200">Terms of Service</Link> and <Link href="#" className="text-purple-300 hover:text-purple-200">Privacy Policy</Link>
              </label>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Create Account
            </motion.button>

            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white border-opacity-20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white text-opacity-60">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                  whileTap={{ y: 0 }}
                  type="button"
                  className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.643 2.027-2.392 3.478-5.445 3.478-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.478 0 2.811 0.537 3.842 1.417l2.873-2.873c-1.738-1.628-4.011-2.622-6.715-2.622-5.543 0-10.035 4.492-10.035 10.035s4.492 10.035 10.035 10.035c8.369 0 10.105-7.78 9.252-11.386l-8.252-0.001z" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                  whileTap={{ y: 0 }}
                  type="button"
                  className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                  whileTap={{ y: 0 }}
                  type="button"
                  className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-white text-opacity-70">
                Already have an account?{' '}
                <Link href="/login" className="text-white font-medium hover:text-purple-200 transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}