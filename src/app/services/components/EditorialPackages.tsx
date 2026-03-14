// src/components/EditorialPackages.tsx
import Link from "next/link";

export default function EditorialPackages() {
  return (
    <>
      <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
        <p className="font-sans text-sm leading-relaxed text-gray-700">
          Creación visual sin límites. Desde la dirección de arte para campañas de moda (Lookbooks) hasta la sinergia creativa con nuevos talentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-8">
        
        {/* === COLABORACIONES (TFP) === */}
        <div className="border-2 border-secondary p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-dominant text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap shadow-sm">
            Colaboración Abierta
          </span>
          
          <h3 className="font-serif text-2xl font-bold mb-3 text-secondary">
            Colaboraciones (TFP)
          </h3>
          
          <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">
            Sinergia Creativa
          </p>
          
          <div className="font-sans text-sm leading-relaxed text-gray-700 mb-4 flex-grow">
            Creo fuertemente en hacer sinergia. Si eres modelo armando tu book, maquillista, estilista, o diseñador emergente con una propuesta creativa vanguardista, estoy siempre abierto a colaboraciones e intercambios creativos (TFP). 
          </div>
          
          <p className="font-sans text-xs text-gray-500 italic mb-6">
            Envía tu moodboard o idea y hagamos arte juntos.
          </p>
          
          <div className="mt-auto pt-4">
            <Link 
              href="/contact" 
              className="block text-center w-full bg-transparent border-2 border-secondary text-secondary uppercase tracking-widest text-xs font-bold py-4 hover:bg-secondary hover:text-dominant transition-all duration-200"
            >
              Proponer Colaboración
            </Link>
          </div>
        </div>

        {/* === LOOKBOOK / CAMPAÑA === */}
        <div className="border border-gray-200 p-8 flex flex-col hover:border-gray-300 transition-colors duration-300">
          <h3 className="font-serif text-2xl font-bold mb-3 text-secondary">
            Lookbook / Campaña
          </h3>
          
          <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">
            Para marcas y diseñadores
          </p>
          
          <ul className="font-sans text-sm text-gray-700 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-3">
              <span className="text-accent flex-shrink-0 mt-1 font-bold">✓</span>
              <span className="leading-snug">Dirección de modelos y fotografía de producto puesto (E-commerce/Social)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent flex-shrink-0 mt-1 font-bold">✓</span>
              <span className="leading-snug">Licencia de uso comercial y retoque editorial en piezas clave</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent flex-shrink-0 mt-1 font-bold">✓</span>
              <span className="leading-snug"><span className="font-semibold">Presupuesto Adaptable:</span> El costo final se ajusta de acuerdo a las necesidades y presupuesto de tu campaña.</span>
            </li>
          </ul>
          
          <div className="mt-auto pt-4">
            <Link 
              href="/contact" 
              className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs font-bold py-4 hover:bg-accent transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Cotizar Campaña
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}