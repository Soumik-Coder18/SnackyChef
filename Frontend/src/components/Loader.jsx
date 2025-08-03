

import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Loader.json';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
    </div>
  );
};

export default Loader;