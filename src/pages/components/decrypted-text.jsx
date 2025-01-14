import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import DecryptedText from '../../components/animations/DecryptedText';
import PropTypes from 'prop-types';

const CodeBlock = ({ code, language = 'jsx', section, copiedStates, onCopy }) => {
  return (
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
        onClick={() => onCopy(code, section)}
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
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  section: PropTypes.string.isRequired,
  copiedStates: PropTypes.object.isRequired,
  onCopy: PropTypes.func.isRequired
};

const DecryptedTextPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [settings, setSettings] = useState({
    speed: 60,
    iterations: 10,
    animateOn: 'view',
    direction: 'start'
  });

  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install framer-motion`;
  
  const usageCode = `import { DecryptedText } from "./DecryptedText";

<DecryptedText 
  text="Your text here" 
  className="text-4xl" 
  speed={60}
  iterations={10}
  animateOn="view"
  direction="start"
/>`;
  
  const codeString = `import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const DecryptedText = ({ 
  text = '', 
  className = '', 
  speed = 60,
  iterations = 10,
  animateOn = 'view',
  direction = 'start'
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
        className={\`inline-block \${className}\`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayText}
      </motion.div>
      <button onClick={handleReplay}>
        Replay
      </button>
    </div>
  );
};

export default DecryptedText;`;

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

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Decrypted Text</h1>
        <div className="flex gap-4">
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">👁️ Preview</span>
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            <span className="flex items-center gap-2">⌨️ Code</span>
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-8 rounded-lg bg-gray-900 p-8">
        <div className="flex flex-col gap-8">
          <DecryptedText 
            text="Ahoy, mateyH" 
            className="text-4xl font-bold"
            {...settings}
          />
          <DecryptedText 
            text="Set yer eye@ QG O$kH" 
            className="text-2xl"
            {...settings}
          />
          <DecryptedText 
            text="And try tinGo^Fyj ZWE+v+" 
            className="text-xl text-cyan-400"
            {...settings}
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-white w-32">Speed:</span>
            <input
              type="range"
              min="10"
              max="200"
              value={settings.speed}
              onChange={(e) => setSettings(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.speed}ms</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Iterations:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={settings.iterations}
              onChange={(e) => setSettings(prev => ({ ...prev, iterations: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.iterations}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSettings(prev => ({ 
                ...prev, 
                animateOn: prev.animateOn === 'view' ? 'start' : 'view' 
              }))}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Animate On: {settings.animateOn}
            </button>
            <button
              onClick={() => setSettings(prev => ({ 
                ...prev, 
                direction: prev.direction === 'start' ? 'end' : 'start' 
              }))}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Direction: {settings.direction}
            </button>
          </div>
        </div>
      </div>

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

export default DecryptedTextPage; 