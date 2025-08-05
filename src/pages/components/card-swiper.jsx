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