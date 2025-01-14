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
    <div className="max-w-4xl">
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
  );
};

export default BlobGradientPage; 