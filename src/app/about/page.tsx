import Image from "next/image";
import Link from "next/link";
import Socials from "../components/Socials";

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Profile Image */}
        <div className="relative w-full aspect-[4/5] shadow-sm">
          <Image 
            // Placeholder: Replace with your actual portrait
            src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1980&auto=format&fit=crop" 
            alt="Oscar Sanchez - Fotógrafo de Bodas y Eventos"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
          {/* Subtle accent border framing the image */}
          <div className="absolute -inset-4 border border-accent/50 -z-10 hidden md:block"></div>
        </div>

        {/* Right Column: Refined Copy & Philosophy */}
        <div className="flex flex-col">
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide mb-8 text-secondary">
            El enfoque detrás del lente.
          </h1>
          
          <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-gray-700">
            <p>
              Soy <b>Oscar Sanchez</b>, fotógrafo y desarrollador web radicado en Ciudad Juárez. Mi trabajo visual combina la estructura técnica y atención al detalle de mi formación en tecnología, con la sensibilidad artística necesaria para documentar la esencia humana.
            </p>
            <p>
              Me especializo en la <b>fotografía de bodas, eventos y retrato</b>. Entiendo que elegir a la persona que documentará tus memorias es un acto de fe. Por eso, mi promesa principal no es solo entregarte imágenes con calidad estética, sino brindarte <b>confianza y tranquilidad absoluta</b> durante todo el proceso.
            </p>
            <p>
              <u>Quiero que disfrutes tu evento sabiendo que cada instante irrepetible está en manos seguras.</u> Mi objetivo es simple: transformar la emoción de hoy en un legado visual tangible que te permita volver a vivir el momento.
            </p>
          </div>

          {/* Minimalist Divider */}
          <div className="w-10 h-[1px] bg-secondary my-10"></div>

          {/* Call to Action Container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 bg-accent text-dominant uppercase tracking-widest text-sm py-4 px-8 hover:bg-secondary transition-all font-semibold"
            >
              Hablemos de tu evento
              {/* Optional: Add your TopArrowIcon here later */}
            </Link>
            
            {/* Social Links */}
            <Socials containerClassName="flex gap-5" itemClassName="hover:text-accent transition-colors text-gray-500" />
          </div>

        </div>
      </div>

    </div>
  );
}