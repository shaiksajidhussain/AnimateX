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