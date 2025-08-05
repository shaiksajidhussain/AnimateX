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