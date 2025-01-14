import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import BlobCursor from '../../components/animations/BlobCursor';
import PropTypes from 'prop-types';

const CodeBlock = ({ code, language = 'jsx', section, copiedStates, onCopy }) => {
  return (
    <div className="relative">
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 rounded-lg overflow-auto`} style={style}>
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
        onClick={() => onCopy(code, section)}
        className="absolute right-4 top-4"
        aria-label="Copy code"
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
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  section: PropTypes.string.isRequired,
  copiedStates: PropTypes.object.isRequired,
  onCopy: PropTypes.func.isRequired
};

const BlobCursorPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [settings, setSettings] = useState({
    color: '#00f0ff',
    shape: 'circle',
    size: 20,
    blur: 5,
    delay: 0.005
  });

  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

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

  const installationCode = `npm install framer-motion`;
  
  const usageCode = `import { BlobCursor } from "./components/animations/BlobCursor";

// Basic usage
<BlobCursor />

// With custom options
<BlobCursor 
  color="#00f0ff"
  shape="circle"
  size={20}
  blur={5}
/>`;

  const codeString = `import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const BlobCursor = ({ 
  color = '#00f0ff',
  shape = 'circle',
  size = 20,
  blur = 5
}) => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Main cursor
      const mainSize = size;
      cursor.style.transform = \`translate(\${clientX - mainSize/2}px, \${clientY - mainSize/2}px)\`;
      
      // Follower blob (larger and delayed)
      const followerSize = size * 2;
      follower.style.transform = \`translate(\${clientX - followerSize/2}px, \${clientY - followerSize/2}px)\`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [size]);

  const cursorStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    width: \`\${size}px\`,
    height: \`\${size}px\`,
    backgroundColor: color,
    borderRadius: shape === 'circle' ? '50%' : '0',
    filter: \`blur(\${blur}px)\`,
    transition: 'transform 0.1s ease',
    zIndex: 9999,
    top: 0,
    left: 0,
    mixBlendMode: 'difference'
  };

  const followerStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    width: \`\${size * 2}px\`,
    height: \`\${size * 2}px\`,
    backgroundColor: color,
    borderRadius: shape === 'circle' ? '50%' : '0',
    filter: \`blur(\${blur * 2}px)\`,
    transition: 'transform 0.3s ease',
    zIndex: 9998,
    top: 0,
    left: 0,
    mixBlendMode: 'difference'
  };

  return (
    <>
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={followerRef} style={followerStyle} />
    </>
  );
};

BlobCursor.propTypes = {
  color: PropTypes.string,      // Custom color for the blob
  shape: PropTypes.oneOf(['circle', 'square']), // Shape of the blob
  size: PropTypes.number,       // Size in pixels
  blur: PropTypes.number        // Blur amount in pixels
};

export default BlobCursor;`;

  const propsTableCode = `
| Prop    | Type                  | Default     | Description                    |
|---------|----------------------|-------------|--------------------------------|
| color   | string               | '#00f0ff'   | Color of the blob cursor      |
| shape   | 'circle' \| 'square' | 'circle'    | Shape of the blob cursor      |
| size    | number               | 20          | Size of the cursor in pixels  |
| blur    | number               | 5           | Blur amount in pixels         |
`;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Blob Cursor</h1>
        <div className="flex gap-4">
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">👁️ Preview</span>
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">⌨️ Code</span>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="mb-8 rounded-lg bg-[#1a1d24] p-8 min-h-[400px] relative flex items-center justify-center">
        <BlobCursor {...settings} />
        <div className="text-center text-gray-400 text-xl">
          Move your cursor around to see the effect
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-white w-32">Shape:</span>
            <select
              value={settings.shape}
              onChange={(e) => setSettings(prev => ({ ...prev, shape: e.target.value }))}
              className="bg-gray-700 text-white rounded px-3 py-2"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Color:</span>
            <input
              type="color"
              value={settings.color}
              onChange={(e) => setSettings(prev => ({ ...prev, color: e.target.value }))}
              className="bg-gray-700 rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Size:</span>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.size}
              onChange={(e) => setSettings(prev => ({ ...prev, size: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.size}px</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Blur:</span>
            <input
              type="range"
              min="0"
              max="20"
              value={settings.blur}
              onChange={(e) => setSettings(prev => ({ ...prev, blur: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.blur}px</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Delay:</span>
            <input
              type="range"
              min="0"
              max="0.02"
              step="0.001"
              value={settings.delay}
              onChange={(e) => setSettings(prev => ({ ...prev, delay: parseFloat(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.delay}s</span>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Installation</h2>
        <CodeBlock 
          code={installationCode} 
          language="bash" 
          section="installation"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Usage</h2>
        <CodeBlock 
          code={usageCode} 
          section="usage"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Props</h2>
        <CodeBlock 
          code={propsTableCode} 
          language="markdown"
          section="props"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Smooth cursor following with transition effects</li>
          <li>Customizable blob shape (circle or square)</li>
          <li>Adjustable size and blur effects</li>
          <li>Dual-blob system with main cursor and larger follower</li>
          <li>Mix-blend-mode effect for better visibility</li>
          <li>Safari compatibility note for SVG filters</li>
        </ul>
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
        <CodeBlock 
          code={codeString} 
          section="code"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>
    </div>
  );
};

export default BlobCursorPage; 