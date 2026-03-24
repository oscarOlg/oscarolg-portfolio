export interface WhatsAppSequenceMessage {
  id: string;
  day: number;
  goal: string;
  textEs: string;
  textEn: string;
}

export interface WhatsAppResponsePlaybookEntry {
  key: string;
  labelEs: string;
  labelEn: string;
  responseEs: string;
  responseEn: string;
}

export const whatsappNurtureSequence: WhatsAppSequenceMessage[] = [
  {
    id: "day_0_delivery",
    day: 0,
    goal: "Deliver lead magnet and set expectations",
    textEs:
      "Hola {{name}}. Gracias por tu interes. Aqui esta tu Guia de Fotografia de Bodas: {{guide_link}}. Si quieres, te comparto tambien checklist y plantilla de timeline. En estos dias te envio tips practicos para planear tus fotos sin estres.",
    textEn:
      "Hi {{name}}. Thanks for your interest. Here is your Wedding Photography Guide: {{guide_link}}. I can also share a checklist and timeline template if you want. Over the next few days I will send practical tips to plan your photos with less stress.",
  },
  {
    id: "day_3_process",
    day: 3,
    goal: "Share process and build confidence",
    textEs:
      "Hola {{name}}, ya pudiste revisar la guia? Te comparto como trabajo una boda real: {{portfolio_link}}. La idea es que tengas claridad en tiempos, cobertura y resultados desde antes de reservar.",
    textEn:
      "Hi {{name}}, were you able to review the guide? Here is how I cover a real wedding: {{portfolio_link}}. My goal is to give you clear expectations around timeline, coverage, and final delivery before you book.",
  },
  {
    id: "day_6_pricing",
    day: 6,
    goal: "Address pricing objections with transparency",
    textEs:
      "Hola {{name}}, te comparto transparencia total sobre inversion: los paquetes incluyen cobertura, edicion profesional y entrega final en galeria digital. Si me dices tu fecha y tipo de boda te recomiendo el paquete con mejor relacion valor-precio.",
    textEn:
      "Hi {{name}}, here is full pricing transparency: packages include coverage, professional editing, and final gallery delivery. If you share your date and wedding type, I can recommend the best value option for you.",
  },
  {
    id: "day_8_social_proof",
    day: 8,
    goal: "Reinforce trust with social proof",
    textEs:
      "Hola {{name}}, te comparto opiniones reales de clientes recientes: {{testimonials_link}}. Si quieres, te envio una seleccion de galerias similares a lo que estas buscando.",
    textEn:
      "Hi {{name}}, here are real reviews from recent clients: {{testimonials_link}}. If you want, I can send a curated set of galleries similar to what you are looking for.",
  },
  {
    id: "day_10_consultation",
    day: 10,
    goal: "Invite to low-friction consultation",
    textEs:
      "Hola {{name}}, si te sirve, podemos hacer una mini consulta de 15 minutos por llamada o WhatsApp para revisar disponibilidad y resolver dudas. Sin presion. Solo para ayudarte a decidir con seguridad.",
    textEn:
      "Hi {{name}}, if it helps, we can do a 15-minute mini consultation by call or WhatsApp to review availability and answer questions. No pressure, just clarity so you can decide confidently.",
  },
];

export const whatsappResponsePlaybook: WhatsAppResponsePlaybookEntry[] = [
  {
    key: "price",
    labelEs: "Objecion de precio",
    labelEn: "Price objection",
    responseEs:
      "Entiendo perfecto. Si quieres, te comparto dos opciones con diferente inversion para que compares cobertura y valor sin comprometer la calidad.",
    responseEn:
      "Totally understandable. I can share two options at different price points so you can compare coverage and value without sacrificing quality.",
  },
  {
    key: "availability",
    labelEs: "Duda de disponibilidad",
    labelEn: "Availability question",
    responseEs:
      "Para confirmarte disponibilidad exacta necesito fecha, horario aproximado y ciudad. Con eso te confirmo hoy mismo.",
    responseEn:
      "To confirm exact availability, I only need your date, approximate schedule, and city. I can confirm today.",
  },
  {
    key: "delivery",
    labelEs: "Tiempo de entrega",
    labelEn: "Delivery timeline",
    responseEs:
      "Entrego adelantos en pocos dias y la galeria final en el tiempo acordado por contrato. Todo se comparte en alta calidad y con respaldo.",
    responseEn:
      "I deliver sneak peeks in a few days and the full gallery within the contracted timeline. Everything is shared in high quality with backup.",
  },
  {
    key: "style",
    labelEs: "Estilo fotografico",
    labelEn: "Photography style",
    responseEs:
      "Mi estilo es editorial natural: direccion clara cuando hace falta y momentos espontaneos cuando toca. Busco que se vean autenticos, no posados todo el tiempo.",
    responseEn:
      "My style is natural editorial: clear direction when needed and candid moments when it matters. The goal is authentic images, not constant posing.",
  },
];
