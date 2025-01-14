import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ShinyText = ({ text = '', className = '', delay = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="relative inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-shine"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shine {
          background-size: 200% 200%;
          animation: shine 3s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
};

export default ShinyText;
