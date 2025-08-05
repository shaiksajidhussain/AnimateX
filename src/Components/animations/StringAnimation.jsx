import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

const StringAnimation = ({ 
  width = 1000, 
  height = 160, 
  strokeColor = "white", 
  strokeWidth = 2,
  className = "" 
}) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const final = `M 10 100 Q 500 100 990 100`;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    // Clamp the Y value to keep it within reasonable bounds
    const clampedY = Math.max(50, Math.min(150, y));
    
    const initial = `M 10 100 Q 500 ${clampedY} 990 100`;
    
    gsap.to(pathRef.current, {
      attr: {
        d: initial
      },
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    gsap.to(pathRef.current, {
      attr: {
        d: final
      },
      duration: 1.6,
      ease: "elastic.out(2,0.1)"
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleReset = () => {
    gsap.to(pathRef.current, {
      attr: {
        d: final
      },
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ cursor: 'none' }}
      >
        <svg 
          ref={svgRef}
          width={width} 
          height={height}
          className="border border-gray-700 rounded-lg"
        >
          <path
            ref={pathRef}
            d={final}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            style={{
              filter: isHovering ? "drop-shadow(0 0 10px rgba(255,255,255,0.5))" : "none"
            }}
          />
        </svg>
        
        {/* Mouse cursor indicator */}
        {isHovering && (
          <div
            className="absolute w-4 h-4 bg-cyan-400 rounded-full pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          />
        )}
      </div>
      
      {/* Replay button */}
      <button
        onClick={handleReset}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        title="Reset Animation"
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

StringAnimation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string
};

export default StringAnimation; 