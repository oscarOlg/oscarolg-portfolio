export default function EventPackages() {
  return (
    <>
      <p className="font-sans text-gray-600 mb-16 mt-8">Aquí puedes agregar tus paquetes por hora para Bautizos, Aniversarios, etc.</p>

      <div className="bg-secondary text-dominant p-8 md:p-12">
        <h2 className="font-serif text-3xl mb-12 text-center">Nuestro Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">1</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Contacto</h4>
            <p className="font-sans text-xs text-gray-400">Cuéntame los detalles de tu evento para ajustar horas y cobertura.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">2</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Reserva</h4>
            <p className="font-sans text-xs text-gray-400">Separamos tu fecha con un anticipo para asegurar mi asistencia exclusiva.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">3</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">La Fiesta</h4>
            <p className="font-sans text-xs text-gray-400">Documento los momentos clave y la atmósfera sin interrumpir la diversión.</p>
          </div>
          <div>
            <span className="block font-serif text-4xl text-accent mb-4">4</span>
            <h4 className="font-sans uppercase tracking-widest text-xs mb-3">Entrega</h4>
            <p className="font-sans text-xs text-gray-400">Galería digital privada lista para compartir con tus invitados en 2 a 3 semanas.</p>
          </div>
        </div>
      </div>
    </>
  );
}