import StringAnimation from '../../components/animations/StringAnimation'
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

const StringAnimationPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install gsap`;
  
  const usageCode = `import { StringAnimation } from "./StringAnimation";

<StringAnimation 
  width={1000} 
  height={160} 
  strokeColor="white" 
  strokeWidth={2} 
/>`;
  
  const codeString = `import { useRef, useState } from 'react';
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

  const final = \`M 10 100 Q 500 100 990 100\`;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    // Clamp the Y value to keep it within reasonable bounds
    const clampedY = Math.max(50, Math.min(150, y));
    
    const initial = \`M 10 100 Q 500 \${clampedY} 990 100\`;
    
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
      ease: "elastic.out(2,0.2)"
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
    <div className={\`flex items-center gap-4 \${className}\`}>
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

export default StringAnimation;`;

  const handleCopyCode = async (code, section) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({
      ...prev,
      [section]: true
    }));
    setTimeout(() => {
      setCopiedStates(prev => ({
        ...prev,
        [section]: false
      }));
    }, 2000);
  };

  const CodeBlock = ({ code, language = 'jsx', section }) => (
    <div className="relative rounded-lg bg-gray-900 p-4">
      <Highlight
        theme={themes.nightOwl}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 inline-block w-8 select-none text-right text-gray-500">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <button 
        onClick={() => handleCopyCode(code, section)}
        className="absolute right-4 top-4"
      >
        {copiedStates[section] ? (
          <div className="rounded-md bg-green-500 p-1">
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
              className="text-white"
            >
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        ) : (
          <div className="rounded-md bg-gray-800 p-1 hover:bg-gray-700">
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </div>
        )}
      </button>
    </div>
  );

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">String Animation</h1>
        <div className="flex gap-4">
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">
              👁️ Preview
            </span>
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">
              ⌨️ Code
            </span>
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">
              ❤️ Contribute
            </span>
          </button>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-gray-900 p-8">
        <StringAnimation />
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Installation</h2>
        <CodeBlock code={installationCode} language="bash" section="installation" />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Usage</h2>
        <CodeBlock code={usageCode} section="usage" />
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-bold">Code</h2>
        <div className="mb-4 flex gap-4 border-b border-gray-800 pb-4">
          <button 
            className={`${activeTab === 'default' ? 'text-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('default')}
          >
            Default
          </button>
          <button 
            className={`${activeTab === 'tailwind' ? 'text-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('tailwind')}
          >
            Tailwind
          </button>
        </div>
        <CodeBlock code={codeString} section="code" />
      </section>
    </div>
    </div>
  );
};

export default StringAnimationPage; 