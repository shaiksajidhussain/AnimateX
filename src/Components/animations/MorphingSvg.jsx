import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const paths = {
  circle: "M50,50 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0",
  square: "M10,10 L90,10 L90,90 L10,90 Z",
  triangle: "M50,10 L90,90 L10,90 Z",
  star: "M50,10 L61,35 L88,35 L68,55 L78,80 L50,65 L22,80 L32,55 L12,35 L39,35 Z",
  blob: "M44.9,-65.7C57.8,-56.6,67.4,-42.8,72.8,-27.3C78.1,-11.8,79.2,5.4,74.7,20.8C70.2,36.2,60.1,49.8,46.6,58.9C33.1,68,16.5,72.6,0.2,72.3C-16.2,72,-32.4,66.9,-46.4,57.7C-60.4,48.5,-72.2,35.2,-77.5,19.2C-82.8,3.2,-81.6,-15.5,-73.7,-30.4C-65.8,-45.3,-51.2,-56.4,-36.4,-64.7C-21.5,-73,-10.8,-78.5,2.8,-82.5C16.3,-86.5,32.1,-74.8,44.9,-65.7Z",
  wave: "M0,50 C20,40 40,60 60,50 C80,40 100,60 120,50 C140,40 160,60 180,50 C200,40 220,60 240,50"
};

const MorphingSvg = ({ 
  width = 300, 
  height = 300,
  duration = 0.8,
  colors = ['#FF0080', '#7928CA', '#0070F3', '#00DFD8'],
  autoPlay = true,
  interval = 2000,
  className = ''
}) => {
  const [currentPath, setCurrentPath] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const pathNames = Object.keys(paths);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentPath((prev) => (prev + 1) % pathNames.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isHovered, autoPlay, interval, pathNames.length]);

  const handleReplay = () => {
    setCurrentPath((prev) => (prev + 1) % pathNames.length);
  };

  const currentColor = colors[currentPath % colors.length];
  const nextColor = colors[(currentPath + 1) % colors.length];

  return (
    <div className="flex items-center gap-4">
      <div 
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          className="transform-gpu"
        >
          <motion.path
            d={paths[pathNames[currentPath]]}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            animate={{
              d: paths[pathNames[currentPath]],
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: 0
            }}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{ stopColor: currentColor }}
                transition={{ duration }}
              />
              <motion.stop
                offset="100%"
                animate={{ stopColor: nextColor }}
                transition={{ duration }}
              />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#glow)">
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                r={1}
                initial={{ x: 50, y: 50, scale: 0 }}
                animate={{
                  x: 50 + Math.cos(i * Math.PI * 2 / 20) * 40,
                  y: 50 + Math.sin(i * Math.PI * 2 / 20) * 40,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                fill={currentColor}
              />
            ))}
          </g>
        </svg>
      </div>

      <button
        onClick={handleReplay}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        title="Next Shape"
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

export default MorphingSvg; 