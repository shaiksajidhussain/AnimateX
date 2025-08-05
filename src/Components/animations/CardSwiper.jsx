import React, { useRef, useState } from 'react';
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
    <div className={`card-swiper-container ${className}`}>
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
                alt={`Card ${index + 1}`}
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
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              // This would need swiper instance to work properly
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .card-swiper-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .mySwiper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .swiper-slide {
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: white;
          padding: 20px;
          border-radius: 0 0 20px 20px;
        }

        .card-title {
          margin: 0 0 5px 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .card-description {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .swiper-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #667eea;
          transform: scale(1.2);
        }

        /* Custom Swiper styles */
        .swiper-slide {
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .swiper-slide-active {
          transform: scale(1);
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          transform: scale(0.9);
        }
      `}</style>
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

export default CardSwiper; 