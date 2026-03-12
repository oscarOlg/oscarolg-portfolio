// src/components/CommercialPackages.tsx
import Link from "next/link";

export default function CommercialPackages() {
  return (
    <>
      <div className="mb-10 mt-8 text-center max-w-3xl mx-auto">
        <p className="font-sans text-base text-gray-600 leading-relaxed">
          Eleva la percepción de tu marca. Creamos bancos de imágenes a la medida para empresas, emprendedores y negocios que buscan transmitir profesionalismo y conectar con su audiencia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Paquete 1: Emprendedores / Marca Personal */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Retrato Corporativo</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Headshots / Marca Personal</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Sesión de <b>1 hora</b> en locación u oficina</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Ideal para LinkedIn, perfiles médicos o ejecutivos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>10 fotografías</b> con retoque de alta gama</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$2,000 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Cotizar</Link>
          </div>
        </div>

        {/* Paquete 2: PyMEs y Negocios Locales */}
        <div className="border-2 border-accent p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap">Ideal para PyMEs</span>
          <h3 className="font-serif text-2xl mb-2">Negocio Local</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Contenido para Redes y Web</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Hasta <b>2.5 horas</b> de sesión en tus instalaciones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Cobertura de espacios, equipo de trabajo y producto o servicio en acción</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>30 fotografías</b> en Alta Resolución</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-serif text-2xl text-secondary mb-4">$4,500 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-accent text-secondary uppercase tracking-widest text-xs py-3 hover:bg-opacity-90 transition-colors font-semibold">Cotizar Proyecto</Link>
          </div>
        </div>

        {/* Paquete 3: Medianas y Grandes Empresas */}
        <div className="border border-gray-100 p-8 flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Producción Mayor</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Corporativo / Industrial</p>
          <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Producción de <b>Medio Día a Día Completo</b> (4 a 8 hrs)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span>Múltiples locaciones, áreas industriales o campañas publicitarias amplias</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">•</span> 
              <span><b>50+ fotografías</b> en Alta Resolución</span>
            </li>
          </ul>
          <div className="mt-auto">
            <p className="font-sans text-xs text-gray-400 mb-1 uppercase tracking-widest">A partir de</p>
            <p className="font-serif text-2xl text-secondary mb-4">$8,000 <span className="text-sm font-sans text-gray-400">MXN</span></p>
            <Link href="/contact" className="block text-center w-full bg-secondary text-dominant uppercase tracking-widest text-xs py-3 hover:bg-accent transition-colors">Cotizar Proyecto</Link>
          </div>
        </div>
      </div>

      {/* Bloque de Flexibilidad y Negociación */}
      <div className="bg-accent/10 border border-accent/20 p-6 mb-10 text-center relative">
        <h3 className="font-serif text-2xl text-secondary mb-3">Presupuestos a la Medida</h3>
        <p className="font-sans text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Entiendo que las necesidades de una cafetería emergente no son las mismas que las de una planta industrial. Estoy completamente abierto a escuchar la visión de tu proyecto y <b>hacer ajustes o negociar estos paquetes</b> para crear una propuesta que empate perfectamente con los requerimientos y el presupuesto de tu empresa.
        </p>
      </div>

      {/* Beneficios Globales */}
      <div className="bg-dominant p-6 mb-10 text-center border border-gray-100">
        <p className="font-sans text-sm tracking-widest uppercase text-accent mb-2 font-semibold">Inclusiones en todos los proyectos</p>
        <p className="font-sans text-sm text-gray-600">
          Galería digital privada entregada en Alta Resolución (para impresión y espectaculares) y optimizada para uso en plataformas digitales y Redes Sociales. Sus archivos estarán respaldados en la nube de forma gratuita por 3 meses.
        </p>
      </div>

      {/* Proceso de Trabajo - COMERCIAL */}
      <div className="bg-secondary text-dominant p-6">
        <h2 className="font-serif text-3xl mb-12 text-center">Cómo funciona nuestro proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">1</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Briefing</h4>
            <p className="font-sans text-xs text-gray-400">Platicamos sobre los objetivos comerciales de tu marca y la estética visual que buscas proyectar.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">2</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Planeación</h4>
            <p className="font-sans text-xs text-gray-400">Definimos fechas, locaciones y cronograma de actividades asegurando la fecha con un anticipo.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">3</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Producción</h4>
            <p className="font-sans text-xs text-gray-400">Ejecutamos la sesión fotográfica de manera ágil, profesional y sin interrumpir tu operación.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">4</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Entrega</h4>
            <p className="font-sans text-xs text-gray-400">Recibes tu banco de imágenes editado, clasificado y en Alta Resolución en 1 a 2 semanas.</p>
          </div>
        </div>
      </div>
    </>
  );
}