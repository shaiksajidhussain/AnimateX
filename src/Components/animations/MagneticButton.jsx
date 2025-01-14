import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MagneticButton = ({ 
  children, 
  className = '',
  strength = 800,
  radius = 200,
  smooth = 0.5
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(x * x + y * y);

    if (distance < radius) {
      const magneticX = (x / radius) * strength;
      const magneticY = (y / radius) * strength;
      setPosition({ x: magneticX, y: magneticY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const defaultStyle = `
    bg-cyan-500 
    hover:bg-cyan-600 
    text-white 
    px-6 
    py-3 
    rounded-lg 
    text-lg 
    font-medium
    transform
    hover:scale-105
    transition-all
  `;

  return (
    <button
      ref={buttonRef}
      className={`${defaultStyle} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${smooth}s cubic-bezier(0.33, 1, 0.68, 1)`
      }}
    >
      {children}
    </button>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  strength: PropTypes.number,
  radius: PropTypes.number,
  smooth: PropTypes.number
};

export default MagneticButton; 