import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedContainer = ({
  isVisible = true,
  initialHeight = '0px',
  expandedHeight = '200px',
  initialWidth = '0px',
  expandedWidth = '300px',
  duration = 0.5,
  children,
  className = '',
}) => {
  return (
    <motion.div
      className={`overflow-hidden bg-gray-200 ${className}`}
      initial={{
        height: initialHeight,
        width: initialWidth,
        opacity: 0,
      }}
      animate={{
        height: isVisible ? expandedHeight : initialHeight,
        width: isVisible ? expandedWidth : initialWidth,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  );
};

AnimatedContainer.propTypes = {
  isVisible: PropTypes.bool,
  initialHeight: PropTypes.string,
  expandedHeight: PropTypes.string,
  initialWidth: PropTypes.string,
  expandedWidth: PropTypes.string,
  duration: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default AnimatedContainer;
