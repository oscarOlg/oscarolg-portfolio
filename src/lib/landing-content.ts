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
        headline: "Fotografia de bodas que cuenta tu historia",
        subheadline: "Cobertura completa en Ciudad Juarez desde $7,990 MXN",
        cta: "Ver paquetes",
      },
      socialProof: "Fotografia editorial con atencion personalizada para cada pareja.",
      benefits: [
        { title: "Cobertura completa", description: "Desde preparativos hasta el cierre de la fiesta." },
        { title: "Edicion profesional", description: "Cada imagen se trabaja con estilo editorial." },
        { title: "Entrega rapida", description: "Galeria completa en 3 a 4 semanas." },
        { title: "Galeria digital", description: "Descarga en alta resolucion para toda la familia." },
      ],
      urgency: {
        headline: "Las fechas se reservan por orden de llegada",
        description: "Cada mes aceptamos cupo limitado para mantener calidad y seguimiento cercano.",
        cta: "Agenda una consulta sin costo",
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
        headline: "Retratos que capturan tu esencia",
        subheadline: "Sesiones profesionales con direccion y estilo editorial",
        cta: "Cotizar retrato",
      },
      socialProof: "Direccion clara para que te veas natural y autentico frente a camara.",
      benefits: [
        { title: "Direccion durante sesion", description: "Te guio en poses para resultados naturales." },
        { title: "Edicion cuidada", description: "Retoque limpio manteniendo textura y expresion real." },
        { title: "Sesion flexible", description: "Interior o exterior segun el estilo que buscas." },
        { title: "Entrega digital", description: "Galeria lista para redes, CV y uso profesional." },
      ],
      urgency: {
        headline: "Agenda en la semana que mejor te funcione",
        description: "Los espacios por tarde y fin de semana se agotan primero.",
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
        headline: "Sesiones de pareja con historia real",
        subheadline: "Momentos autenticos para guardar toda la vida",
        cta: "Ver opciones",
      },
      socialProof: "Sesiones guiadas para conectar y disfrutar sin poses forzadas.",
      benefits: [
        { title: "Direccion natural", description: "Indicaciones simples para expresiones reales." },
        { title: "Locaciones recomendadas", description: "Te propongo spots con mejor luz y fondo." },
        { title: "Flujo agil", description: "Sesion dinamica para aprovechar cada minuto." },
        { title: "Galeria lista para compartir", description: "Entrega optimizada para impresion y redes." },
      ],
      urgency: {
        headline: "Aprovecha temporada de luz ideal",
        description: "Primavera y otono se reservan con mayor anticipacion.",
        cta: "Separar fecha",
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
        headline: "Maternidad con estilo y sensibilidad",
        subheadline: "Sesion comoda y guiada para esta etapa unica",
        cta: "Cotizar maternidad",
      },
      socialProof: "Ambiente tranquilo, direccion amable y resultado elegante.",
      benefits: [
        { title: "Direccion cuidadosa", description: "Poses favorecedoras y comodas durante la sesion." },
        { title: "Ritmo tranquilo", description: "Tiempo para pausas y cambios sin prisa." },
        { title: "Enfoque editorial", description: "Imagenes limpias y emotivas para conservar." },
        { title: "Opciones de locacion", description: "Estudio, casa o exterior segun tu preferencia." },
      ],
      urgency: {
        headline: "Ideal entre semana 28 y 34",
        description: "Recomendamos reservar con anticipacion para elegir fecha ideal.",
        cta: "Agendar asesoria",
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
        headline: "Fotografia comercial para tu marca",
        subheadline: "Contenido profesional para vender mejor en digital",
        cta: "Solicitar propuesta",
      },
      socialProof: "Produccion visual enfocada en conversion y consistencia de marca.",
      benefits: [
        { title: "Enfoque comercial", description: "Imagenes pensadas para redes, web y pauta." },
        { title: "Planeacion previa", description: "Brief, objetivos y shot list alineados." },
        { title: "Entrega util", description: "Archivos optimizados por canal y uso." },
        { title: "Consistencia", description: "Look visual uniforme para toda tu marca." },
      ],
      urgency: {
        headline: "Agenda produccion antes de tu siguiente campaña",
        description: "Los lanzamientos funcionan mejor con contenido listo con tiempo.",
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
        headline: "Fotografia editorial de alto impacto",
        subheadline: "Direccion creativa para imagenes con identidad",
        cta: "Ver disponibilidad",
      },
      socialProof: "Producciones con estilo artistico y ejecucion profesional.",
      benefits: [
        { title: "Direccion creativa", description: "Desarrollo visual alineado a concepto." },
        { title: "Narrativa visual", description: "Secuencias de imagen coherentes y memorables." },
        { title: "Control tecnico", description: "Luz, color y composicion con precision." },
        { title: "Entrega para publicacion", description: "Formatos listos para medios y portafolio." },
      ],
      urgency: {
        headline: "Reserva fecha para preproduccion",
        description: "Este tipo de proyecto requiere planeacion de locacion y estilo.",
        cta: "Iniciar proyecto",
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
