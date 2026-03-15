import Image from "next/image";
import Link from "next/link";
import Socials from "../components/Socials";
import { getAboutContent } from "@/lib/sanity";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutContent();

  const heading = about?.heading ?? "El enfoque detrás del lente.";
  const paragraphs = about?.paragraphs ?? [];
  const ctaText = about?.ctaText ?? "Hablemos de tu proyecto";
  const imageUrl = about?.mainImage?.asset?.url ?? null;

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left Column: Profile Image */}
        <div className="relative w-full aspect-[4/5] shadow-sm">
          <Image
            src={imageUrl ?? "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1980&auto=format&fit=crop"}
            alt="Oscar Sanchez - Fotógrafo de Bodas, Retratos y Parejas"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
          {/* Subtle accent border framing the image */}
          <div className="absolute -inset-4 border border-accent/50 -z-10 hidden md:block"></div>
        </div>

        {/* Right Column: Copy & Philosophy */}
        <div className="flex flex-col">
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide mb-8 text-secondary">
            {heading}
          </h1>

          <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-gray-700">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Minimalist Divider */}
          <div className="w-10 h-[1px] bg-secondary my-10"></div>

          {/* Call to Action Container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group flex items-center gap-3 bg-accent text-dominant uppercase tracking-widest text-sm py-4 px-8 hover:bg-secondary transition-all font-semibold"
            >
              {ctaText}
            </Link>

            {/* Social Links */}
            <Socials containerClassName="flex gap-5" itemClassName="hover:text-accent transition-colors text-gray-500" />
          </div>

        </div>
      </div>

    </div>
  );
}
