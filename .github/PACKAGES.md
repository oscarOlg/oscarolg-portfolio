# ESTRUCTURA DE DATOS PARA COMPONENTES DE PRECIOS (PRICING CARDS)
Por favor, utiliza la siguiente estructura de datos para construir la sección de precios de la página web. La sección se divide en 3 categorías principales: Colecciones de Boda, Sesiones Previas y Complementos. Para los paquetes, utiliza los campos `targetAudience` y `promise` para formar la descripción principal de la tarjeta, dándole a `targetAudience` un énfasis visual sutil (como cursivas o un color secundario).

## CATEGORÍA 1: Colecciones de Boda

### Paquete 1 (Destacado / High-End)
- **id**: signature
- **title**: Signature
- **subtitle**: El Legado Completo
- **price**: $14,500 MXN
- **targetAudience**: Diseñada para la pareja que quiere delegarlo absolutamente todo y vivir su día con cero estrés.
- **promise**: Estaré con ustedes durante 10 horas, capturando de manera invisible desde los nervios bonitos del maquillaje hasta el clímax de la pista de baile. Es para quienes no solo quieren una galería digital, sino la tranquilidad de saber que su historia ya incluye un Photobook de arte para su nuevo hogar y un adelanto para sus redes sociales al día siguiente. Ustedes dedíquense a disfrutar la fiesta; yo me encargo del legado familiar.
- **isPopular**: false
- **features**:
  - Cobertura Inmersiva del Día (10 horas): Desde el Getting Ready hasta la recepción.
  - El Legado Familiar: Photobook Premium 10x10 (Pasta dura de alta calidad).
  - Galería Digital Premium: Toda la historia en alta resolución con edición cinematográfica.
- **bonuses**:
  - BONO VIP: 'Sneak Peek' (Adelanto de 30 fotos al día siguiente).
  - BONO: Sesión 'Save the Date' (Valorada en $2,500 MXN, 1.5 hrs en exteriores).

### Paquete 2 (El más vendido)
- **id**: clasica
- **title**: Clásica
- **subtitle**: La Inversión Inteligente
- **price**: $10,500 MXN
- **targetAudience**: El equilibrio perfecto. Esta colección es para las parejas que quieren disfrutar de su boda sin interrupciones, con la seguridad de que ningún momento clave se quedará fuera.
- **promise**: Durante 8 horas documentaré los últimos detalles de su arreglo, toda la ceremonia, una sesión de recién casados fluida y sin poses forzadas, y lo mejor de la recepción. Tendrán la historia completa de su gran día narrada con un estilo cinematográfico, dándoles total libertad para tomarse ese trago y bailar con sus invitados.
- **isPopular**: true
- **features**:
  - Cobertura Principal del Evento (8 horas): Detalles del arreglo, ceremonia, sesión fluida y recepción.
  - Galería Digital Premium: Memorias entregadas en plataforma privada de alta calidad.
- **bonuses**:
  - BONO: Sesión 'Save the Date' (Valorada en $2,500 MXN, 1.5 hrs para romper el hielo).

### Paquete 3 (Básico)
- **id**: esencial
- **title**: Esencial
- **subtitle**: Enfoque Ágil
- **price**: $7,000 MXN
- **targetAudience**: Ideal para bodas dinámicas y prácticas donde la prioridad es documentar el corazón del evento sin extenderse demasiadas horas.
- **promise**: Estaré con ustedes durante 5 horas, el tiempo exacto y necesario para capturar la ceremonia, dirigir una sesión de esposos rápida pero de revista, los retratos familiares y su gran entrada triunfal a la recepción. Es para quienes quieren nuestro característico estilo documental enfocado directamente en la acción principal.
- **isPopular**: false
- **features**:
  - Cobertura Esencial (5 horas): Ceremonia, sesión formal, retratos familiares y entrada a recepción.
  - Galería Digital Privada: Alta resolución, listas para descargar y compartir.
- **bonuses**: []

### Paquete 4 (Eventos Pequeños)
- **id**: civil
- **title**: Civil e Íntima
- **subtitle**: Cobertura Discreta
- **price**: $4,500 MXN
- **targetAudience**: Pensada exclusivamente para bodas por el civil o celebraciones muy pequeñas. Que su evento sea íntimo no significa que sus recuerdos deban verse "comunes".
- **promise**: Durante 3 horas, seré una presencia discreta para documentar la ceremonia legal y realizar una sesión relajada de pareja y familia. Para quienes buscan alta calidad estética y profesionalismo en un formato corto, directo y sin complicaciones logísticas.
- **isPopular**: false
- **features**:
  - Cobertura Concisa (3 horas): Ceremonia legal y sesión fotográfica de pareja/familia.
  - Galería Digital Privada: Alta resolución con edición de color e iluminación.
- **bonuses**: []

---

## CATEGORÍA 2: Sesiones Previas y Casuales

### Paquete Único
- **id**: save_the_date
- **title**: Sesión de Compromiso
- **subtitle**: Save the Date
- **price**: $2,500 MXN
- **targetAudience**: Más que unas fotos para sus invitaciones, este es su "ensayo general" para perderle el miedo a la cámara antes de la boda.
- **promise**: Es para las parejas que piensan "somos pésimos posando" y quieren descubrir lo fácil y divertido que es verse increíbles. Pasaremos 1.5 horas conectando, riendo y creando fotos 100% naturales, para que cuando llegue el día de su boda, pararse frente a mi lente sea la parte más relajante de su día.
- **features**:
  - Sesión Relajada (1.5 horas): En la locación de su preferencia en Ciudad Juárez.
  - Dirección Natural: Interacción 100% auténtica y orgánica, cero poses acartonadas.
  - Asesoría de Estilo: Recomendaciones de paletas de colores y outfits.
  - Galería Digital Privada: Fotografías seleccionadas en alta resolución.
- **note**: "Si después de esta sesión deciden invertir en la Colección Clásica o Signature, el valor de esta sesión se bonificará íntegramente a su paquete final."

---

## CATEGORÍA 3: Piezas de Conservación y Complementos (Add-ons)

### Lista de Productos (Formato: Nombre - Precio - Descripción)
- **Colección de Recuerdos** | $1,500 MXN | 50 fotografías impresas (4x6") + 2 ampliaciones para enmarcar (8x10").
- **Herencia Familiar** | $2,800 MXN | 100 fotografías impresas (4x6") + 4 ampliaciones (8x10").
- **Arte en Casa** | $3,500 MXN | 1 ampliación grande (16x20") + 2 ampliaciones medianas (11x14").
- **Photobook Premium** | $4,500 MXN | Tamaño 10x10.
- **Photobook Gran Formato** | $6,000 MXN | Tamaño 12x12.
- **Hora de Servicio Extra** | $2,000 MXN | Cobertura adicional el día del evento.