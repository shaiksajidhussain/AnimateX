import { useRef, useState, useEffect } from 'react';
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
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Nature Explorer",
      subtitle: "Breathe the wild",
      tag: "The North Face",
      highlight: "Adventure Awaits"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Gourmet Getaway",
      subtitle: "Travel for flavors",
      tag: "Singapore Airlines",
      highlight: "Foodie Trips"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Street Style",
      subtitle: "Urban fashion",
      tag: "ZARA",
      highlight: "City Vibes"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Tech Nomad",
      subtitle: "Work from anywhere",
      tag: "Apple",
      highlight: "Digital Life"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Sunset Surfer",
      subtitle: "Feel the waves",
      tag: "Quiksilver",
      highlight: "Beach Life"
    },
      
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1080&q=75",
      title: "Creative Mind",
      subtitle: "Design. Create. Inspire.",
      tag: "Adobe",
      highlight: "Think Different"
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
    <div className={`w-full ${className}`}>
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
          className={`w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
                <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 h-80 ${
                  isDragging ? 'scale-95 transition-transform duration-150' : ''
                }`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isDragging ? 'scale-105' : 'group-hover:scale-110'
                      }`}
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }`}
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

export default Carousel; 