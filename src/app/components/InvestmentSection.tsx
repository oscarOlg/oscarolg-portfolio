import Image from "next/image";
import Link from "next/link";

interface Props {
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export default function InvestmentSection({ leftImageUrl, rightImageUrl }: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-dominant">
      
      {/* Lado Izquierdo: Mensaje de Valor y CTA */}
      <div className="flex flex-col justify-center">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-secondary">
          La tranquilidad de estar en buenas manos.
        </h2>
        
        {/* Mensaje inspirador central */}
        <p className="font-sans text-base md:text-lg leading-relaxed text-gray-700 mb-6">
          Mi objetivo es transformar instantes efímeros en recuerdos tangibles. Te ofrezco calidad estética, calidez humana y tranquilidad absoluta para documentar los capítulos más importantes de tu vida.
        </p>
        
        {/* Mensaje sutil de confianza orientado a los paquetes */}
        <p className="font-sans text-base md:text-lg leading-relaxed text-gray-700 mb-10">
          Sé que planear un evento requiere tiempo y dedicación. Por eso, mi enfoque es brindarte la confianza de que tu historia será capturada con cuidado y profesionalismo. Encuentra opciones claras y diseñadas para adaptarse a tu visión, permitiéndote enfocarte únicamente en disfrutar.
        </p>
        
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Link 
            href="/services" 
            className="bg-secondary text-dominant font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-accent hover:-translate-y-1 transition-all duration-300 font-semibold w-full sm:w-auto text-center shadow-sm"
          >
            Conocer paquetes y precios
          </Link>
        </div>
      </div>
      
      {/* Lado Derecho: Composición Editorial */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex gap-4 md:gap-6">
        <div className="relative w-1/2 h-[80%] mt-auto shadow-sm overflow-hidden group">
          <Image
            src={leftImageUrl ?? "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            alt="Fotografía de sesión"
          />
        </div>
        <div className="relative w-1/2 h-[90%] shadow-sm overflow-hidden group">
          <Image
            src={rightImageUrl ?? "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            alt="Fotografía de retrato"
          />
        </div>
      </div>
      
    </section>
  );
}