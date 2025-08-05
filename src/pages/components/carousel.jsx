import Carousel from '../../Components/animations/Carousel'
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

const CarouselPage = () => {
  const [copiedStates, setCopiedStates] = useState({
    installation: false,
    usage: false,
    code: false
  });

  const installationCode = `npm install swiper`;
  
  const usageCode = `import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCards, Autoplay } from 'swiper/modules';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';

const Carousel = ({ 
  cards = [],
  className = "",
  showPagination = true,
  showNavigation = true,
  autoplay = true,
  loop = true,
  enableDrag = true,
  dragSensitivity = 1,
  grabCursor = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swiperRef = useRef(null);

  const defaultCards = [
    {
      id: 1,
      image: "https://skiper-ui.com/_next/image?url=%2Fcard%2F1.png&w=1080&q=75",
      title: "Outdoor persona",
      subtitle: "Capturing the moment",
      tag: "The North Face",
      highlight: "Outdoor persona"
    },
    {
      id: 2,
      image: "https://skiper-ui.com/_next/image?url=%2Fcard%2F2.png&w=640&q=75",
      title: "Travel for food",
      subtitle: "Foodie",
      tag: "Singapore Airlines",
      highlight: "Foodie"
    },
      {
        id: 3,
        image: "https://skiper-ui.com/_next/image?url=%2Fcard%2F3.png&w=1080&q=75",
        title: "Chic Girl",
        subtitle: "Girl-up",
        tag: "Singapore Airlines",
        highlight: "Girl-up"
      },
      {
        id: 4,
        image: "https://skiper-ui.com/_next/image?url=%2Fcard%2F4.png&w=1080&q=75",
        title: "Chic Girl",
        subtitle: "Girl-up",
        tag: "Singapore Airlines",
        highlight: "Girl-up"
      },
      
      {
        id: 5,
        image: "https://skiper-ui.com/_next/image?url=%2Fcard%2F5.png&w=1080&q=75",
        title: "Chic Girl",
        subtitle: "Girl-up",
        tag: "Singapore Airlines",
        highlight: "Girl-up"
      }     
  ];

  const cardsToShow = cards.length > 0 ? cards : defaultCards;

  const handleSlideChange = (swiper) => {
    // Use realIndex for loop functionality, fallback to activeIndex
    const currentIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
    setActiveIndex(currentIndex);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Force autoplay to start
  useEffect(() => {
    if (swiperRef.current && autoplay) {
      const timer = setTimeout(() => {
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.autoplay.start();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoplay]);

  return (
    <div className={\`w-full \${className}\`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            <span className="text-yellow-500">★</span>
            Latest component
            <span className="text-gray-400">+</span>
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Card Carousel</h2>
        <p className="text-gray-600">Seamless Images carousel animation with drag support.</p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation, EffectCards, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={loop}
          allowTouchMove={enableDrag}
          touchRatio={dragSensitivity}
          grabCursor={grabCursor}
          resistance={true}
          resistanceRatio={0.85}
          autoplay={autoplay ? { 
            delay: 2000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: true
          } : false}
          pagination={showPagination ? {
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          } : false}
          navigation={showNavigation ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          } : false}
          onSlideChange={handleSlideChange}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onSwiper={(swiper) => {
            if (autoplay) {
              setTimeout(() => {
                swiper.autoplay.start();
              }, 100);
            }
          }}
          className={\`w-full \${isDragging ? 'cursor-grabbing' : 'cursor-grab'}\`}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {cardsToShow.map((card, index) => (
            <SwiperSlide key={card.id || index} className="py-4">
              <div className="relative group">
                {/* Card */}
                <div className={\`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 h-80 \${
                  isDragging ? 'scale-95 transition-transform duration-150' : ''
                }\`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={\`w-full h-full object-cover transition-transform duration-300 \${
                        isDragging ? 'scale-105' : 'group-hover:scale-110'
                      }\`}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium text-red-500 bg-red-50 rounded-full">
                        {card.highlight}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        {card.subtitle}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        {card.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-gray-900 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Drag Indicator */}
        {enableDrag && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {isDragging ? '🔄 Dragging...' : '👆 Drag to navigate'}
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      {showPagination && (
        <div className="flex justify-center mt-8">
          <div className="swiper-pagination flex gap-2">
            {cardsToShow.map((_, index) => (
              <button
                key={index}
                className={\`w-3 h-3 rounded-full transition-all duration-300 \${
                  index === activeIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }\`}
                onClick={() => swiperRef.current?.swiper.slideTo(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Active Card Indicator */}
      <div className="text-center mt-4">
        <div className="flex justify-center gap-1">
          {cardsToShow.map((_, index) => (
            <div
              key={index}
              className={\`w-2 h-2 rounded-full transition-all duration-300 \${
                index === activeIndex 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }\`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      tag: PropTypes.string,
      highlight: PropTypes.string
    })
  ),
  className: PropTypes.string,
  showPagination: PropTypes.bool,
  showNavigation: PropTypes.bool,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  enableDrag: PropTypes.bool,
  dragSensitivity: PropTypes.number,
  grabCursor: PropTypes.bool
};

export default Carousel; `;

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
    // PropTypes validation for CodeBlock component
    if (!code || typeof code !== 'string') {
      return null;
    }
    
    return (
    <div className="relative rounded-lg bg-gray-900 p-4 overflow-x-auto ">
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
      
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Card Carousel</h1>
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

      <div className="mb-8 rounded-lg bg-[#F4F4F4] p-8">
        <Carousel />
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Installation</h2>
        <CodeBlock code={installationCode} language="bash" section="installation" />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Usage</h2>
        <CodeBlock code={usageCode} section="usage" />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Drag Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🖱️ Mouse Drag</h3>
            <p className="text-gray-600 mb-3">Click and drag to navigate through cards with smooth transitions.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Visual feedback during drag</li>
              <li>• Cursor changes to grab/grabbing</li>
              <li>• Cards scale down while dragging</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📱 Touch Support</h3>
            <p className="text-gray-600 mb-3">Full touch support for mobile devices with swipe gestures.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Swipe left/right to navigate</li>
              <li>• Touch sensitivity control</li>
              <li>• Resistance at boundaries</li>
            </ul>
          </div>
        </div>
      </section>


    </div>
    </div>
  );
};

export default CarouselPage;