import { Highlight, themes } from 'prism-react-renderer';
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

export default CodeBlock; 