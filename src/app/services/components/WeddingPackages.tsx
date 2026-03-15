import Link from "next/link";

export default function WeddingPackages() {
  return (
    <>
      {/* Grid de Paquetes Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 mt-8">
        {/* Paquete Esencial */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Esencial</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Cobertura de 6 horas</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura de la Ceremonia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura de la Recepción</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$8,000 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Reservar</Link>
          </div>
        </div>

        {/* Paquete Clásico */}
        <div className="border-2 border-accent p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap">Más Popular</span>
          <h3 className="font-serif text-2xl mb-2">Clásico</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Cobertura de 8 horas</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura de la Ceremonia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura de la Recepción</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de retratos (mismo día de la boda)</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$10,000 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-accent text-secondary uppercase tracking-widest text-xs py-3 hover:bg-opacity-90 transition-colors font-semibold">Reservar</Link>
          </div>
        </div>

        {/* Paquete Premium */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Premium</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Cobertura de 10 horas</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>Sesión de Compromiso</b> incluida en locación.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>Getting Ready:</b> Momentos previos íntimos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Ceremonia y Recepción</span>
            </li>
             <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de retratos (mismo día de la boda)</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$12,000 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Reservar</Link>
          </div>
        </div>
      </div>

      {/* Complementos e Íntimos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8 mb-8">
        <div>
          <h4 className="font-serif text-xl mb-4 text-secondary">Complementos</h4>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">
              Sesión de Compromiso (Pre-boda)
              <span className="block text-xs italic text-accent mt-1">Incluida en el paquete Premium</span>
            </span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$2,500 MXN</span>
          </div>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">{'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")'}</span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$1,500 MXN</span>
          </div>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">Horas extra de cobertura el día del evento</span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$1,500 MXN / hr</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h4 className="font-serif text-xl mb-2 text-secondary">Boda Civil / Íntima</h4>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-3">Hasta 3 horas de cobertura</p>
          <p className="font-sans text-sm text-gray-600 mb-4">
            Documentación de la ceremonia, firmas, fotografías familiares y una sesión de retratos de pareja.
          </p>
          <p className="font-serif text-2xl text-secondary mb-4">$3,500 <span className="text-sm font-sans text-gray-400">MXN</span></p>
          <Link href="/contact" className="font-sans text-xs uppercase tracking-widest border-b border-secondary pb-1 hover:text-accent transition-colors">Cotizar Civil</Link>
        </div>
      </div>

      {/* Beneficios Globales */}
      <div className="bg-dominant p-6 mb-10 text-center border border-gray-100">
        <p className="font-sans text-sm tracking-widest uppercase text-accent mb-2 font-semibold">Inclusiones en todos los paquetes</p>
        <p className="font-sans text-sm text-gray-600">
          Entrega garantizada de galería digital amplia (aprox. 50 a 60 fotos por hora de cobertura). Todas las fotografías son editadas profesionalmente y entregadas en Alta Resolución (para impresión) y optimizadas para Redes Sociales. Respaldadas en nuestra plataforma en la nube de forma gratuita por 6 meses.
        </p>
      </div>

      {/* Proceso de Trabajo - BODAS */}
      <div className="bg-secondary text-dominant p-6">
        <h2 className="font-serif text-3xl mb-12 text-center">El proceso hacia tu Gran Día</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">1</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Contacto</h4>
            <p className="font-sans text-xs text-gray-400">Envíame un mensaje para verificar disponibilidad de tu fecha.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">2</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Reserva</h4>
            <p className="font-sans text-xs text-gray-400">Aseguramos tu fecha con un anticipo y firmamos contrato para tu tranquilidad.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">3</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">El Evento</h4>
            <p className="font-sans text-xs text-gray-400">Capturo la magia de tu boda de forma discreta, profesional y con calidez.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">4</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Entrega</h4>
            <p className="font-sans text-xs text-gray-400">Recibe tu galería digital privada y editada en un lapso de 3 a 4 semanas.</p>
          </div>
        </div>
      </div>
    </>
  );
}