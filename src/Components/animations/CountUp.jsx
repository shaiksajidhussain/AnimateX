import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CountUp = ({ start = 0, end = 100, duration = 2, className = '' }) => {
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    controls.start({
      scale: [0.5, 1], // Scale from small to normal
      count: [start, end], // Number animation
      transition: {
        duration,
        ease: 'easeOut',
      },
    });
  }, [start, end, duration, controls]);

  const handleUpdate = (latest) => {
    setDisplayValue(Math.floor(latest.count)); // Update the number display
  };

  return (
    <motion.div
      className={`text-4xl font-bold ${className}`}
      initial={{ scale: 0.5, count: start }}
      animate={controls}
      onUpdate={handleUpdate}
      style={{ display: 'inline-block' }}
    >
      {displayValue}
    </motion.div>
  );
};

CountUp.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  className: PropTypes.string,
};

export default CountUp;
