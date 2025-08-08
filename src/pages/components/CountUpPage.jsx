import { useState } from 'react';
import CountUp from '../../Components/animations/CountUp';
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
