// src/components/MaternityPackages.tsx
import Link from "next/link";

export default function MaternityPackages() {
  return (
    <>
      <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
        <p className="font-sans text-base text-gray-600 leading-relaxed">
          Documentamos la belleza, la fuerza y la dulce espera de esta etapa irrepetible. Sesiones diseñadas para que te sientas cómoda, hermosa y en confianza, ya sea sola o acompañada de tu pareja y familia.
        </p>
      </div>

      {/* Grid a 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Paquete 1: Esencial */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Esencial</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">El brillo de la espera</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de <b>1 hora</b> en locación</span>
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

        {/* Paquete 2: Experiencia Completa */}
        <div className="border-2 border-accent p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap">Experiencia Completa</span>
          <h3 className="font-serif text-2xl mb-2">Documental de Vida</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Maternidad y Familia</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión extendida de <b>2 horas</b> en locación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Participación de pareja e hijos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Hasta 2 cambios de vestuario</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>30 fotografías</b> editadas profesionalmente</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$2,500 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-accent text-secondary uppercase tracking-widest text-xs py-3 hover:bg-opacity-90 transition-colors font-semibold">Reservar</Link>
          </div>
        </div>

      </div>
      
      {/* Tarjeta de Estudio para Maternidad */}
      <div className="bg-gray-50 p-8 text-center mb-10 border border-gray-100">
        <h4 className="font-serif text-xl mb-3 text-secondary">¿Deseas una sesión más íntima en estudio?</h4>
        <p className="font-sans text-sm text-gray-600 max-w-2xl mx-auto">
          La fotografía de maternidad en estudio ofrece un look elegante y atemporal. Contamos con opciones de estudios profesionales en la ciudad. El costo de renta se cotiza por separado (promedio de <b>$600 MXN por hora</b>).
        </p>
      </div>

      {/* Beneficios Globales */}
      <div className="bg-dominant p-6 mb-10 text-center border border-gray-100">
        <p className="font-sans text-sm tracking-widest uppercase text-accent mb-2 font-semibold">Inclusiones en todas las sesiones</p>
        <p className="font-sans text-sm text-gray-600">
          Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.
        </p>
      </div>

      {/* Proceso de Trabajo - MATERNIDAD */}
      <div className="bg-secondary text-dominant p-6">
        <h2 className="font-serif text-3xl mb-12 text-center">Cómo funciona la sesión</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">1</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Idea</h4>
            <p className="font-sans text-xs text-gray-400">Platicamos sobre el estilo, vestuario y la vibra que buscas para tus fotos.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">2</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Planeación</h4>
            <p className="font-sans text-xs text-gray-400">Agendamos la fecha (idealmente entre la <b>semana 28 y 34</b>) con un anticipo.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">3</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">La Sesión</h4>
            <p className="font-sans text-xs text-gray-400">Te guiaré con dirección de pose natural para que te sientas cómoda y hermosa.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">4</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Entrega</h4>
            <p className="font-sans text-xs text-gray-400">Selección y edición final de tus mejores fotografías en 1 a 2 semanas.</p>
          </div>
        </div>
      </div>
    </>
  );
}