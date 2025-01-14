import { useState } from 'react';
import AnimatedContainer from './AnimatedContainer';

const AnimatedContainerPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        {isVisible ? 'Collapse' : 'Expand'} Container
      </button>

      <AnimatedContainer
        isVisible={isVisible}
        initialHeight="0px"
        expandedHeight="200px"
        initialWidth="300px"
        expandedWidth="300px"
        duration={0.8}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-md shadow-lg"
      >
        <p className="text-center text-lg">This is your animated container!</p>
      </AnimatedContainer>
    </div>
  );
};

export default AnimatedContainerPage;
