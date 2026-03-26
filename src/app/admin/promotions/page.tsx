'use client';

import React, { useState } from 'react';
import { PROMOTIONS_DB, Promotion } from '@/config/promotions';
import { useAllPromotions, useTogglePromo, useChangeVariant } from '@/hooks/usePromotions';
import { motion } from 'framer-motion';

/**
 * Admin Dashboard for Promotions Management
 * View, toggle, and manage all active promotions
 */
export default function AdminPromotionsPage() {
  const allPromos = useAllPromotions();
  const [expandedPromo, setExpandedPromo] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  React.useEffect(() => {
    // Initialize selectedVariants on load
    const initial: Record<string, string> = {};
    PROMOTIONS_DB.forEach((p) => {
      initial[p.id] = p.activeVariant;
    });
    setSelectedVariants(initial);
  }, []);

  const handleToggle = (promoId: string, newActive: boolean) => {
    const toggleFn = useTogglePromo(promoId);
    toggleFn(newActive);
  };

  const handleVariantChange = (promoId: string, newVariant: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [promoId]: newVariant,
    }));
    const changeFn = useChangeVariant(promoId);
    changeFn(newVariant);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-secondary font-bold mb-2">
            Promotions Manager
          </h1>
          <p className="text-gray-600">
            Manage active promotions, variants, and scheduling
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-accent/20 rounded-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Promotions</p>
            <p className="text-3xl font-bold text-secondary">{allPromos.length}</p>
          </div>
          <div className="bg-white border border-accent/20 rounded-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Active Now</p>
            <p className="text-3xl font-bold text-accent">
              {allPromos.filter((p) => p.active).length}
            </p>
          </div>
          <div className="bg-white border border-accent/20 rounded-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Planned Upcoming</p>
            <p className="text-3xl font-bold text-orange-600">
              {PROMOTIONS_DB.filter(
                (p) =>
                  !p.active && new Date(p.startDate) > new Date()
              ).length}
            </p>
          </div>
        </div>

        {/* Promotions List */}
        <div className="space-y-4">
          {allPromos.map((promo) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Left: Icon + Name */}
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{promo.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-secondary">{promo.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{promo.id}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {promo.service}
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {promo.urgencyType}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        ${promo.value} MXN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status + Toggle */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-2">Status</p>
                    <button
                      onClick={() => handleToggle(promo.id, !promo.active)}
                      className={`
                        inline-flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all
                        ${
                          promo.active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }
                      `}
                    >
                      <span className={promo.active ? 'w-2 h-2 bg-green-600 rounded-full' : 'w-2 h-2 bg-gray-400 rounded-full'}></span>
                      {promo.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() =>
                      setExpandedPromo(expandedPromo === promo.id ? null : promo.id)
                    }
                    className="text-gray-400 hover:text-gray-600 font-bold text-xl"
                  >
                    {expandedPromo === promo.id ? '✕' : '+'}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expandedPromo === promo.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 pt-6 border-t border-gray-200 space-y-4"
                >
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Start Date</p>
                      <p className="text-base text-gray-600">
                        {new Date(promo.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">End Date</p>
                      <p className="text-base text-gray-600">
                        {promo.endDate === 'ongoing'
                          ? 'Ongoing'
                          : new Date(promo.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Variants */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      A/B Variant ({promo.variants.length} options)
                    </p>
                    <div className="space-y-2">
                      {promo.variants.map((v) => (
                        <label
                          key={v.name}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 hover:border-accent cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name={`variant-${promo.id}`}
                            value={v.name}
                            checked={selectedVariants[promo.id] === v.name}
                            onChange={(e) =>
                              handleVariantChange(promo.id, e.target.value)
                            }
                            className="w-4 h-4 text-accent"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-dark text-sm">{v.headline}</p>
                            <p className="text-xs text-gray-600">
                              CTA: "{v.cta}"
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Display Options */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Display On
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {promo.displayOn.map((loc) => (
                        <span
                          key={loc}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tracking */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Meta Pixel Tracking Label
                    </p>
                    <p className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                      {promo.trackingLabel}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <button className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded hover:bg-accent/90 transition-all">
                      Edit Details
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded hover:bg-gray-300 transition-all">
                      View Analytics
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ How to Use</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>Toggle Status:</strong> Activate/deactivate any promotion instantly
            </li>
            <li>
              • <strong>Choose Variant:</strong> A/B test different headlines and CTAs
            </li>
            <li>
              • <strong>Scheduled Campaigns:</strong> Promotions auto-activate on start date
            </li>
            <li>
              • <strong>Tracking:</strong> All events logged to Meta Pixel with labels
            </li>
            <li>
              • <strong>Note:</strong> Changes are client-side only. API persistence coming soon.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
