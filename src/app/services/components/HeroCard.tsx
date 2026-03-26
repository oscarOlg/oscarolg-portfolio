'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroCardProps {
  title: string;
  icon: string;
  isExpanded: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export function HeroCard({ title, icon, isExpanded, onClick, children }: HeroCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left p-8 md:p-12 border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
        isExpanded
          ? 'border-secondary bg-gradient-to-b from-secondary/5 to-transparent'
          : 'border-gray-300 hover:border-secondary/50 hover:shadow-md'
      }`}
      whileHover={{ y: isExpanded ? 0 : -2 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl md:text-5xl">{icon}</span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
              {title}
            </h3>
            {!isExpanded && (
              <p className="font-sans text-sm text-gray-600 mt-1">
                {children || 'Tap to expand'}
              </p>
            )}
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-secondary"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
