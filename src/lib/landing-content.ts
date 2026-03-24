import { getServiceByKey } from "@/config/services";

export type LandingLanguage = "es" | "en";

export interface LandingBenefit {
  title: string;
  description: string;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface ServiceLandingContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  socialProof: string;
  benefits: LandingBenefit[];
  urgency: {
    headline: string;
    description: string;
    cta: string;
  };
  faq: LandingFaq[];
}

type BilingualContent = {
  es: ServiceLandingContent;
  en: ServiceLandingContent;
};

export const landingContent: Record<string, BilingualContent> = {
  weddings: {
    es: {
      hero: {
        headline: "Tu boda, contada con arte",
        subheadline: "Cobertura artesanal desde $7,990 MXN. Fotos que duraran toda la vida.",
        cta: "Ver paquetes y reservar",
      },
      socialProof: "Cada boda merece atencion genuina y fotografia que capture lo que importa.",
      benefits: [
        { title: "Momentos completos", description: "Preparativos, ceremonia, fiesta: nada se queda sin contar." },
        { title: "Imagen limpia", description: "Retoque fino sin perder la naturalidad de cada momento." },
        { title: "Entregas puntuales", description: "Galeria lista en 3-4 semanas para compartir y imprimir." },
        { title: "Tuya para siempre", description: "Descargas en alta resolucion para tus necesidades hoy y mañana." },
      ],
      urgency: {
        headline: "Los meses mas solicitados se agotan rapido",
        description: "Cada mes confirmamos pocas bodas. Reserva ahora para tu fecha soñada.",
        cta: "Reservar mi boda",
      },
      faq: [
        { q: "Cuantas fotos se entregan", a: "Normalmente entre 400 y 600 fotos segun el paquete." },
        { q: "Cuanto tarda la entrega", a: "La galeria final se entrega en 3 a 4 semanas." },
        { q: "Se requiere anticipo", a: "Si, se solicita 30 por ciento para bloquear la fecha." },
      ],
    },
    en: {
      hero: {
        headline: "Wedding photography that tells your story",
        subheadline: "Full coverage in Ciudad Juarez from $7,990 MXN",
        cta: "View packages",
      },
      socialProof: "Editorial style photography with personalized attention for every couple.",
      benefits: [
        { title: "Full coverage", description: "From getting ready to the final dance." },
        { title: "Professional editing", description: "Every image is hand-finished in editorial style." },
        { title: "Fast delivery", description: "Complete gallery in 3 to 4 weeks." },
        { title: "Digital gallery", description: "High-resolution downloads for your whole family." },
      ],
      urgency: {
        headline: "Dates are reserved on a first come basis",
        description: "A limited monthly calendar protects quality and personalized service.",
        cta: "Book a free consultation",
      },
      faq: [
        { q: "How many photos are delivered", a: "Usually between 400 and 600 photos depending on package." },
        { q: "How fast is delivery", a: "Final gallery is delivered within 3 to 4 weeks." },
        { q: "Is a deposit required", a: "Yes, a 30 percent deposit secures your date." },
      ],
    },
  },
  portrait: {
    es: {
      hero: {
        headline: "Retrato que te ve",
        subheadline: "Sesion guiada donde te ves como realmente eres. Ideal para CV, LinkedIn o simple gusto.",
        cta: "Disponibilidad y precios",
      },
      socialProof: "Direccion amable para que te sientas comodo y te veas autentico.",
      benefits: [
        { title: "Te guio todo el proceso", description: "Poses, angulos, expresion: sin que nada sea forzado." },
        { title: "Resultado limpio", description: "Retoque delicado que mantiene tu naturalidad." },
        { title: "Tu espacio", description: "Estudio acogedor o exterior donde te sientas libre." },
        { title: "Listo para usar", description: "Fotos optimizadas para redes, curriculum y mas." },
      ],
      urgency: {
        headline: "Espacios en agenda disponibles",
        description: "Tardes y fines de semana se llenan rapidamente. Elige tu dia.",
        cta: "Reservar retrato",
      },
      faq: [
        { q: "Necesito experiencia previa", a: "No, toda la direccion se da durante la sesion." },
        { q: "Cuantas fotos recibo", a: "Depende del paquete elegido y objetivos de la sesion." },
        { q: "Puedo llevar cambios", a: "Si, puedes incluir cambios de look segun el paquete." },
      ],
    },
    en: {
      hero: {
        headline: "Portraits that capture your essence",
        subheadline: "Professional sessions with guided posing and editorial style",
        cta: "Get portrait pricing",
      },
      socialProof: "Clear direction so you look natural and confident on camera.",
      benefits: [
        { title: "Guided posing", description: "You get direction from start to finish." },
        { title: "Clean retouching", description: "Natural skin and expression with polished finish." },
        { title: "Flexible setup", description: "Studio feel or outdoor, based on your goals." },
        { title: "Digital delivery", description: "Gallery ready for social and professional use." },
      ],
      urgency: {
        headline: "Book the week that works for you",
        description: "Evening and weekend time slots are taken first.",
        cta: "Reserve portrait session",
      },
      faq: [
        { q: "Do I need prior modeling experience", a: "No, full direction is provided during your session." },
        { q: "How many photos do I receive", a: "It depends on your selected package and goals." },
        { q: "Can I bring outfit changes", a: "Yes, outfit changes are supported by package." },
      ],
    },
  },
  couples: {
    es: {
      hero: {
        headline: "Fotos de ustedes, de verdad",
        subheadline: "Sin poses raras. Solo conexion real, luz hermosa y recuerdos que duran.",
        cta: "Reservar sesion de pareja",
      },
      socialProof: "Sesiones donde puedes ser tu mismo. Nosotros capturamos lo importante.",
      benefits: [
        { title: "Fluidez sin forzar", description: "Indicaciones simples para momentos genuinos." },
        { title: "Locaciones perfectas", description: "Te muestro spots con luz abierta y fondo hermoso." },
        { title: "Tiempo bien usado", description: "Cada minuto cuenta. Sesion dinamica y tranquila." },
        { title: "Para compartir y guardar", description: "Fotos listas para imprimir, redes y reliquias familiares." },
      ],
      urgency: {
        headline: "Las mejores luces se reservan primero",
        description: "Primavera y otono tienen poco espacio. Elige tu temporada.",
        cta: "Separar mi fecha",
      },
      faq: [
        { q: "Podemos llevar mascota", a: "Si, en locaciones permitidas y con aviso previo." },
        { q: "Cuanto dura la sesion", a: "Depende del paquete, normalmente entre 45 y 120 minutos." },
        { q: "Que ropa recomiendan", a: "Te comparto una guia de vestuario antes de la sesion." },
      ],
    },
    en: {
      hero: {
        headline: "Couples sessions with real storytelling",
        subheadline: "Authentic moments you will keep for life",
        cta: "View options",
      },
      socialProof: "Guided sessions built to feel natural instead of forced.",
      benefits: [
        { title: "Natural direction", description: "Simple prompts for real connection." },
        { title: "Location guidance", description: "Suggested spots with great light and backgrounds." },
        { title: "Efficient flow", description: "Dynamic session to use every minute well." },
        { title: "Share-ready gallery", description: "Delivered for both print and social formats." },
      ],
      urgency: {
        headline: "Take advantage of prime light season",
        description: "Spring and fall sessions are booked further in advance.",
        cta: "Reserve your date",
      },
      faq: [
        { q: "Can we bring our pet", a: "Yes, in approved locations with prior notice." },
        { q: "How long is the session", a: "Usually between 45 and 120 minutes by package." },
        { q: "What should we wear", a: "You get a wardrobe guide before session day." },
      ],
    },
  },
  maternity: {
    es: {
      hero: {
        headline: "La maternidad, hermosa y comoda",
        subheadline: "Sesion elegante donde te sientes segura y bonita. Recuerdos para siempre.",
        cta: "Conocer paquetes",
      },
      socialProof: "Un espacio tranquilo donde te veras unica. Eso es lo que capturamos.",
      benefits: [
        { title: "Direccion que favorece", description: "Poses comodas que resaltan tu belleza en este momento." },
        { title: "Sin prisa", description: "Pausas cuando necesites. Cambios de look sin estrés." },
        { title: "Fotos emocionales", description: "Limpias, delicadas, lindas de guardar y compartir." },
        { title: "Donde tu quieras", description: "Estudio calido, intimidad de casa o naturaleza afuera." },
      ],
      urgency: {
        headline: "Mejor entre semana 28 y 34",
        description: "Reserva con tiempo para elegir la fecha y el estilo que imaginas.",
        cta: "Agendar asesoria gratis",
      },
      faq: [
        { q: "En que semana se recomienda", a: "Generalmente entre semana 28 y 34 del embarazo." },
        { q: "Pueden participar pareja e hijos", a: "Si, podemos incluir familia cercana segun paquete." },
        { q: "Debo llevar vestuario", a: "Te enviamos recomendaciones antes de la sesion." },
      ],
    },
    en: {
      hero: {
        headline: "Maternity photography with style and care",
        subheadline: "A comfortable, guided session for a unique life stage",
        cta: "Get maternity pricing",
      },
      socialProof: "Calm atmosphere, gentle direction, and elegant results.",
      benefits: [
        { title: "Careful posing", description: "Comfortable and flattering direction throughout." },
        { title: "Relaxed pacing", description: "Time for pauses and wardrobe changes." },
        { title: "Editorial finish", description: "Clean and emotional images built to last." },
        { title: "Location options", description: "Studio feel, home, or outdoor settings." },
      ],
      urgency: {
        headline: "Best timing is weeks 28 to 34",
        description: "Booking early helps secure your ideal schedule.",
        cta: "Schedule consultation",
      },
      faq: [
        { q: "When is best to shoot", a: "Most sessions happen between weeks 28 and 34." },
        { q: "Can partner or kids join", a: "Yes, close family can join by package." },
        { q: "Do I need to bring outfits", a: "You receive wardrobe recommendations before session." },
      ],
    },
  },
  commercial: {
    es: {
      hero: {
        headline: "Contenido que vende",
        subheadline: "Fotos profesionales para tus redes, tienda y anuncios. Diseñadas para convertir.",
        cta: "Solicitar propuesta",
      },
      socialProof: "Produccion visual que alza tus ventas. Consistencia que genera confianza.",
      benefits: [
        { title: "Diseñado para vender", description: "Cada foto optimizada para redes, web, pauta publicitaria." },
        { title: "Plan antes de disparar", description: "Brief claro, objetivos definidos, resultado garantizado." },
        { title: "Entrega lista para usar", description: "Archivos en los formatos y tamaños que necesitas." },
        { title: "Marca reconocible", description: "Foto tras foto, tus colores y estilo hablan solos." },
      ],
      urgency: {
        headline: "Planifica produccion ahora",
        description: "Lanzamientos exitosos empiezan con contenido listo. No improvises.",
        cta: "Cotizar proyecto",
      },
      faq: [
        { q: "Trabajas con negocios pequenos", a: "Si, hay formatos adaptados por objetivo y presupuesto." },
        { q: "Incluye direccion creativa", a: "Si, podemos construir concepto y shot list juntos." },
        { q: "En cuanto tiempo entregas", a: "Depende del alcance, con opciones de entrega prioritaria." },
      ],
    },
    en: {
      hero: {
        headline: "Commercial photography for your brand",
        subheadline: "Professional content that improves digital performance",
        cta: "Request proposal",
      },
      socialProof: "Visual production focused on conversion and brand consistency.",
      benefits: [
        { title: "Commercial focus", description: "Images built for web, social, and ads." },
        { title: "Pre-production", description: "Brief, objectives, and shot list alignment." },
        { title: "Useful delivery", description: "Assets optimized per channel and use case." },
        { title: "Consistency", description: "Unified visual direction across brand touchpoints." },
      ],
      urgency: {
        headline: "Book production before your next campaign",
        description: "Launches perform better with content prepared in advance.",
        cta: "Get a quote",
      },
      faq: [
        { q: "Do you work with small businesses", a: "Yes, packages scale by goal and budget." },
        { q: "Is creative direction included", a: "Yes, concept and shot list can be planned together." },
        { q: "What is delivery timeline", a: "It depends on scope, with rush options available." },
      ],
    },
  },
  editorial: {
    es: {
      hero: {
        headline: "Fotografia que impacta",
        subheadline: "Producciones de autor con direccion creativa. Imagenes que cuentan historias.",
        cta: "Iniciar proyecto",
      },
      socialProof: "Cada produccion es unica. Arte y tecnica al mas alto nivel.",
      benefits: [
        { title: "Creacion desde cero", description: "Concepto visual que refleja tu marca o historia." },
        { title: "Imagenes coherentes", description: "Secuencias memorables que funcionan como narrativa." },
        { title: "Tecnica perfecta", description: "Luz, color, composicion: cada detalle cuenta." },
        { title: "Pulida para publicar", description: "Listas para medios, portafolio, exposiciones." },
      ],
      urgency: {
        headline: "Proyectos requieren tiempo",
        description: "Planificacion, locacion, produccion: reserva con anticipacion.",
        cta: "Consulta disponibilidad",
      },
      faq: [
        { q: "Trabajas con agencias", a: "Si, colaboramos con equipos creativos y marcas." },
        { q: "Se puede producir en locacion", a: "Si, interior o exterior segun concepto." },
        { q: "Incluyes retoque final", a: "Si, se entrega edicion final segun objetivo del proyecto." },
      ],
    },
    en: {
      hero: {
        headline: "High-impact editorial photography",
        subheadline: "Creative direction for images with clear identity",
        cta: "Check availability",
      },
      socialProof: "Art-directed productions with polished professional execution.",
      benefits: [
        { title: "Creative direction", description: "Visual development aligned with concept." },
        { title: "Visual storytelling", description: "Coherent and memorable image sequences." },
        { title: "Technical control", description: "Light, color, and composition handled precisely." },
        { title: "Publishing-ready delivery", description: "Assets prepared for media and portfolio use." },
      ],
      urgency: {
        headline: "Reserve date for pre-production",
        description: "Editorial projects need planning for location and styling.",
        cta: "Start project",
      },
      faq: [
        { q: "Do you work with agencies", a: "Yes, we collaborate with creative teams and brands." },
        { q: "Can production happen on location", a: "Yes, indoor or outdoor based on concept." },
        { q: "Is final retouch included", a: "Yes, final edits are delivered by project objective." },
      ],
    },
  },
};

const fallbackService = "weddings";

export function getLandingContent(service: string, lang: LandingLanguage): ServiceLandingContent {
  const serviceContent = landingContent[service] ?? landingContent[fallbackService];
  return serviceContent[lang];
}

export function getServiceDisplayName(service: string, lang: LandingLanguage): string {
  const cfg = getServiceByKey(service);
  if (!cfg) return lang === "en" ? "Weddings" : "Bodas";
  return lang === "en" ? cfg.nameEn : cfg.name;
}
