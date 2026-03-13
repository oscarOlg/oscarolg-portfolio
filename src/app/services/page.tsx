// src/app/services/page.tsx
import { Suspense } from "react";
import ServicesContent from "./ServicesContent";

// Revalidate services data every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

export default function ServicesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">
      {/* Componente que lee los parámetros de la URL para abrir la pestaña correcta */}
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-sans tracking-widest uppercase text-sm">Cargando paquetes...</div>}>
        <ServicesContent />
      </Suspense>
    </div>
  );
}