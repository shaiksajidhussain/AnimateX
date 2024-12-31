import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const BlurText = ({ text = '', className = '', delay = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  
  const letters = String(text).split('');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const child = {
    hidden: { 
      opacity: 0, 
      filter: "blur(10px)",
      scale: 1.2
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
  };

  const handleReplay = () => {
    controls.start('hidden').then(() => controls.start('visible'));
  };

  return (
    <div className="flex items-center gap-4">
      <motion.div
        ref={ref}
        className={`inline-block overflow-hidden ${className}`}
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ willChange: 'filter' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
      <button
        onClick={handleReplay}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        title="Replay Animation"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M1 4v6h6"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
      </button>
    </div>
  );
};

BlurText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number
};

export default BlurText; 