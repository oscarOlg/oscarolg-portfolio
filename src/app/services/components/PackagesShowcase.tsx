"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import packagesData from "@/config/wedding-packages.json";
import InlineBoldText from "@/app/components/InlineBoldText";

interface Package {
  id: string;
  order: number;
  name: string;
  nameEn: string;
  subtitle?: string;
  subtitleEn?: string;
  imageUrl: string;
  duration: string;
  durationEn: string;
  targetAudience?: string;
  targetAudienceEn?: string;
  promise?: string;
  promiseEn?: string;
  features?: string[];
  featuresEn?: string[];
  bonuses?: string[];
  bonusesEn?: string[];
  positioning: string;
  positioningEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  mostChosen: boolean;
}

interface AddOn {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionEn: string;
}

function formatPrice(price: number) {
  return "$" + price.toLocaleString("es-MX");
}

function getFeatureAndBonus(pkg: Package, lang: "es" | "en") {
  const features = (lang === "en" ? pkg.featuresEn : pkg.features) || [];
  const bonuses = (lang === "en" ? pkg.bonusesEn : pkg.bonuses) || [];
  return { features, bonuses };
}

function FeaturedPackageBlock({ pkg, imageOverride }: { pkg: Package; imageOverride?: string }) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const services = locale.services;
  const labels = services.packages;
  const language = lang === "en" ? "en" : "es";

  const name = lang === "en" ? pkg.nameEn : pkg.name;
  const subtitle = lang === "en" ? pkg.subtitleEn : pkg.subtitle;
  const targetAudience =
    (lang === "en" ? pkg.targetAudienceEn : pkg.targetAudience) ||
    (lang === "en" ? pkg.positioningEn : pkg.positioning);
  const promise =
    (lang === "en" ? pkg.promiseEn : pkg.promise) ||
    (lang === "en" ? pkg.descriptionEn : pkg.description);
  const duration = lang === "en" ? pkg.durationEn : pkg.duration;
  const { features, bonuses } = getFeatureAndBonus(pkg, language);
  const displayImageUrl = imageOverride || (pkg.imageUrl.includes("[PLACEHOLDER") ? "" : pkg.imageUrl);

  return (
    <section className="mb-20">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
        {labels.mostPopularLabel}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden rounded-2xl border border-gray-200 shadow-[0_14px_38px_rgba(15,23,42,0.12)] bg-white">
        <div className="relative min-h-[22rem] lg:min-h-full">
          {displayImageUrl ? (
            <Image src={displayImageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full min-h-[22rem] bg-gradient-to-br from-secondary to-gray-800 flex items-center justify-center">
              <p className="text-gray-300 text-sm">{labels.placeholderImageText}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          <div className="absolute top-0 left-0 p-6 md:p-8 text-dominant max-w-[85%]">
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">{name}</h3>
            {subtitle && <p className="font-serif italic text-lg text-gray-100 mt-1">{subtitle}</p>}
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-10 flex flex-col">
          <p className="font-sans italic text-secondary/80 leading-relaxed mb-4"><InlineBoldText text={targetAudience} boldClassName="font-semibold text-secondary" /></p>
          <p className="font-sans text-gray-700 leading-relaxed mb-6"><InlineBoldText text={promise} /></p>

          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-3">
              {labels.includedLabel}
            </p>
            <ul className="space-y-2">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {bonuses.length > 0 && (
            <div className="mb-6 border border-accent/30 bg-accent/10 rounded-lg p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">
                {labels.bonusesLabel}
              </p>
              <ul className="space-y-2">
                {bonuses.map((item, idx) => (
                  <li key={idx} className="text-sm text-secondary leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-5 border-t border-gray-200">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  {labels.durationLabel}
                </p>
                <p className="font-serif text-lg text-secondary">{duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  {labels.investmentLabel}
                </p>
                <p className="font-serif text-3xl text-secondary">MXN {formatPrice(pkg.price)}</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full inline-block text-center bg-accent text-secondary py-3.5 uppercase tracking-widest text-xs font-bold hover:bg-accent/90 transition-colors"
            >
              {labels.fullGuideCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaveTheDateBlock({ pkg, imageOverride }: { pkg: Package; imageOverride?: string }) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const labels = locale.services.packages;
  const name = lang === "en" ? pkg.nameEn : pkg.name;
  const subtitle = lang === "en" ? pkg.subtitleEn : pkg.subtitle;
  const targetAudience =
    (lang === "en" ? pkg.targetAudienceEn : pkg.targetAudience) ||
    (lang === "en" ? pkg.positioningEn : pkg.positioning);
  const promise =
    (lang === "en" ? pkg.promiseEn : pkg.promise) ||
    (lang === "en" ? pkg.descriptionEn : pkg.description);
  const displayImageUrl = imageOverride || (pkg.imageUrl.includes("[PLACEHOLDER") ? "" : pkg.imageUrl);

  return (
    <section className="mb-20">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
        {labels.sessionLabel}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="relative min-h-[18rem]">
          {displayImageUrl ? (
            <Image src={displayImageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full min-h-[18rem] bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
        </div>
        <div className="p-6 md:p-8">
          <h3 className="font-serif text-3xl text-secondary leading-tight">{name}</h3>
          {subtitle && <p className="font-serif italic text-gray-600 mt-1 mb-3">{subtitle}</p>}
          <p className="font-sans italic text-secondary/80 mb-3"><InlineBoldText text={targetAudience} boldClassName="font-semibold text-secondary" /></p>
          <p className="font-sans text-gray-700 leading-relaxed mb-5"><InlineBoldText text={promise} /></p>
          <p className="font-serif text-2xl text-secondary mb-4">MXN {formatPrice(pkg.price)}</p>
          <Link
            href="/contact"
            className="inline-block border border-secondary text-secondary px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-secondary hover:text-dominant transition-colors"
          >
            {labels.sessionCta}
         </Link>
        </div>
      </div>
    </section>
  );
}

function AddOnsStrip({ addOns }: { addOns: AddOn[] }) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const labels = locale.services.packages;
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <h3 className="font-serif text-3xl text-secondary">
          {labels.addOnsLabel}
        </h3>
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
          {labels.aLaCarteLabel}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {addOns.map((item) => (
          <div key={item.id} className="border border-gray-200 bg-white p-4">
            <p className="font-serif text-lg text-secondary leading-tight mb-1">
              {lang === "en" ? item.nameEn : item.name}
            </p>
            <p className="font-sans text-xs text-gray-600 mb-3 leading-snug">
              {lang === "en" ? item.descriptionEn : item.description}
            </p>
            <p className="font-serif text-xl text-accent">MXN {formatPrice(item.price)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PackagesShowcase({ imageOverrides = {} }: { imageOverrides?: Record<string, string> }) {
  const allPackages = (packagesData.packages as Package[]).sort((a, b) => a.order - b.order);

  const featuredPackage = allPackages.find((pkg) => pkg.mostChosen) || allPackages[0] || null;
  const saveTheDatePackage = allPackages.find((pkg) => pkg.id === "save_the_date" || pkg.id === "compromiso") || null;

  const addOns = ((packagesData.addOns as AddOn[]) || []).filter(
    (addon) => addon.id !== "save-the-date" && addon.id !== "save_the_date"
  );

  return (
    <div className="w-full">
      {featuredPackage && <FeaturedPackageBlock pkg={featuredPackage} imageOverride={imageOverrides[featuredPackage.id]} />}
      {saveTheDatePackage && <SaveTheDateBlock pkg={saveTheDatePackage} imageOverride={imageOverrides[saveTheDatePackage.id]} />}
      {addOns.length > 0 && <AddOnsStrip addOns={addOns} />}
    </div>
  );
}
