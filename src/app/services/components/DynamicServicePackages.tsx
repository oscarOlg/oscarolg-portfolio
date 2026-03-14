import Link from "next/link";
import type { ServicePackage } from "@/types/sanity";

interface DynamicServicePackagesProps {
  serviceKey: string;
  allPackages: ServicePackage[];
}

export default function DynamicServicePackages({
  serviceKey,
  allPackages,
}: DynamicServicePackagesProps) {
  // Filter packages for this service and sort by display order
  const packages = allPackages
    .filter((p) => p.category === serviceKey)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  if (packages.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-sans text-gray-500">No packages available for this service.</p>
      </div>
    );
  }

  return (
    <>
      {/* === PACKAGE GRID === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 mt-8">
        {packages.map((pkg) => {
          const showPrice = (pkg.price || 0) > 0;
          const isMostPopular = pkg.popular;

          return (
            <div
              key={pkg._id}
              className={`flex flex-col ${
                isMostPopular
                  ? "border-2 border-accent relative"
                  : "border border-gray-100"
              } p-8`}
            >
              {/* Popular Badge */}
              {isMostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[10px] uppercase tracking-widest px-3 py-1 font-bold whitespace-nowrap">
                  Más Popular
                </span>
              )}

              {/* Name */}
              <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>

              {/* Tier/Description */}
              <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">
                {pkg.description || "Paquete Especial"}
              </p>

              {/* Features List */}
              <ul className="font-sans text-sm text-gray-600 space-y-3 mb-8 flex-grow">
                {pkg.features && pkg.features.length > 0 ? (
                  pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2">
                    <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                    <span>Paquete profesional personalizado</span>
                  </li>
                )}
              </ul>

              {/* Pricing & CTA */}
              <div className="mt-auto">
                {showPrice && pkg.price !== null && (
                  <p className="font-serif text-2xl text-secondary mb-4">
                    ${pkg.price.toLocaleString("es-MX")}{" "}
                    <span className="text-sm font-sans text-gray-400">MXN</span>
                  </p>
                )}
                <Link
                  href="/contact"
                  className={`block text-center w-full uppercase tracking-widest text-xs py-3 transition-colors ${
                    isMostPopular
                      ? "bg-accent text-secondary hover:bg-opacity-90 font-semibold"
                      : "bg-secondary text-dominant hover:bg-accent"
                  }`}
                >
                  Reservar
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* === ADD-ONS SECTION === */}
      {packages.some((p) => p.addOns && p.addOns.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8 mb-8">
          <div>
            <h4 className="font-serif text-xl mb-4 text-secondary">Complementos</h4>
            {packages[0]?.addOns && packages[0].addOns.length > 0 ? (
              packages[0].addOns.map((addOn, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-3 gap-4"
                >
                  <span className="font-sans text-sm text-gray-600">
                    {addOn.name}
                    {addOn.unit && (
                      <span className="block text-xs italic text-accent mt-1">
                        por {addOn.unit}
                      </span>
                    )}
                  </span>
                  {addOn.price !== null && (
                    <span className="font-sans font-semibold text-secondary whitespace-nowrap mt-0.5 sm:mt-0">
                      ${addOn.price.toLocaleString("es-MX")} MXN
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="font-sans text-sm text-gray-500">
                No add-ons available for this service.
              </p>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-gray-50 p-6 flex flex-col justify-center">
            <h4 className="font-serif text-xl mb-3 text-secondary">¿Preguntas sobre este servicio?</h4>
            <p className="font-sans text-sm text-gray-600">
              Contáctanos directamente para cotizar combos personalizados, especiales o ajustes a los paquetes. Adaptamos cada sesión a tus necesidades.
            </p>
          </div>
        </div>
      )}

      {/* === GLOBAL BENEFITS === */}
      <div className="bg-dominant p-6 mb-10 text-center border border-gray-100">
        <p className="font-sans text-sm tracking-widest uppercase text-accent mb-2 font-semibold">
          Inclusiones en todas las sesiones
        </p>
        <p className="font-sans text-sm text-gray-600">
          Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.
        </p>
      </div>
    </>
  );
}
