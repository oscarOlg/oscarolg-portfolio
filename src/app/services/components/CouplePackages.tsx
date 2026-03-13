// src/components/CouplePackages.tsx
import Link from "next/link";

export default function CouplePackages() {
  return (
    <>
      <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
        <p className="font-sans text-base text-gray-600 leading-relaxed">
          Diseñado para celebrar la conexión con tus personas favoritas. Ya sea un retrato de pareja, memorias familiares o una sesión con tu grupo de amigos, creamos un ambiente relajado para capturar la dinámica y esencia genuina que los une.
          <span className="italic text-sm text-gray-400 mt-2 block">*Todos los paquetes incluyen cobertura base para 2 personas. Aplica costo extra a partir del tercer integrante.</span>
        </p>
      </div>

      {/* Grid de Paquetes Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Paquete Esencial */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Esencial</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Sesión Casual</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de <b>1 hora</b> en locación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura para 2 personas (1 cambio de vestuario)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>15 fotografías</b> editadas profesionalmente</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$1,800 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Reservar</Link>
          </div>
        </div>

        {/* Paquete Clásico */}
        <div className="border-2 border-accent p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap">Más Popular</span>
          <h3 className="font-serif text-2xl mb-2">Clásico</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">La experiencia completa</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de <b>2 horas</b> en locación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura para 2 personas (Hasta 2 cambios de vestuario)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>20 fotografías</b> editadas profesionalmente</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$2,200 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-accent text-secondary uppercase tracking-widest text-xs py-3 hover:bg-opacity-90 transition-colors font-semibold">Reservar</Link>
          </div>
        </div>

        {/* Paquete Premium */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Premium</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Memoria Documental</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de <b>2 horas</b> en locación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura para 2 personas (Hasta 3 cambios de vestuario)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>30 fotografías</b> editadas profesionalmente</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$2,500 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Reservar</Link>
          </div>
        </div>
      </div>

      {/* Complementos y Estudio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8 mb-8">
        <div>
          <h4 className="font-serif text-xl mb-4 text-secondary">Complementos</h4>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">Persona o mascota extra</span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$250 MXN / c.u.</span>
          </div>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">Fotografía extra editada</span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$150 MXN / c.u.</span>
          </div>
          <div className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 gap-4">
            <span className="font-sans text-sm text-gray-600">Hora extra de sesión</span>
            <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">$1,000 MXN</span>
          </div>
        </div>
        
        {/* Tarjeta de precios de estudio */}
        <div className="bg-gray-50 p-6 flex flex-col justify-center">
          <h4 className="font-serif text-xl mb-3 text-secondary">¿Buscan fotos en estudio?</h4>
          <p className="font-sans text-sm text-gray-600 mb-0">
            Cualquiera de estas sesiones puede realizarse en estudio fotográfico profesional. El costo de renta se cotiza por separado según disponibilidad y el estudio de su elección (inversión promedio de <b>$600 MXN por hora</b>).
          </p>
        </div>
      </div>

      {/* Beneficios Globales */}
      <div className="bg-dominant p-6 mb-10 text-center border border-gray-100">
        <p className="font-sans text-sm tracking-widest uppercase text-accent mb-2 font-semibold">Inclusiones en todas las sesiones</p>
        <p className="font-sans text-sm text-gray-600">
          Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.
        </p>
      </div>

      {/* Proceso de Trabajo */}
      <div className="bg-secondary text-dominant p-6">
        <h2 className="font-serif text-3xl mb-12 text-center">Cómo funciona la sesión</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">1</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Idea</h4>
            <p className="font-sans text-xs text-gray-400">Platicamos sobre su estilo, dinámica y la vibra que buscan para sus fotos.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">2</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Planeación</h4>
            <p className="font-sans text-xs text-gray-400">Agendamos la fecha con un anticipo y elegimos la locación perfecta.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">3</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">La Sesión</h4>
            <p className="font-sans text-xs text-gray-400">Dirección de pose natural para documentar su conexión de forma auténtica.</p>
          </div>Ideal para sesiones de compromiso (pre-boda), aniversarios, retrato familiar o simplemente para documentar la conexión con los tuyos. Dirigimos la sesión para capturar la esencia genuina de su vínculo.
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">4</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Entrega</h4>
            <p className="font-sans text-xs text-gray-400">Selección y edición final de sus mejores fotografías en 1 a 2 semanas.</p>
          </div>
        </div>
      </div>
    </>
  );
}