# Opened Files
## File Name
src/pages/components/split-text.jsx
## File Content
import ComponentDoc from '../../components/docs/ComponentDoc'
import SplitText from '../../components/animations/SplitText'
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

const SplitTextPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install framer-motion`;
  
  const usageCode = `import { SplitText } from "./splitText";

<SplitText text="Hello!" className="custom-class" delay={0.05} />`;
  
  const codeString = `import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SplitText = ({ text = '', className = '', delay = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  
  const letters = String(text).split('');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
  };

  return (
    <motion.p
      ref={ref}
      className={\`inline-block overflow-hidden \${className}\`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {letter === ' ' ? '\\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default SplitText;`;

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
        <h1 className="text-5xl font-bold">Split Text</h1>
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
        <SplitText 
          text="Hello World!" 
          className="text-4xl font-bold" 
        />
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

export default SplitTextPage; 
# Opened Files
## File Name
src/pages/components/blur-text.jsx
## File Content
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import BlurText from '../../components/animations/BlurText';
import PropTypes from 'prop-types';

const BlurTextPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install framer-motion`;
  
  const usageCode = `import { BlurText } from "./BlurText";

<BlurText text="Hello!" className="custom-class" delay={0.05} />`;
  
  const codeString = `import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const BlurText = ({ text = '', className = '', delay = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
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
    hidden: { 
      opacity: 0, 
      filter: "blur(10px)",
      scale: 1.2
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
  };

  return (
    <motion.p
      ref={ref}
      className={\`inline-block overflow-hidden \${className}\`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {letter === ' ' ? '\\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default BlurText;`;

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

  const CodeBlock = ({ code, language = 'jsx', section }) => {
    CodeBlock.propTypes = {
      code: PropTypes.string.isRequired,
      language: PropTypes.string,
      section: PropTypes.string.isRequired
    };

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
  };

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Blur Text</h1>
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
        <div className="flex flex-col gap-8">
          <BlurText 
            text="Hello World!" 
            className="text-4xl font-bold" 
          />
          <BlurText 
            text="This is a blur animation" 
            className="text-2xl" 
            delay={0.08} 
          />
          <BlurText 
            text="Each letter blurs in" 
            className="text-xl text-cyan-400" 
            delay={0.1} 
          />
        </div>
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

export default BlurTextPage; 
# Opened Files
## File Name
src/pages/components/ShinyTextPage.jsx
## File Content
import { useState } from 'react';
import ShinyText from '../../components/animations/ShinyText';
import { Highlight, themes } from 'prism-react-renderer';

const ShinyTextPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false,
  });

  const installationCode = `npm install framer-motion`;

  const usageCode = `import ShinyText from './ShinyText';

<ShinyText text="Hello World!" className="text-4xl font-bold" delay={0.05} />`;

  const codeString = `import { motion, useInView, useAnimation } from 'framer-motion';
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
      className={\`relative inline-block overflow-hidden \${className}\`}
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
          {letter === ' ' ? '\\u00A0' : letter}
        </motion.span>
      ))}
      <style jsx>{\`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shine {
          background-size: 200% 200%;
          animation: shine 3s linear infinite;
        }
      \`}</style>
    </motion.div>
  );
};

export default ShinyText;`;

  const handleCopyCode = async (code, section) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({
      ...prev,
      [section]: true,
    }));
    setTimeout(() => {
      setCopiedStates((prev) => ({
        ...prev,
        [section]: false,
      }));
    }, 2000);
  };

  const CodeBlock = ({ code, language = 'jsx', section }) => (
    <div className="relative rounded-lg bg-gray-900 p-4">
      <Highlight theme={themes.nightOwl} code={code} language={language}>
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
              <polyline points="20 6 9 17 4 12" />
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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
        <h1 className="text-5xl font-bold">Shiny Text Animation</h1>
        <div className="flex gap-4">
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            👁️ Preview
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            ⌨️ Code
          </button>
          <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
            ❤️ Contribute
          </button>
        </div>
      </div>

      <section className="mb-8">
        <ShinyText text="Shiny Text!" className="text-4xl font-bold" delay={0.1} />
        <ShinyText text="Gradient Animation Effect!" className="text-2xl" delay={0.15} />
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold">Installation</h2>
        <CodeBlock code={installationCode} language="bash" section="installation" />
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold">Usage</h2>
        <CodeBlock code={usageCode} section="usage" />
      </section>

      <section>
        <h2 className="text-3xl font-bold">Code</h2>
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

export default ShinyTextPage;

# Opened Files
## File Name
src/pages/components/decrypted-text.jsx
## File Content
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
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
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
    </div>
    );
};

export default DecryptedTextPage; 
# Opened Files
## File Name
src/pages/components/CountUpPage.jsx
## File Content
import { useState } from 'react';
import CountUp from '../../components/animations/CountUp';
import { Highlight, themes } from 'prism-react-renderer';

const CountUpPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false,
  });

  const installationCode = `npm install framer-motion`;

  const usageCode = `import CountUp from './CountUp';

<CountUp start={0} end={1000} duration={3} className="text-blue-500" />`;

  const codeString = `import { motion, useAnimation } from 'framer-motion';
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
      className={\`text-4xl font-bold \${className}\`}
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

export default CountUp;`;

  const handleCopyCode = async (code, section) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({
      ...prev,
      [section]: true,
    }));
    setTimeout(() => {
      setCopiedStates((prev) => ({
        ...prev,
        [section]: false,
      }));
    }, 2000);
  };

  const CodeBlock = ({ code, language = 'jsx', section }) => (
    <div className="relative rounded-lg bg-gray-900 p-4">
      <Highlight theme={themes.nightOwl} code={code} language={language}>
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
              <polyline points="20 6 9 17 4 12" />
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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
        <h1 className="text-5xl font-bold">Count Up Animation with Scale</h1>
      </div>

      <section className="mb-8">
        <CountUp start={0} end={1000} duration={3} className="text-blue-500" />
        <CountUp start={50} end={5000} duration={5} className="text-purple-400" />
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold">Installation</h2>
        <CodeBlock code={installationCode} language="bash" section="installation" />
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold">Usage</h2>
        <CodeBlock code={usageCode} section="usage" />
      </section>

      <section>
        <h2 className="text-3xl font-bold">Code</h2>
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

export default CountUpPage;

# Opened Files
## File Name
src/pages/components/magnetic-button.jsx
## File Content
import { useState } from 'react';
import MagneticButton from '../../components/animations/MagneticButton';
import CodeBlock from '../../components/shared/CodeBlock';



const MagneticButtonPage = () => {
  const [settings, setSettings] = useState({
    strength: 700,
    radius: 600,
    smooth: 0.2
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

  const installationCode = `npm install @react-spring/web`;
  
  const usageCode = `import { MagneticButton } from "./components/animations/MagneticButton";

// Basic usage
<MagneticButton>
  Hover me
</MagneticButton>

// With custom options
<MagneticButton 
  strength={30}
  radius={400}
  smooth={0.2}
  className="bg-cyan-500 px-4 py-2 rounded-lg"
>
  Magnetic Button
</MagneticButton>`;

  const codeString = `import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MagneticButton = ({ 
  children, 
  className = '',
  strength = 30,
  radius = 400,
  smooth = 0.2
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
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

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={\`relative \${className}\`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: \`translate(\${position.x}px, \${position.y}px)\`,
        transition: \`transform \${smooth}s cubic-bezier(0.33, 1, 0.68, 1)\`
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

export default MagneticButton;`;

  const propsData = [
    {
      prop: "children",
      type: "node",
      default: "required",
      description: "The content to be displayed inside the button"
    },
    {
      prop: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes to be applied to the button"
    },
    {
      prop: "strength",
      type: "number",
      default: "30",
      description: "The strength of the magnetic effect (pixels of maximum movement)"
    },
    {
      prop: "radius",
      type: "number",
      default: "400",
      description: "The radius of the magnetic field around the button (in pixels)"
    },
    {
      prop: "smooth",
      type: "number",
      default: "0.2",
      description: "The smoothness of the animation (in seconds)"
    }
  ];

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Magnetic Button</h1>
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
      <div className="mb-8 rounded-lg bg-[#1a1d24] p-8 min-h-[400px] flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <p className="text-gray-400 mb-2">Move your cursor near the buttons</p>
          <p className="text-gray-500 text-sm">The buttons will be attracted to your cursor</p>
        </div>
        
        <div className="flex gap-8">
          {/* Basic Example */}
          <MagneticButton>
            Hover Me
          </MagneticButton>

          {/* Custom Color */}
          <MagneticButton className="bg-purple-500 hover:bg-purple-600">
            Pull Me
          </MagneticButton>
        </div>

        {/* Large Button */}
        <MagneticButton 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          strength={150}
          radius={200}
        >
          <span className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Try Me!
          </span>
        </MagneticButton>
      </div>

      {/* Controls */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-white w-32">Strength:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.strength}
              onChange={(e) => setSettings(prev => ({ ...prev, strength: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.strength}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Radius:</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={settings.radius}
              onChange={(e) => setSettings(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.radius}px</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white w-32">Smoothness:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.smooth}
              onChange={(e) => setSettings(prev => ({ ...prev, smooth: parseFloat(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{settings.smooth}s</span>
          </div>
        </div>
      </div>

      {/* Documentation */}
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
        <h2 className="mb-4 text-3xl font-bold">Props</h2>
        <div className="rounded-lg bg-gray-800 p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 pr-4">Prop</th>
                <th className="pb-4 pr-4">Type</th>
                <th className="pb-4 pr-4">Default</th>
                <th className="pb-4">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {propsData.map((prop) => (
                <tr key={prop.prop} className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">{prop.prop}</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">{prop.type}</td>
                  <td className="py-4 pr-4 font-mono text-gray-500">{prop.default}</td>
                  <td className="py-4">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-3xl font-bold">Implementation</h2>
        <CodeBlock 
          code={codeString} 
          section="code"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>
    </div>
    </div>
    );
};

export default MagneticButtonPage; 
# Opened Files
## File Name
src/pages/components/blob-gradient.jsx
## File Content
import React, { useState } from 'react';
import BlobGradient from '../../components/animations/BlobGradient';
import ColorControl from '../../components/shared/ColorController';
import CodeBlock from '../../components/shared/CodeBlock';

const BlobGradientPage = () => {
  const [settings, setSettings] = useState({
    color1: [0.2, 0.8, 1.0],  // Cyan
    color2: [1.0, 0.2, 0.8],  // Pink
    color3: [0.8, 0.2, 1.0],  // Purple
    color4: [1.0, 0.8, 0.2]   // Yellow
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

  const handleColorChange = (color, index, value) => {
    setSettings({
      ...settings,
      [color]: [
        ...settings[color].slice(0, index),
        value,
        ...settings[color].slice(index + 1)
      ]
    });
  };

  const installationCode = `npm install webgl`;

  const shaderCode = `// Vertex Shader
attribute vec4 position;
attribute vec2 a_texCoord;
varying vec2 vUv;

void main() {
  vUv = a_texCoord;
  gl_Position = position;
}

// Fragment Shader
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

varying vec2 vUv;

// Noise functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  // ... Simplex noise implementation
}

void main() {
  // ... Main shader implementation
}`;

  const usageCode = `import BlobGradient from './components/BlobGradient';

// Basic usage
const MyComponent = () => (
  <BlobGradient />
);

// Advanced usage with all props
const AdvancedComponent = () => (
  <BlobGradient 
    width="100%" 
    height="600px"
    color1={[0.2, 0.8, 1.0]}  // Cyan
    color2={[1.0, 0.2, 0.8]}  // Pink
    color3={[0.8, 0.2, 1.0]}  // Purple
    color4={[1.0, 0.8, 0.2]}  // Yellow
  />
);`;

  const mouseInteractionCode = `// Mouse interaction helper functions
const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = (e, container) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
  }
  return { x: e.clientX, y: e.clientY };
};

// Usage in component
const handleMouseMove = (e) => {
  const pos = getMousePos(e, canvas);
  targetMouseRef.current = {
    x: pos.x / canvas.width,
    y: pos.y / canvas.height
  };
};`;

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Blob Gradient</h1>
      </div>

      {/* Live Preview */}
      <div className="mb-8 rounded-lg bg-[#1a1d24] p-8">
        <BlobGradient {...settings} height="600px" />
      </div>

      {/* Color Controls */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Color Controls</h2>
        <div className="space-y-6">
          <ColorControl
            label="Color 1 (Cyan)"
            color={settings.color1}
            onChange={(index, value) => handleColorChange('color1', index, value)}
          />
          <ColorControl
            label="Color 2 (Pink)"
            color={settings.color2}
            onChange={(index, value) => handleColorChange('color2', index, value)}
          />
          <ColorControl
            label="Color 3 (Purple)"
            color={settings.color3}
            onChange={(index, value) => handleColorChange('color3', index, value)}
          />
          <ColorControl
            label="Color 4 (Yellow)"
            color={settings.color4}
            onChange={(index, value) => handleColorChange('color4', index, value)}
          />
        </div>
      </div>

      {/* Documentation */}
      <section className="space-y-12">
        {/* Overview */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300">
            The BlobGradient component creates an interactive, animated gradient blob using WebGL shaders. 
            It responds to mouse movement and creates smooth color transitions with organic movement.
          </p>
        </div>

        {/* Installation */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Installation</h2>
          <CodeBlock 
            code="npm install webgl"
            language="bash"
            section="installation"
            copiedStates={copiedStates}
            onCopy={handleCopyCode}
          />
        </div>

        {/* Basic Usage */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Usage</h2>
          <CodeBlock 
            code={usageCode}
            language="jsx"
            section="usage"
            copiedStates={copiedStates}
            onCopy={handleCopyCode}
          />
        </div>

        {/* Shader Implementation */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Shader Implementation</h2>
          <p className="text-gray-300 mb-4">
            The blob effect is created using GLSL shaders. Here's a breakdown of the key shader components:
          </p>
          <CodeBlock 
            code={shaderCode}
            language="glsl"
            section="shader"
            copiedStates={copiedStates}
            onCopy={handleCopyCode}
          />
          <div className="mt-4 space-y-4">
            <h3 className="text-xl font-bold">Key Shader Features:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Simplex noise for organic movement</li>
              <li>Mouse interaction influence</li>
              <li>Smooth color transitions</li>
              <li>Dynamic blob shape morphing</li>
              <li>Edge smoothing and anti-aliasing</li>
              <li>Shine and highlight effects</li>
            </ul>
          </div>
        </div>

        {/* Mouse Interaction */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Mouse Interaction</h2>
          <p className="text-gray-300 mb-4">
            The blob responds to mouse movement using smooth interpolation:
          </p>
          <CodeBlock 
            code={mouseInteractionCode}
            language="javascript"
            section="mouse"
            copiedStates={copiedStates}
            onCopy={handleCopyCode}
          />
        </div>

        {/* Props Documentation */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Props</h2>
          <div className="rounded-lg bg-gray-800 p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 pr-4">Prop</th>
                  <th className="pb-4 pr-4">Type</th>
                  <th className="pb-4 pr-4">Default</th>
                  <th className="pb-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">width</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">'100%'</td>
                  <td className="py-4">Width of the gradient canvas</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">height</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">'400px'</td>
                  <td className="py-4">Height of the gradient canvas</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">color1</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number[]</td>
                  <td className="py-4 pr-4 font-mono">[0.2, 0.8, 1.0]</td>
                  <td className="py-4">First color in RGB format (0-1)</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">color2</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number[]</td>
                  <td className="py-4 pr-4 font-mono">[1.0, 0.2, 0.8]</td>
                  <td className="py-4">Second color in RGB format (0-1)</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">color3</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number[]</td>
                  <td className="py-4 pr-4 font-mono">[0.8, 0.2, 1.0]</td>
                  <td className="py-4">Third color in RGB format (0-1)</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-mono text-cyan-400">color4</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number[]</td>
                  <td className="py-4 pr-4 font-mono">[1.0, 0.8, 0.2]</td>
                  <td className="py-4">Fourth color in RGB format (0-1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Tips */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Performance Tips</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Use requestAnimationFrame for smooth animations</li>
            <li>Implement proper WebGL cleanup</li>
            <li>Use lerp for smooth transitions</li>
            <li>Optimize shader calculations</li>
            <li>Handle canvas resizing efficiently</li>
          </ul>
        </div>
      </section>
    </div>
    </div>
  );
};

export default BlobGradientPage; 
# Opened Files
## File Name
src/pages/components/blob-cursor.jsx
## File Content
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
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
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
    </div>
  );
};

export default BlobCursorPage; 
# Opened Files
## File Name
src/pages/components/morphing-svg.jsx
## File Content
import MorphingSvg from '../../components/animations/MorphingSvg';
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const MorphingSvgPage = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install framer-motion`;
  
  const usageCode = `import MorphingSvg from './components/MorphingSvg';

// Basic usage
<MorphingSvg />

// Custom configuration
<MorphingSvg 
  width={400}
  height={400}
  duration={1}
  colors={['#FF0080', '#7928CA', '#0070F3', '#00DFD8']}
  autoPlay={true}
  interval={2000}
/>`;
  
  const codeString = `import { motion } from 'framer-motion';
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
        className={\`relative \${className}\`}
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

export default MorphingSvg;`;

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
        <h1 className="text-5xl font-bold">Morphing SVG</h1>
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
        <MorphingSvg 
          width={400}
          height={400}
          className="mx-auto"
        />
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

export default MorphingSvgPage; 
# Opened Files
## File Name
src/pages/components/shader-gradient.jsx
## File Content
import { useState } from 'react';
import ShaderGradient from '../../components/animations/ShaderGradient';
import CodeBlock from '../../components/shared/CodeBlock';

const ShaderGradientPage = () => {
  const [settings, setSettings] = useState({
    color1: [1.0, 0.0, 0.5],
    color2: [0.0, 1.0, 0.8],
    color3: [0.5, 0.0, 1.0]
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

  const handleColorChange = (colorKey, index, value) => {
    setSettings(prev => ({
      ...prev,
      [colorKey]: [
        ...prev[colorKey].slice(0, index),
        parseFloat(value),
        ...prev[colorKey].slice(index + 1)
      ]
    }));
  };

  const installationCode = `npm install webgl`;

  const usageCode = `import ShaderGradient from './components/animations/ShaderGradient';

// Basic usage
<ShaderGradient />

// With custom colors
<ShaderGradient 
  color1={[1.0, 0.0, 0.5]}  // RGB values (0-1)
  color2={[0.0, 1.0, 0.8]}
  color3={[0.5, 0.0, 1.0]}
  width="100%"
  height="400px"
/>`;

  const codeString = `import { useRef, useEffect } from 'react';

const vertexShader = \`
  attribute vec4 position;
  attribute vec2 a_texCoord;
  varying vec2 vUv;
  
  void main() {
    vUv = a_texCoord;
    gl_Position = position;
  }
\`;

const fragmentShader = \`
  precision mediump float;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;

  void main() {
    // Shader implementation
  }
\`;

const ShaderGradient = ({ 
  width = '100%', 
  height = '400px',
  color1 = [1.0, 0.0, 0.5],
  color2 = [0.0, 1.0, 0.8],
  color3 = [0.5, 0.0, 1.0]
}) => {
  // Component implementation
};`;

  const ColorControl = ({ label, color, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-400 mb-1">R</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[0]}
            onChange={(e) => onChange(0, e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-400 mb-1">G</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[1]}
            onChange={(e) => onChange(1, e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-400 mb-1">B</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[2]}
            onChange={(e) => onChange(2, e.target.value)}
            className="w-full"
          />
        </div>
        <div 
          className="w-10 h-10 rounded-lg"
          style={{
            backgroundColor: `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Shader Gradient</h1>
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
      <div className="mb-8 rounded-lg bg-[#1a1d24] p-8">
        <ShaderGradient {...settings} height="400px" />
      </div>

      {/* Controls */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Color Controls</h2>
        <div className="space-y-6">
          <ColorControl
            label="Color 1"
            color={settings.color1}
            onChange={(index, value) => handleColorChange('color1', index, value)}
          />
          <ColorControl
            label="Color 2"
            color={settings.color2}
            onChange={(index, value) => handleColorChange('color2', index, value)}
          />
          <ColorControl
            label="Color 3"
            color={settings.color3}
            onChange={(index, value) => handleColorChange('color3', index, value)}
          />
        </div>
      </div>

      {/* Documentation */}
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
        <h2 className="mb-4 text-3xl font-bold">Implementation</h2>
        <CodeBlock 
          code={codeString}
          section="code"
          copiedStates={copiedStates}
          onCopy={handleCopyCode}
        />
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-bold">Props</h2>
        <div className="rounded-lg bg-gray-800 p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4">Prop</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Default</th>
                <th className="pb-4">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="py-2 font-mono text-cyan-400">width</td>
                <td className="py-2 font-mono text-purple-400">string</td>
                <td className="py-2 font-mono">'100%'</td>
                <td className="py-2">Width of the gradient canvas</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-cyan-400">height</td>
                <td className="py-2 font-mono text-purple-400">string</td>
                <td className="py-2 font-mono">'400px'</td>
                <td className="py-2">Height of the gradient canvas</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-cyan-400">color1</td>
                <td className="py-2 font-mono text-purple-400">number[]</td>
                <td className="py-2 font-mono">[1.0, 0.0, 0.5]</td>
                <td className="py-2">First color in RGB format (0-1)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-cyan-400">color2</td>
                <td className="py-2 font-mono text-purple-400">number[]</td>
                <td className="py-2 font-mono">[0.0, 1.0, 0.8]</td>
                <td className="py-2">Second color in RGB format (0-1)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-cyan-400">color3</td>
                <td className="py-2 font-mono text-purple-400">number[]</td>
                <td className="py-2 font-mono">[0.5, 0.0, 1.0]</td>
                <td className="py-2">Third color in RGB format (0-1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    </div>
  );
};

export default ShaderGradientPage; 
# Opened Files
## File Name
src/pages/components/string-animation.jsx
## File Content
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
# Opened Files
## File Name
src/Components/animations/FluidDistortion.tsx
## File Content
'use client'

import { useEffect, useRef, useState } from 'react'
import { Renderer, Camera, RenderTarget, Geometry, Program, Mesh, Color, Vec2, Box, NormalProgram, Post, Texture } from 'ogl'

const fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D tMap;
    uniform sampler2D tFluid;
    uniform sampler2D tImage;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
        vec3 fluid = texture2D(tFluid, vUv).rgb;
        vec2 uv = vUv - fluid.rg * 0.001;

        // Use the user's image instead of showing fluid on half the screen
        vec4 image = texture2D(tImage, uv);
        gl_FragColor = image;

        // Apply fluid distortion effect
        // gl_FragColor = mix(texture2D(tMap, uv), vec4(fluid * 0.1 + 0.5, 1), step(0.5, vUv.x));

        // Oscillate between fluid values and the distorted scene
        // gl_FragColor = mix(texture2D(tMap, uv), vec4(fluid * 0.1 + 0.5, 1), smoothstep(0.0, 0.7, sin(uTime)));
    }
`

const baseVertex = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = uv;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(position, 0, 1);
    }
`

const clearShader = /* glsl */ `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`

const splatShader = /* glsl */ `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`

const advectionShader = /* glsl */ `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
    }
`

const divergenceShader = /* glsl */ `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`

const curlShader = /* glsl */ `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`

const vorticityShader = /* glsl */ `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`

const pressureShader = /* glsl */ `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`

const gradientSubtractShader = /* glsl */ `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`

interface OGLRenderingContext extends WebGLRenderingContext {
  renderer: Renderer
  canvas: HTMLCanvasElement
  HALF_FLOAT: number
  RGBA16F: number
  RG16F: number
  R16F: number
  RG: number
  RED: number
}

const FluidSimulation = ({ width = '100px' }: { width?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [carouselImage, setCarouselImage] = useState<string | null>(null)
  const defaultImage = 'https://res.cloudinary.com/dgus6y6lm/image/upload/v1750953716/canva13_wu1dsc.png'

  useEffect(() => {
    // Fetch carousel images
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/carausel')
        const data = await response.json()
        if (data && data.length > 0) {
          // Get the first image URL from the carousel items
          setCarouselImage(data[0].imageUrl)
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error)
      }
    }

    fetchCarouselImages()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ dpr: 1 })
    const gl = renderer.gl as OGLRenderingContext
    container.appendChild(gl.canvas)
    gl.clearColor(0.098, 0.098, 0.141, 1.0)

    const camera = new Camera(gl, { fov: 35 })
    camera.position.set(0, 1, 5)
    camera.lookAt([0, 0, 0])

    const post = new Post(gl)

    // Load the user image
    const imageTexture = new Texture(gl)
    const img = new Image()
    img.crossOrigin = 'anonymous' // Enable CORS
    img.onload = () => {
      imageTexture.image = img
      // Start rendering once the image is loaded
      requestAnimationFrame(update)
    }
    img.onerror = () => {
      // If the carousel image fails to load, use the default image
      img.src = defaultImage
    }
    // Use carousel image if available, otherwise use default
    img.src = carouselImage || defaultImage

    function resize() {
      if (!container) return
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      renderer.setSize(containerWidth, containerHeight)
      camera.perspective({ aspect: containerWidth / containerHeight })
      post.resize()
    }
    window.addEventListener('resize', resize, false)
    resize()

    // Helper functions for larger device support
    function getSupportedFormat(gl: OGLRenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
          default:
            return null
        }
      }

      return { internalFormat, format }
    }

    function supportRenderTextureFormat(gl: OGLRenderingContext, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
      if (status != gl.FRAMEBUFFER_COMPLETE) return false
      return true
    }

    // Helper to create a ping-pong FBO pairing for simulating on GPU
    function createDoubleFBO(gl: OGLRenderingContext, { width, height, wrapS, wrapT, minFilter = gl.LINEAR, magFilter = minFilter, type, format, internalFormat, depth }: {
      width: number
      height: number
      wrapS?: number
      wrapT?: number
      minFilter?: number
      magFilter?: number
      type?: number
      format?: number
      internalFormat?: number
      depth?: boolean
    }) {
      const options = { width, height, wrapS, wrapT, minFilter, magFilter, type, format, internalFormat, depth }
      const fbo = {
        read: new RenderTarget(gl, options),
        write: new RenderTarget(gl, options),
        swap: () => {
          const temp = fbo.read
          fbo.read = fbo.write
          fbo.write = temp
        },
      }
      return fbo
    }

    // Resolution of simulation
    const simRes = 128
    const dyeRes = 512

    // Main inputs to control look and feel of fluid
    const iterations = 3
    const densityDissipation = 0.97
    const velocityDissipation = 0.98
    const pressureDissipation = 0.8
    const curlStrength = 20
    const radius = 0.9

    // Common uniform
    const texelSize = { value: new Vec2(1 / simRes, 1 / simRes) }

    // Get supported formats and types for FBOs
    const supportLinearFiltering = gl.renderer.extensions[`OES_texture_${gl.renderer.isWebgl2 ? `` : `half_`}float_linear`]
    const halfFloat = gl.renderer.isWebgl2 ? gl.HALF_FLOAT : gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES

    const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    let rgba, rg, r

    if (gl.renderer.isWebgl2) {
      rgba = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloat)
      rg = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloat)
      r = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloat)
    } else {
      rgba = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloat)
      rg = rgba
      r = rgba
    }

    // Create fluid simulation FBOs
    const density = createDoubleFBO(gl, {
      width: dyeRes,
      height: dyeRes,
      type: halfFloat,
      format: rgba?.format,
      internalFormat: rgba?.internalFormat,
      minFilter: filtering,
      depth: false,
    })

    const velocity = createDoubleFBO(gl, {
      width: simRes,
      height: simRes,
      type: halfFloat,
      format: rg?.format,
      internalFormat: rg?.internalFormat,
      minFilter: filtering,
      depth: false,
    })

    const pressure = createDoubleFBO(gl, {
      width: simRes,
      height: simRes,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: gl.NEAREST,
      depth: false,
    })

    const divergence = new RenderTarget(gl, {
      width: simRes,
      height: simRes,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: gl.NEAREST,
      depth: false,
    })

    const curl = new RenderTarget(gl, {
      width: simRes,
      height: simRes,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: gl.NEAREST,
      depth: false,
    })

    // Geometry to be used for the simulation programs
    const triangle = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    })

    // Create fluid simulation programs
    const clearProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: clearShader,
        uniforms: {
          texelSize,
          uTexture: { value: null },
          value: { value: pressureDissipation },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const splatProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: splatShader,
        uniforms: {
          texelSize,
          uTarget: { value: null },
          aspectRatio: { value: 1 },
          color: { value: new Color() },
          point: { value: new Vec2() },
          radius: { value: radius / 100 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const advectionProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: advectionShader,
        uniforms: {
          texelSize,
          dyeTexelSize: { value: new Vec2(1 / dyeRes) },
          uVelocity: { value: null },
          uSource: { value: null },
          dt: { value: 0.016 },
          dissipation: { value: 1 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const divergenceProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: divergenceShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const curlProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: curlShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const vorticityProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: vorticityShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
          uCurl: { value: null },
          curl: { value: curlStrength },
          dt: { value: 0.016 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const pressureProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: pressureShader,
        uniforms: {
          texelSize,
          uPressure: { value: null },
          uDivergence: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    const gradientSubtractProgram = new Mesh(gl, {
      geometry: triangle,
      program: new Program(gl, {
        vertex: baseVertex,
        fragment: gradientSubtractShader,
        uniforms: {
          texelSize,
          uPressure: { value: null },
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    interface Splat {
      x: number
      y: number
      dx: number
      dy: number
    }

    const splats: Splat[] = []

    // Create handlers to get mouse position and velocity
    const isTouchCapable = 'ontouchstart' in window
    if (isTouchCapable) {
      window.addEventListener('touchstart', updateMouse, false)
      window.addEventListener('touchmove', updateMouse, false)
    } else {
      window.addEventListener('mousemove', updateMouse, false)
    }

    const lastMouse = new Vec2()
    let isFirstMouseMove = true
    function updateMouse(e: MouseEvent | TouchEvent) {
      let x: number
      let y: number

      if ('touches' in e) {
        x = e.touches[0].pageX
        y = e.touches[0].pageY
      } else {
        x = (e as MouseEvent).pageX
        y = (e as MouseEvent).pageY
      }

      // Get container bounds
      if (!container) return
      const rect = container.getBoundingClientRect()
      const containerX = x - rect.left
      const containerY = y - rect.top

      if (isFirstMouseMove) {
        isFirstMouseMove = false
        lastMouse.set(containerX, containerY)
        return
      }

      const deltaX = containerX - lastMouse.x
      const deltaY = containerY - lastMouse.y

      lastMouse.set(containerX, containerY)

      if (Math.abs(deltaX) || Math.abs(deltaY)) {
        splats.push({
          x: containerX / rect.width,
          y: 1 - containerY / rect.height,
          dx: deltaX * 15,
          dy: deltaY * -15,
        })
      }
    }

    function splat({ x, y, dx, dy }: Splat) {
      splatProgram.program.uniforms.uTarget.value = velocity.read.texture
      splatProgram.program.uniforms.aspectRatio.value = gl.renderer.width / gl.renderer.height
      splatProgram.program.uniforms.point.value.set(x, y)
      splatProgram.program.uniforms.color.value.set(dx, dy, 1)

      gl.renderer.render({
        scene: splatProgram,
        target: velocity.write,
        sort: false,
        update: false,
      })
      velocity.swap()

      splatProgram.program.uniforms.uTarget.value = density.read.texture

      gl.renderer.render({
        scene: splatProgram,
        target: density.write,
        sort: false,
        update: false,
      })
      density.swap()
    }

    // Create initial scene
    const geometry = new Box(gl)
    const mesh = new Mesh(gl, { geometry, program: new NormalProgram(gl) })

    for (let i = 0; i < 20; i++) {
      const m = new Mesh(gl, { geometry, program: new NormalProgram(gl) })
      m.position.set(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5)
      m.rotation.set(Math.random() * 6.28 - 3.14, Math.random() * 6.28 - 3.14, 0)
      m.scale.set(Math.random() * 0.5 + 0.1)
      m.setParent(mesh)
    }

    const pass = post.addPass({
      fragment,
      uniforms: {
        tFluid: { value: null },
        tImage: { value: imageTexture },
        uTime: { value: 0 },
      },
    })

    function update(t: number) {
      requestAnimationFrame(update)

      gl.renderer.autoClear = false

      for (let i = splats.length - 1; i >= 0; i--) {
        splat(splats.splice(i, 1)[0])
      }

      curlProgram.program.uniforms.uVelocity.value = velocity.read.texture

      gl.renderer.render({
        scene: curlProgram,
        target: curl,
        sort: false,
        update: false,
      })

      vorticityProgram.program.uniforms.uVelocity.value = velocity.read.texture
      vorticityProgram.program.uniforms.uCurl.value = curl.texture

      gl.renderer.render({
        scene: vorticityProgram,
        target: velocity.write,
        sort: false,
        update: false,
      })
      velocity.swap()

      divergenceProgram.program.uniforms.uVelocity.value = velocity.read.texture

      gl.renderer.render({
        scene: divergenceProgram,
        target: divergence,
        sort: false,
        update: false,
      })

      clearProgram.program.uniforms.uTexture.value = pressure.read.texture

      gl.renderer.render({
        scene: clearProgram,
        target: pressure.write,
        sort: false,
        update: false,
      })
      pressure.swap()

      pressureProgram.program.uniforms.uDivergence.value = divergence.texture

      for (let i = 0; i < iterations; i++) {
        pressureProgram.program.uniforms.uPressure.value = pressure.read.texture

        gl.renderer.render({
          scene: pressureProgram,
          target: pressure.write,
          sort: false,
          update: false,
        })
        pressure.swap()
      }

      gradientSubtractProgram.program.uniforms.uPressure.value = pressure.read.texture
      gradientSubtractProgram.program.uniforms.uVelocity.value = velocity.read.texture

      gl.renderer.render({
        scene: gradientSubtractProgram,
        target: velocity.write,
        sort: false,
        update: false,
      })
      velocity.swap()

      advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / simRes)
      advectionProgram.program.uniforms.uVelocity.value = velocity.read.texture
      advectionProgram.program.uniforms.uSource.value = velocity.read.texture
      advectionProgram.program.uniforms.dissipation.value = velocityDissipation

      gl.renderer.render({
        scene: advectionProgram,
        target: velocity.write,
        sort: false,
        update: false,
      })
      velocity.swap()

      advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / dyeRes)
      advectionProgram.program.uniforms.uVelocity.value = velocity.read.texture
      advectionProgram.program.uniforms.uSource.value = density.read.texture
      advectionProgram.program.uniforms.dissipation.value = densityDissipation

      gl.renderer.render({
        scene: advectionProgram,
        target: density.write,
        sort: false,
        update: false,
      })
      density.swap()

      gl.renderer.autoClear = true

      pass.uniforms.tFluid.value = density.read.texture
      pass.uniforms.uTime.value = t * 0.001

      mesh.rotation.y -= 0.0025
      mesh.rotation.x -= 0.005

      post.render({ scene: mesh, camera })
    }

    requestAnimationFrame(update)

    return () => {
      window.removeEventListener('resize', resize)
      if (isTouchCapable) {
        window.removeEventListener('touchstart', updateMouse)
        window.removeEventListener('touchmove', updateMouse)
      } else {
        window.removeEventListener('mousemove', updateMouse)
      }
      container.removeChild(gl.canvas)
      img.remove()
    }
  }, [carouselImage])

    return <div ref={containerRef} className="relative" style={{ width, height: '400px' }} />
}

export default FluidSimulation 
# Opened Files
## File Name
src/App.jsx
## File Content
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Robo from './Components/Robo';
import ComponentsShowcase from './Components/ComponentsShowcase';
import Layout from './components/layout/Layout';
// import SplitText from './components/animations/SplitText';
import SplitTextPage from './pages/components/split-text';
import BlurTextPage from './pages/components/blur-text';
import WaveTextPage from './pages/components/WaveTextPage';
import ShinyTextPage from './pages/components/ShinyTextPage';
import CountUpPage from './pages/components/CountUpPage';
import DecryptedTextPage from './pages/components/decrypted-text';
import BlobCursorPage from './pages/components/blob-cursor';
import MagneticButtonPage from './pages/components/magnetic-button';
import ShaderGradientPage from './pages/components/shader-gradient';
import BlobGradientPage from './pages/components/blob-gradient';
import MorphingSvgPage from './pages/components/morphing-svg';
import StringAnimationPage from './pages/components/string-animation';
import CarouselPage from './pages/components/carousel';
import CardSwiperPage from './pages/components/card-swiper';
import FluidDistortionPage from './pages/components/fluid-distortion';

// import AnimatedContainerPage from './pages/components/AnimatedContainer';
// ... import other component pages

function App() {
  // const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode='wait'>
        {/* {loading ? (
          <Loader setLoading={setLoading} key="loader" />
        ) : ( */}
          <Routes>
            {/* Home route with Robo and ComponentsShowcase */}
            <Route 
              path="/" 
              element={
                <div className="bg-black min-h-screen relative">
                  <div className="h-screen">
                    <Robo/>
                  </div>
                  <div className="relative z-10">
                    <ComponentsShowcase/>
                  </div>
                </div>
              } 
            />

            {/* Documentation routes wrapped in Layout */}
            <Route 
              path="/components/*" 
              element={
                <Layout>
                  <Routes>
                    <Route path="/split-text" element={<SplitTextPage />} />
                    <Route path="/blur-text" element={<BlurTextPage />} />
                    <Route path="/wave-text" element={<WaveTextPage />} />
                    <Route path="/shiny-text" element={<ShinyTextPage />} />
                    <Route path="/count-up" element={<CountUpPage />} />
                    <Route path="/decrypted-text" element={<DecryptedTextPage />} />
                    <Route path="/blob-cursor" element={<BlobCursorPage/>} />
                    <Route path="/magnet" element={<MagneticButtonPage/>} />
                    <Route path="/shader-gradient" element={<ShaderGradientPage/>} />
                    <Route path="/blob-gradient" element={<BlobGradientPage/>} />
                    <Route path="/morphing-svg" element={<MorphingSvgPage/>} />
                    <Route path="/string-animation" element={<StringAnimationPage/>} />
                    <Route path="/card-carousel" element={<CarouselPage/>} />
                    <Route path="/card-swiper" element={<CardSwiperPage/>} />
                    <Route path="/fluid-distortion" element={<FluidDistortionPage/>} />
             
                    {/* Add more component routes here */}
                  </Routes>
                </Layout>
              } 
            />
          </Routes>
        {/* )} */}
      </AnimatePresence>
    </Router>
  )
}

export default App
# Opened Files
## File Name
src/Components/layout/Sidebar.jsx
## File Content
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const categories = [
    {
      title: "Text Animations",
      items: [
        { name: "Split Text", isNew: false },
        { name: "Blur Text", isNew: false },
        { name: "Shiny Text", isNew: false },
        { name: "Decrypted Text", isNew: true },
        { name: "Count Up", isNew: false },
        { name: "Gradient Text", isNew: false },
        { name: "True Focus", isNew: true },
        { name: "Variable Proximity", isNew: true },
      ]
    },
    {
      title: "Animations",
      items: [
        { name: "Animated Content", isNew: false },
        { name: "Fade Content", isNew: false },
        { name: "Magnet Lines", isNew: false },
        { name: "Magnet", isNew: false },
        { name: "Noise", isNew: true },
        { name: "Crosshair", isNew: false },
        { name: "Splash Cursor", isNew: false },
        { name: "Follow Cursor", isNew: false },
        { name: "Blob Cursor", isNew: false },
        { name: "Star Border", isNew: false }
      ]
    },
    {
      title: "Components",
      items: [
        { name: "Morphing SVG", isNew: true },
        { name: "Card Carousel", isNew: true },
        { name: "Card Swiper", isNew: true },
        { name: "Fluid Distortion", isNew: true },
        { name: "Shader Gradient", isNew: true },
        { name: "Blob Gradient", isNew: true },
        { name: "String Animation", isNew: true },
      
        { name: "Stack", isNew: false },
        { name: "Dock", isNew: true },
        { name: "Masonry", isNew: false },
        { name: "Magnetic Button", isNew: true },
        { name: "Particle Text", isNew: true },
        { name: "Liquid Wave", isNew: true },
        { name: "Glitch Effect", isNew: true },
        
      ]
    }
  ];

  const isActive = (itemName) => {
    const path = `/components/${itemName.toLowerCase().replace(/\s+/g, '-')}`;
    return location.pathname === path;
  };

  return (
    <aside className="w-64 border-r border-gray-800 p-6 overflow-x-hidden">
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <Link 
                  to={`/components/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`transition-colors ${
                    isActive(item.name) 
                      ? 'text-cyan-400 font-medium' 
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </Link>
                {item.isNew && (
                  <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar; 
# Opened Files
## File Name
src/Components/animations/CardSwiper.jsx
## File Content
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const CardSwiper = ({ 
  images = [], 
  className = '',
  grabCursor = true,
  effect = 'cards',
  loop = true,
  autoplay = false,
  autoplayDelay = 3000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Default images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww'
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={`card-swiper-container ${className}`}>
      <Swiper
        effect={effect}
        grabCursor={grabCursor}
        modules={[EffectCards]}
        className="mySwiper"
        loop={loop}
        autoplay={autoplay ? { delay: autoplayDelay } : false}
        onSlideChange={handleSlideChange}
        style={{
          width: '100%',
          height: '400px'
        }}
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="card-content">
              <img 
                src={image} 
                alt={`Card ${index + 1}`}
                className="card-image"
                onError={(e) => {
                  e.target.src = defaultImages[index % defaultImages.length];
                }}
              />
              <div className="card-overlay">
                <h3 className="card-title">Card {index + 1}</h3>
                <p className="card-description">Swipe to explore more</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation indicators */}
      <div className="swiper-indicators">
        {displayImages.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              // This would need swiper instance to work properly
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .card-swiper-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .mySwiper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .swiper-slide {
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: white;
          padding: 20px;
          border-radius: 0 0 20px 20px;
        }

        .card-title {
          margin: 0 0 5px 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .card-description {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .swiper-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #667eea;
          transform: scale(1.2);
        }

        /* Custom Swiper styles */
        .swiper-slide {
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .swiper-slide-active {
          transform: scale(1);
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

CardSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  grabCursor: PropTypes.bool,
  effect: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number
};

export default CardSwiper; 
# Opened Files
## File Name
src/pages/components/card-swiper.jsx
## File Content
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import CardSwiper from '../../Components/animations/CardSwiper';

const CardSwiperPage = () => {
  const [settings, setSettings] = useState({
    grabCursor: true,
    loop: true,
    autoplay: false,
    autoplayDelay: 3000
  });

  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install swiper`;

  const usageCode = `import CardSwiper from './components/animations/CardSwiper';

// Basic usage
<CardSwiper />

// With custom images
<CardSwiper 
  images={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]}
  grabCursor={true}
  loop={true}
  autoplay={false}
/>`;

  const codeString = `import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const CardSwiper = ({ 
  images = [], 
  className = '',
  grabCursor = true,
  effect = 'cards',
  loop = true,
  autoplay = false,
  autoplayDelay = 3000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Default images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww'
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={\`card-swiper-container \${className}\`}>
      <Swiper
        effect={effect}
        grabCursor={grabCursor}
        modules={[EffectCards]}
        className="mySwiper"
        loop={loop}
        autoplay={autoplay ? { delay: autoplayDelay } : false}
        onSlideChange={handleSlideChange}
        style={{
          width: '100%',
          height: '400px'
        }}
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="card-content">
              <img 
                src={image} 
                alt={\`Card \${index + 1}\`}
                className="card-image"
                onError={(e) => {
                  e.target.src = defaultImages[index % defaultImages.length];
                }}
              />
              <div className="card-overlay">
                <h3 className="card-title">Card {index + 1}</h3>
                <p className="card-description">Swipe to explore more</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation indicators */}
      <div className="swiper-indicators">
        {displayImages.map((_, index) => (
          <div 
            key={index}
            className={\`indicator \${index === activeIndex ? 'active' : ''}\`}
          />
        ))}
      </div>
    </div>
  );
};

CardSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  grabCursor: PropTypes.bool,
  effect: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number
};

export default CardSwiper;`;

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
          <h1 className="text-5xl font-bold">Card Swiper</h1>
          <div className="flex gap-4">
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">👁️ Preview</span>
            </button>
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">⌨️ Code</span>
            </button>
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">❤️ Contribute</span>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="mb-8 rounded-lg bg-[#1a1d24] p-8">
          <CardSwiper {...settings} />
        </div>

        {/* Controls */}
        <div className="mb-8 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold">Controls</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.grabCursor}
                  onChange={(e) => setSettings(prev => ({ ...prev, grabCursor: e.target.checked }))}
                  className="rounded"
                />
                <span>Grab Cursor</span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.loop}
                  onChange={(e) => setSettings(prev => ({ ...prev, loop: e.target.checked }))}
                  className="rounded"
                />
                <span>Loop</span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.autoplay}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoplay: e.target.checked }))}
                  className="rounded"
                />
                <span>Autoplay</span>
              </label>
            </div>

            {settings.autoplay && (
              <div className="flex items-center gap-4">
                <span className="text-white w-32">Delay (ms):</span>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={settings.autoplayDelay}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoplayDelay: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-white w-12">{settings.autoplayDelay}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">🎴 Card Effect</h3>
              <p className="text-gray-300 mb-3">
                Beautiful card-stack effect with smooth transitions and scaling animations.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 3D card stacking effect</li>
                <li>• Smooth scaling animations</li>
                <li>• Gradient overlays</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">🖱️ Interactive Controls</h3>
              <p className="text-gray-300 mb-3">
                Drag, swipe, and touch gestures for intuitive navigation through cards.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Drag to navigate</li>
                <li>• Touch gesture support</li>
                <li>• Grab cursor feedback</li>
                <li>• Auto-play option</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Installation</h2>
          <CodeBlock code={installationCode} language="bash" section="installation" />
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Usage</h2>
          <CodeBlock code={usageCode} section="usage" />
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Props</h2>
          <div className="rounded-lg bg-gray-800 p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 pr-4">Prop</th>
                  <th className="pb-4 pr-4">Type</th>
                  <th className="pb-4 pr-4">Default</th>
                  <th className="pb-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">images</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string[]</td>
                  <td className="py-4 pr-4 font-mono">[]</td>
                  <td className="py-4">Array of image URLs to display</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">grabCursor</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">boolean</td>
                  <td className="py-4 pr-4 font-mono">true</td>
                  <td className="py-4">Show grab cursor on hover</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">loop</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">boolean</td>
                  <td className="py-4 pr-4 font-mono">true</td>
                  <td className="py-4">Enable infinite loop</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">autoplay</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">boolean</td>
                  <td className="py-4 pr-4 font-mono">false</td>
                  <td className="py-4">Enable automatic sliding</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-mono text-cyan-400">autoplayDelay</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number</td>
                  <td className="py-4 pr-4 font-mono">3000</td>
                  <td className="py-4">Delay between autoplay slides (ms)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-bold">Implementation</h2>
          <CodeBlock code={codeString} section="code" />
        </section>
      </div>
    </div>
  );
};

export default CardSwiperPage; 
# Opened Files
## File Name
src/pages/components/fluid-distortion.jsx
## File Content
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import FluidSimulation from '../../Components/animations/FluidDistortion';

const FluidDistortionPage = () => {
  const [settings, setSettings] = useState({
    intensity: 0.0005,
    imageUrl: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
  });

  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install ogl`;

  const usageCode = `import FluidDistortion from './components/animations/FluidDistortion';

// Basic usage
<FluidDistortion />

// With custom image and intensity
<FluidDistortion 
  imageUrl="https://your-image-url.com/image.jpg"
  intensity={0.0005}
  width="100%"
  height="500px"
/>`;

  const codeString = `import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FluidDistortion = ({ 
  imageUrl = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  width = '100%',
  height = '400px',
  intensity = 0.0002,
  className = ''
}) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamic import of OGL to avoid SSR issues
    const initFluidSimulation = async () => {
      try {
        const { Renderer, Camera, RenderTarget, Geometry, Program, Mesh, Color, Vec2, Box, NormalProgram, Post, Texture } = await import('ogl');

        // GLSL shaders for fluid simulation
        const fragment = /* glsl */ \`
          precision highp float;
          uniform sampler2D tFluid;
          uniform sampler2D tImage;
          uniform float uTime;
          uniform float uIntensity;
          varying vec2 vUv;

          void main() {
            vec3 fluid = texture2D(tFluid, vUv).rgb;
            vec2 uv = vUv - fluid.rg * uIntensity;
            vec4 image = texture2D(tImage, uv);
            gl_FragColor = image;
          }
        \`;

        // ... rest of the fluid simulation implementation
        // (Full implementation with all shaders and WebGL setup)
      } catch (error) {
        console.error('Error initializing fluid simulation:', error);
      }
    };

    initFluidSimulation();
  }, [imageUrl, intensity]);

  return (
    <div 
      ref={containerRef} 
      className={\`relative \${className}\`}
      style={{ width, height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-lg">Loading fluid simulation...</div>
        </div>
      )}
    </div>
  );
};

FluidDistortion.propTypes = {
  imageUrl: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  intensity: PropTypes.number,
  className: PropTypes.string
};

export default FluidDistortion;`;

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

  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Nature'
    },
    
  ];

  return (
    <div className='flex justify-center items-center'> 
      <div className="max-w-5xl w-full">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-5xl font-bold">Fluid Distortion</h1>
          <div className="flex gap-4">
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">👁️ Preview</span>
            </button>
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">⌨️ Code</span>
            </button>
            <button className="rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700">
              <span className="flex items-center gap-2">❤️ Contribute</span>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="mb-8 rounded-lg bg-[#1a1d24] p-8">
          <FluidSimulation width="900px" />
        </div>

        {/* Controls */}
        <div className="mb-8 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold">Controls</h2>
          
          <div className="space-y-6">
            {/* Intensity Control */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distortion Intensity: {settings.intensity}
              </label>
              <input
                type="range"
                min="0"
                max="0.001"
                step="0.0001"
                value={settings.intensity}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  intensity: parseFloat(e.target.value) 
                }))}
                className="w-full"
              />
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sample Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sampleImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSettings(prev => ({ ...prev, imageUrl: image.url }))}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      settings.imageUrl === image.url 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-20 object-cover rounded"
                    />
                    <p className="text-xs text-gray-300 mt-1">{image.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Custom Image URL
              </label>
              <input
                type="url"
                value={settings.imageUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Enter image URL..."
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">🌊 Real-time Fluid Simulation</h3>
              <p className="text-gray-300 mb-3">
                Advanced WebGL-based fluid dynamics with realistic physics simulation.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• GPU-accelerated computation</li>
                <li>• Realistic fluid behavior</li>
                <li>• Smooth particle advection</li>
                <li>• Pressure and velocity fields</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">🎨 Interactive Distortion</h3>
              <p className="text-gray-300 mb-3">
                Mouse and touch interaction creates fluid disturbances that distort images.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Mouse movement tracking</li>
                <li>• Touch gesture support</li>
                <li>• Adjustable distortion intensity</li>
                <li>• Real-time visual feedback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Installation</h2>
          <CodeBlock code={installationCode} language="bash" section="installation" />
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Usage</h2>
          <CodeBlock code={usageCode} section="usage" />
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Props</h2>
          <div className="rounded-lg bg-gray-800 p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 pr-4">Prop</th>
                  <th className="pb-4 pr-4">Type</th>
                  <th className="pb-4 pr-4">Default</th>
                  <th className="pb-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">imageUrl</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">Nature image</td>
                  <td className="py-4">URL of the image to apply fluid distortion to</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">width</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">'100%'</td>
                  <td className="py-4">Width of the fluid simulation canvas</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">height</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">'400px'</td>
                  <td className="py-4">Height of the fluid simulation canvas</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 pr-4 font-mono text-cyan-400">intensity</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">number</td>
                  <td className="py-4 pr-4 font-mono">0.0002</td>
                  <td className="py-4">Strength of the fluid distortion effect</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-mono text-cyan-400">className</td>
                  <td className="py-4 pr-4 font-mono text-purple-400">string</td>
                  <td className="py-4 pr-4 font-mono">''</td>
                  <td className="py-4">Additional CSS classes for styling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-bold">Implementation</h2>
          <CodeBlock code={codeString} section="code" />
        </section>
      </div>
    </div>
  );
};

export default FluidDistortionPage; 
