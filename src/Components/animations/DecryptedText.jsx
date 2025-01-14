import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DecryptedText = ({ 
  text = '', 
  className = '', 
  speed = 60,
  iterations = 10,
  animateOn = 'view',  // 'view' or 'start'
  direction = 'start'  // 'start' or 'end'
}) => {
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState(text);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const scrambleText = () => {
    let count = 0;
    const interval = setInterval(() => {
      const scrambled = text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');
      
      setDisplayText(scrambled);
      count++;
      
      if (count === iterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);
  };

  const handleReplay = () => {
    scrambleText();
  };

  useEffect(() => {
    if (animateOn === 'start') {
      scrambleText();
    }
  }, []);

  return (
    <div className="flex items-center gap-4">
      <motion.div
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayText}
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

DecryptedText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
  iterations: PropTypes.number,
  animateOn: PropTypes.oneOf(['view', 'start']),
  direction: PropTypes.oneOf(['start', 'end'])
};

export default DecryptedText; 