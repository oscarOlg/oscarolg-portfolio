"use client";

import Link from "next/link";
import type { ServicePackage, ServiceConfig } from "@/types/sanity";

function formatPrice(price: number) {
  return "$" + price.toLocaleString("es-MX");
}

function PackageCard({
  pkg,
  defaultCta,
}: {
  pkg: ServicePackage;
  defaultCta: string;
}) {
  const isPopular = pkg.popular;
  const badgeLabel = pkg.badgeLabel || "Más Popular";
  const ctaText = pkg.ctaText || defaultCta;
  const showPrice = pkg.showPrice !== false;
  const bodyParagraphs = pkg.bodyText ? pkg.bodyText.split(/\n\n+/) : null;
  const cardClass = isPopular
    ? "border-2 border-accent p-8 flex flex-col relative shadow-md hover:shadow-lg transition-shadow duration-300"
    : "border border-gray-200 p-8 flex flex-col hover:border-gray-300 transition-colors duration-300";

  return (
    <div className={cardClass}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap shadow-sm">
          {badgeLabel}
        </span>
      )}
      <h3 className="font-serif text-2xl font-bold mb-3 text-secondary">{pkg.name}</h3>
      <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-6">
        {pkg.description}
      </p>
      {bodyParagraphs ? (
        <div className="flex-grow mb-8">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-4">
            {bodyParagraphs[0]}
          </p>
          {bodyParagraphs[1] && (
            <p className="font-sans text-xs text-gray-500 italic">
              {bodyParagraphs[1]}
            </p>
          )}
        </div>
      ) : (
        pkg.features && pkg.features.length > 0 && (
          <ul className="font-sans text-sm text-gray-700 space-y-3 mb-8 flex-grow">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )
      )}
      <div className="mt-auto pt-4">
        {showPrice && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-sm">
            {pkg.pricePrefix && (
              <p className="font-sans text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">
                {pkg.pricePrefix}
              </p>
            )}
            <p className="font-serif text-3xl font-bold text-secondary">
              {formatPrice(pkg.price)}{" "}
              <span className="text-lg font-sans text-gray-400 font-normal">MXN</span>
            </p>
          </div>
        )}
        {isPopular ? (
          <Link
            href="/contact"
            className="block text-center w-full bg-accent text-secondary uppercase tracking-widest text-xs py-4 hover:bg-opacity-95 transition-all duration-200 font-bold shadow-sm hover:shadow-md"
          >
            {ctaText}
          </Link>
        ) : pkg.ctaVariant === "outline" ? (
          <Link
            href="/contact"
            className="block text-center w-full bg-transparent border-2 border-secondary text-secondary uppercase tracking-widest text-xs py-3 hover:bg-secondary hover:text-dominant transition-all duration-200 font-semibold"
          >
            {ctaText}
          </Link>
        ) : (
          <Link
            href="/contact"
            className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-4 hover:bg-accent transition-colors duration-200 font-bold shadow-sm hover:shadow-md"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}

function SpecialVariantCard({ pkg }: { pkg: ServicePackage }) {
  const ctaText = pkg.ctaText || "Cotizar";

  return (
    <div className="bg-gray-50 p-6 border border-gray-200 flex flex-col justify-between">
      <div>
        <h4 className="font-serif text-xl font-bold mb-2 text-secondary">{pkg.name}</h4>
        <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">
          {pkg.description}
        </p>
        {pkg.bodyText ? (
          <p className="font-sans text-sm leading-relaxed text-gray-700 mb-4">{pkg.bodyText}</p>
        ) : (
          pkg.features && pkg.features.length > 0 && (
            <ul className="font-sans text-sm text-gray-700 space-y-2 mb-4">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent flex-shrink-0 mt-0.5 font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      <div>
        {pkg.showPrice !== false && (
          <p className="font-serif text-3xl font-bold text-secondary mb-4">
            {formatPrice(pkg.price)}{" "}
            <span className="text-lg font-sans text-gray-400 font-normal">MXN</span>
          </p>
        )}
        <Link
          href="/contact"
          className="font-sans text-xs uppercase tracking-widest border-b-2 border-secondary text-secondary pb-1 hover:text-accent hover:border-accent transition-colors font-bold"
        >
          {ctaText} →
        </Link>
      </div>
    </div>
  );
}

interface Props {
  config: ServiceConfig;
  packages: ServicePackage[];
}

export default function ServicePackageTemplate({ config, packages }: Props) {
  const defaultCta = config.ctaButtonText || "Reservar";
  const gridCols = config.gridColumns || 3;

  const gridPackages = packages
    .filter((p) => !p.isSpecialVariant)
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

  const specialVariants = packages
    .filter((p) => p.isSpecialVariant)
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

  const hasComplementos =
    config.hasAddOns !== false &&
    Array.isArray(config.complementos) &&
    config.complementos.length > 0;

  const hasRightPanel =
    config.infoCardVariant === "right_panel" && !!config.infoCardHeading;

  const hasFullWidthCard =
    config.infoCardVariant === "full_width_centered" && !!config.infoCardHeading;

  const showPostPackagesRow =
    hasComplementos || specialVariants.length > 0 || hasRightPanel;

  const gridClass =
    gridCols === 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-8"
      : "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 mt-8";

  return (
    <>
      {config.introText && (
        <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
          {config.introText.split("\n").map((line, i) =>
            line.startsWith("*") ? (
              <span key={i} className="italic text-sm text-gray-400 mt-2 block">
                {line}
              </span>
            ) : (
              <p key={i} className="font-sans text-base text-gray-600 leading-relaxed">
                {line}
              </p>
            )
          )}
        </div>
      )}

      <div className={gridClass}>
        {gridPackages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} defaultCta={defaultCta} />
        ))}
      </div>

      {showPostPackagesRow && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-8 mb-8">
          {hasComplementos && (
            <div className="border border-gray-200 p-6 bg-gray-50">
              <h4 className="font-serif text-lg font-bold mb-5 text-secondary uppercase tracking-wide">
                Complementos
              </h4>
              {config.complementos!.map((item, i) => (
                <div
                  key={item._key ?? i}
                  className="flex justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-4 gap-4 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <div className="flex-grow">
                    <span className="font-sans text-sm font-semibold text-secondary block">
                      {item.name}
                    </span>
                    {item.note && (
                      <span className="block text-xs italic text-accent font-semibold mt-1">
                        {item.note}
                      </span>
                    )}
                  </div>
                  <span className="font-sans font-bold text-secondary whitespace-nowrap mt-1 sm:mt-0">
                    {formatPrice(item.price)} MXN
                    {item.unit && (
                      <span className="font-normal text-gray-500 ml-1">
                        / {item.unit}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {specialVariants.length > 0 && (
            <SpecialVariantCard pkg={specialVariants[0]} />
          )}

          {!specialVariants.length && hasRightPanel && (
            <div className="bg-gray-50 p-6 border border-gray-200 flex flex-col justify-center">
              <h4 className="font-serif text-lg font-bold mb-3 text-secondary">
                {config.infoCardHeading}
              </h4>
              <p className="font-sans text-sm leading-relaxed text-gray-700">
                {config.infoCardContent}
              </p>
            </div>
          )}
        </div>
      )}

      {hasFullWidthCard && (
        <div className="bg-gray-50 p-8 text-center mb-10 border border-gray-200">
          <h4 className="font-serif text-xl font-bold mb-3 text-secondary">
            {config.infoCardHeading}
          </h4>
          <p className="font-sans text-sm leading-relaxed text-gray-700 max-w-2xl mx-auto">
            {config.infoCardContent}
          </p>
        </div>
      )}

      {config.customBlockHeading && config.customBlockContent && (
        <div className="bg-accent/5 border-l-4 border-accent p-6 mb-10">
          <h3 className="font-serif text-2xl font-bold text-secondary mb-3">
            {config.customBlockHeading}
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-700 max-w-3xl leading-relaxed">
            {config.customBlockContent}
          </p>
        </div>
      )}

      {config.hasGlobalBenefits !== false && config.globalBenefitsText && (
        <div className="bg-secondary text-dominant p-8 mb-10 border border-secondary">
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3 font-bold">
            {config.globalBenefitsHeading || "Inclusiones en todos los paquetes"}
          </p>
          <p className="font-sans text-sm leading-relaxed">
            {config.globalBenefitsText}
          </p>
        </div>
      )}

      {config.hasProcess !== false &&
        config.processSteps &&
        config.processSteps.length > 0 && (
          <div className="bg-secondary text-dominant p-8 md:p-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center font-bold">
              {config.processTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {config.processSteps.map((step, idx) => (
                <div key={step._key ?? step.number} className="flex flex-col items-center text-center">
                  <span className="block font-serif text-5xl font-bold text-accent mb-4">
                    {step.number}
                  </span>
                  <h4 className="font-sans uppercase tracking-widest text-sm font-bold mb-3">
                    {step.heading}
                  </h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-300">
                    {step.description}
                  </p>
                  {idx < config.processSteps!.length - 1 && (
                    <div className="hidden md:block absolute w-20 h-0.5 bg-accent/30 ml-20 mt-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
