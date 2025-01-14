import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const BlobCursor = ({ 
  color = '#00f0ff',
  shape = 'circle',
  size = 20,
  blur = 5
}) => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Main cursor
      const mainSize = size;
      cursor.style.transform = `translate(${clientX - mainSize/2}px, ${clientY - mainSize/2}px)`;
      
      // Follower blob (larger and delayed)
      const followerSize = size * 2;
      follower.style.transform = `translate(${clientX - followerSize/2}px, ${clientY - followerSize/2}px)`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [size]);

  const cursorStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: shape === 'circle' ? '50%' : '0',
    filter: `blur(${blur}px)`,
    transition: 'transform 0.1s ease',
    zIndex: 9999,
    top: 0,
    left: 0,
    mixBlendMode: 'difference'
  };

  const followerStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    width: `${size * 2}px`,
    height: `${size * 2}px`,
    backgroundColor: color,
    borderRadius: shape === 'circle' ? '50%' : '0',
    filter: `blur(${blur * 2}px)`,
    transition: 'transform 0.3s ease',
    zIndex: 9998,
    top: 0,
    left: 0,
    mixBlendMode: 'difference'
  };

  return (
    <>
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={followerRef} style={followerStyle} />
    </>
  );
};

BlobCursor.propTypes = {
  color: PropTypes.string,
  shape: PropTypes.oneOf(['circle', 'square']),
  size: PropTypes.number,
  blur: PropTypes.number
};

export default BlobCursor; 