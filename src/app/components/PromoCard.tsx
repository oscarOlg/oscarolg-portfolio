'use client';

import React from 'react';
import { Promotion, PromoVariant } from '@/config/promotions';
import { usePromoTracking, useActiveVariant } from '@/hooks/usePromotions';
import { motion } from 'framer-motion';

interface PromoCardProps {
  promo: Promotion;
  onClick?: () => void;
}

/**
 * Generic Promo Card Component
 * Renders any promotion the same way
 */
export function PromoCard({ promo, onClick }: PromoCardProps) {
  const variant = useActiveVariant(promo);
  usePromoTracking(promo.id, 'view');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-6 md:p-8 text-center"
    >
      {/* Icon + Headline */}
      <div className="mb-4">
        <span className="text-4xl mb-2 block">{variant.icon || promo.icon}</span>
        <h3 className="text-2xl md:text-3xl font-serif text-secondary mb-2">
          {variant.headline}
        </h3>
      </div>

      {/* Subheadline */}
      {variant.subheadline && (
        <p className="text-gray-600 text-base md:text-lg mb-6">
          {variant.subheadline}
        </p>
      )}

      {/* CTA Button */}
      <motion.button
        onClick={() => {
          usePromoTracking(promo.id, 'click');
          onClick?.();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          inline-block font-sans font-bold uppercase tracking-widest text-sm 
          py-3 px-8 rounded-lg transition-all duration-300
          ${
            variant.ctaColor === 'secondary'
              ? 'bg-secondary text-white hover:bg-secondary/90'
              : variant.ctaColor === 'primary'
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-accent text-white hover:bg-accent/90'
          }
        `}
      >
        {variant.cta}
      </motion.button>

      {/* Micro-copy */}
      {promo.urgencyType === 'scarcity' && (
        <p className="text-xs text-accent font-semibold mt-4 animate-pulse">
          ⚠️ Limited availability
        </p>
      )}
      {promo.urgencyType === 'limited_time' && (
        <p className="text-xs text-orange-600 font-semibold mt-4">
          ⏰ Offer expires soon
        </p>
      )}
    </motion.div>
  );
}

/**
 * Sticky Promo Banner (Float on page)
 */
interface PromoBannerProps {
  promo: Promotion;
  onClose?: () => void;
  onClick?: () => void;
}

export function PromoBanner({ promo, onClose, onClick }: PromoBannerProps) {
  const variant = useActiveVariant(promo);
  const [isVisible, setIsVisible] = React.useState(true);
  usePromoTracking(promo.id, 'view');

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-4 z-40 bg-white border-2 border-accent rounded-lg shadow-2xl max-w-sm p-4"
    >
      {/* Close button */}
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Content */}
      <div className="pr-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl flex-shrink-0">{variant.icon || promo.icon}</span>
          <div className="text-left">
            <h4 className="font-serif text-lg text-secondary font-bold">
              {variant.headline}
            </h4>
            {variant.subheadline && (
              <p className="text-sm text-gray-600 mt-1">{variant.subheadline}</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => {
            usePromoTracking(promo.id, 'click');
            onClick?.();
          }}
          whileHover={{ scale: 1.02 }}
          className={`
            w-full font-sans font-bold text-sm py-2 px-4 rounded 
            transition-all duration-300
            ${
              variant.ctaColor === 'secondary'
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : variant.ctaColor === 'primary'
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-accent text-white hover:bg-accent/90'
            }
          `}
        >
          {variant.cta}
        </motion.button>

        {/* Urgency indicator */}
        {promo.urgencyType === 'scarcity' && (
          <p className="text-xs text-accent text-center mt-2 animate-pulse font-semibold">
            Limited spots, reserve now
          </p>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Generic Header Banner (Top of page)
 */
export function PromoHeaderBanner({ promo, onClick }: PromoCardProps) {
  const variant = useActiveVariant(promo);
  usePromoTracking(promo.id, 'view');

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-gradient-to-r from-accent to-accent/80 text-white py-4 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{variant.icon || promo.icon}</span>
          <h2 className="text-lg md:text-xl font-bold">{variant.headline}</h2>
        </div>

        {variant.subheadline && (
          <p className="text-sm text-white/90 mb-4">{variant.subheadline}</p>
        )}

        <motion.button
          onClick={() => {
            usePromoTracking(promo.id, 'click');
            onClick?.();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-accent font-bold text-sm px-6 py-2 rounded hover:bg-gray-100 transition-all"
        >
          {variant.cta} →
        </motion.button>
      </div>
    </motion.div>
  );
}
