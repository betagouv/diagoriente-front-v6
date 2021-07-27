import React from 'react';
import AppLoader from './AppLoader';

const FullScreenLoader = () => (
  <div className="fixed top-0 left-0 h-screen w-screen bg-lena-lightgray opacity-80 flex items-center justify-center z-50">
    <div className="flex flex-col justify-center items-center space-y-8">
      <AppLoader variant="blue" />
      <div className="text-2xl text-lena-black">Chargement ...</div>
    </div>
  </div>
);

export default FullScreenLoader;
