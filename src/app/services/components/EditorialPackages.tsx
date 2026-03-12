// src/components/EditorialPackages.tsx
import Link from "next/link";

export default function EditorialPackages() {
  return (
    <>
      <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
        <p className="font-sans text-base text-gray-600 leading-relaxed">
          Creación visual sin límites. Desde la dirección de arte para campañas de moda (Lookbooks) hasta la sinergia creativa con nuevos talentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* === COLUMNA IZQUIERDA: COLABORACIONES (TFP) === */}
        {/* Usamos el mismo estilo de borde y padding para consistencia en el grid */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Colaboraciones (TFP)</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Sinergia Creativa</p>
          
          <div className="font-sans text-base text-gray-700 leading-relaxed mb-6 flex-grow">
            Creo fuertemente en hacer sinergia. Si eres modelo armando tu book, maquillista, estilista, o diseñador emergente con una propuesta creativa vanguardista, estoy siempre abierto a colaboraciones e intercambios creativos (TFP). 
          </div>
          
          <p className="font-sans text-sm text-gray-500 italic mb-8">
            Envía tu moodboard o idea y hagamos arte juntos.
          </p>
          
          <div className="mt-auto">
            {/* Botón con estilo secundario (borde) */}
            <Link href="/contact" className="block text-center w-full bg-transparent border-2 border-secondary text-secondary uppercase tracking-widest text-xs font-semibold py-3 hover:bg-secondary hover:text-dominant transition-colors">
              Proponer Colaboración
            </Link>
          </div>
        </div>

        {/* === COLUMNA DERECHA: LOOKBOOK / CAMPAÑA === */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Lookbook / Campaña</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Para marcas y diseñadores</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Dirección de modelos y fotografía de producto puesto (E-commerce/Social)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Licencia de uso comercial y retoque editorial en piezas clave</span>
            </li>
            {/* NUEVO PUNTO SOBRE PRESUPUESTO */}
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>Presupuesto Adaptable:</b> El costo final se ajusta de acuerdo a las necesidades y presupuesto de tu campaña.</span>
            </li>
          </ul>
          <div className="mt-auto">
            {/* Botón con estilo primario (fondo secundario) */}
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Cotizar Campaña</Link>
          </div>
        </div>
      </div>
    </>
  );
}