'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ExpandableSectionProps {
  isExpanded: boolean;
  children: ReactNode;
}

export function ExpandableSection({ isExpanded, children }: ExpandableSectionProps) {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-8 px-8 md:px-12">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
