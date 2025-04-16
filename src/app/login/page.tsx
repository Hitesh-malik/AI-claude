'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Testimonials data
  const testimonials = [
    {
      quote: "This platform transformed my learning journey. The structured learning paths helped me master web development in just 6 months.",
      author: "Alex Johnson",
      title: "Frontend Developer at Spotify"
    },
    {
      quote: "The personalized roadmaps are incredible. I went from knowing nothing about data science to landing my dream job with the guided learning path.",
      author: "Sarah Chen",
      title: "Data Scientist at Tableau"
    },
    {
      quote: "I love how the platform breaks down complex topics into manageable modules with clear time estimates. Perfect for busy professionals!",
      author: "Michael Rodriguez",
      title: "UX Designer at Adobe"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login functionality would go here
    console.log({ email, password, rememberMe });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
  
  const testimonialVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 p-4 overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 40, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-40 right-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -30, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <motion.div 
        className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side: Login form */}
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">LearningPath</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-white text-opacity-80">Sign in to continue your learning journey</p>
          </motion.div>
          
          <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white text-opacity-80">
                  Keep me logged in
                </label>
              </div>
              <Link href="#" className="text-sm text-white hover:text-purple-200 transition-colors">
                Forgot Password?
              </Link>
            </motion.div>
            
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Sign in
            </motion.button>
            
            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white border-opacity-20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white text-opacity-60">Or continue with</span>
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
                Don't have an account?{' '}
                <Link href="/signup" className="text-white font-medium hover:text-purple-200 transition-colors">
                  Sign up now
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
        
        {/* Right side: Testimonials & Info */}
        <div className="w-full md:w-1/2 bg-black bg-opacity-60 p-8 md:p-12 relative">
          <div className="h-full flex flex-col">
            {/* Testimonial section */}
            <div className="mb-auto">
              <motion.h2 
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                What Our<br />
                Learners Say.
              </motion.h2>
              
              <div className="relative">
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-5xl text-white">"</span>
                </motion.div>
                
                <div className="min-h-[180px] relative">
                  <motion.div
                    key={testimonialIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={testimonialVariants}
                    className="absolute inset-0"
                  >
                    <p className="text-white text-lg mb-6 leading-relaxed">
                      {testimonials[testimonialIndex].quote}
                    </p>
                    
                    <div>
                      <p className="text-white font-semibold">
                        {testimonials[testimonialIndex].author}
                      </p>
                      <p className="text-white text-opacity-70">
                        {testimonials[testimonialIndex].title}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevTestimonial}
                    className="p-3 bg-pink-200 bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextTestimonial}
                    className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Bottom info card */}
            <motion.div 
              className="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Master new skills at your own pace
              </h3>
              <p className="text-white text-opacity-80 mb-4">
                Join over 10,000 learners who have accelerated their careers with our personalized learning paths.
              </p>
              <div className="flex -space-x-2">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  JD
                </motion.div>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  SK
                </motion.div>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  MR
                </motion.div>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  +7K
                </motion.div>
              </div>
            </motion.div>
            
            {/* Decorative element */}
            <motion.div 
              className="absolute top-1/2 right-12 transform -translate-y-1/2 opacity-30"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 0.3, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-40 h-40 relative">
                <motion.div 
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100,10 L123.5,34.5 L157.8,19.9 L152.2,54.9 L180,80 L145,90 L140,125 L110,100 L80,125 L75,90 L40,80 L67.8,54.9 L62.2,19.9 L96.5,34.5 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}