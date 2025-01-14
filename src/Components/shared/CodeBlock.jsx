import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CodeBlock = ({ 
  code, 
  language = 'javascript',
  section = 'code',
  copiedStates = {},
  onCopy = async () => {} 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy(code, section);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          aria-label="Copy code"
        >
          {isCopied ? (
            <FiCheck className="w-5 h-5 text-green-400" />
          ) : (
            <FiCopy className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E1E1E',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock; 