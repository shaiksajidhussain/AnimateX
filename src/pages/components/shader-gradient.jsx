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