import { useState } from 'react';
import MagneticButton from '../../Components/animations/MagneticButton';
import CodeBlock from '../../Components/shared/CodeBlock';



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