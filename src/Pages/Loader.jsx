import React from 'react';

const Loader = () => {
  return (
    <div className="relative w-24 h-24 transform rotate-45 bg-black">
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <div className="loader-square absolute top-0 left-0 w-7 h-7 m-0.5 bg-white"></div>
      <style >{`
        @keyframes square-animation {
          0% { left: 0; top: 0; }
          10.5% { left: 0; top: 0; }
          12.5% { left: 32px; top: 0; }
          23% { left: 32px; top: 0; }
          25% { left: 64px; top: 0; }
          35.5% { left: 64px; top: 0; }
          37.5% { left: 64px; top: 32px; }
          48% { left: 64px; top: 32px; }
          50% { left: 32px; top: 32px; }
          60.5% { left: 32px; top: 32px; }
          62.5% { left: 32px; top: 64px; }
          73% { left: 32px; top: 64px; }
          75% { left: 0; top: 64px; }
          85.5% { left: 0; top: 64px; }
          87.5% { left: 0; top: 32px; }
          98% { left: 0; top: 32px; }
          100% { left: 0; top: 0; }
        }

        .loader-square {
          animation: square-animation 10s ease-in-out infinite both;
        }

        .loader-square:nth-of-type(1) { animation-delay: 0s; }
        .loader-square:nth-of-type(2) { animation-delay: -1.4285714286s; }
        .loader-square:nth-of-type(3) { animation-delay: -2.8571428571s; }
        .loader-square:nth-of-type(4) { animation-delay: -4.2857142857s; }
        .loader-square:nth-of-type(5) { animation-delay: -5.7142857143s; }
        .loader-square:nth-of-type(6) { animation-delay: -7.1428571429s; }
        .loader-square:nth-of-type(7) { animation-delay: -8.5714285714s; }
      `}</style>
    </div>
  );
};

export default Loader;