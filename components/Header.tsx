
import React from 'react';

const FilmReelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center border-b border-gray-800 pb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <FilmReelIcon className="w-8 h-8 text-gray-400" />
        <h1 className="text-4xl sm:text-5xl font-extralight tracking-wider uppercase">
          AI Website Strategist
        </h1>
      </div>
      <p className="max-w-3xl mx-auto text-lg text-gray-400">
        Transform your digital presence. Enter a website URL to generate a world-class strategic blueprint for a cinematic, festival-ready portfolio.
      </p>
    </header>
  );
};
