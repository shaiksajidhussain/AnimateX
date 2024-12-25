import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 2, 100));
        
        // Update loading text based on progress
        if (progress === 20) setLoadingText('Loading Assets');
        if (progress === 40) setLoadingText('Preparing Canvas');
        if (progress === 60) setLoadingText('Loading Animations');
        if (progress === 80) setLoadingText('Almost There');
        if (progress === 95) setLoadingText('Ready!');
      } else {
        setLoading(false);
      }
    }, 15);

    return () => clearTimeout(timer);
  }, [progress, setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 1, 0.2],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Logo or Brand */}
      <motion.div
        className="mb-12"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-[#3399FF] to-[#9DFF1E] flex items-center justify-center">
          <span className="text-4xl font-bold text-white">S</span>
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <motion.div
        className="w-64 h-2 bg-gray-800/30 rounded-full overflow-hidden backdrop-blur-sm"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#3399FF] to-[#9DFF1E]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
          style={{
            boxShadow: '0 0 20px rgba(51,153,255,0.5)'
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <AnimatePresence mode='wait'>
          <motion.p
            key={loadingText}
            className="text-lg text-gray-400 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
        <motion.p 
          className="mt-2 text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.p>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loader; 