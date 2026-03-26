/**
 * Contact Configuration (Modular & Seasonal)
 * Centralized WhatsApp messaging with easy seasonal service swapping
 * 
 * This is the single source of truth for contact information.
 * Services can be easily enabled/disabled for seasonal campaigns.
 */

// ==================== SERVICE LIBRARY ====================
// All possible services (don't modify this, use FEATURED_SERVICES to control what shows)
export const SERVICE_LIBRARY = {
  portraits: {
    icon: '📸',
    label: 'Sesión de Retratos',
    labelEn: 'Portrait Session',
    message: 'Hola Oscar, me interesa agendar una sesión de retratos. ¿Cuál sería el próximo disponible?',
    messageEn: 'Hi Oscar, I\'m interested in booking a portrait session. What\'s your next availability?',
    category: 'core',
  },
  weddings: {
    icon: '💍',
    label: 'Consulta sobre Bodas',
    labelEn: 'Wedding Inquiry',
    message: 'Hola Oscar, estoy planeando mi boda y me gustaría conocer más sobre tus paquetes y disponibilidad.',
    messageEn: 'Hi Oscar, I\'m planning my wedding and would like to learn more about your packages and availability.',
    category: 'core',
  },
  graduation: {
    icon: '🎓',
    label: 'Sesión de Graduación',
    labelEn: 'Graduation Session',
    message: 'Hola Oscar, busco fotos de graduación. ¿Qué opciones tienes?',
    messageEn: 'Hi Oscar, I\'m looking for graduation photos. What options do you have?',
    category: 'seasonal',
    season: 'graduation',
  },
  xvyears: {
    icon: '👑',
    label: 'Sesión de XV Años',
    labelEn: 'XV Years Session',
    message: 'Hola Oscar, busco fotos de mis XV años. ¿Qué paquetes tienes?',
    messageEn: 'Hi Oscar, I\'m looking for XV years photos. What packages do you offer?',
    category: 'seasonal',
    season: 'xvyears',
  },
  couples: {
    icon: '👫',
    label: 'Sesión de Pareja',
    labelEn: 'Couple Session',
    message: 'Hola Oscar, nos gustaría agendar una sesión de fotos de pareja. ¿Cuál es tu disponibilidad?',
    messageEn: 'Hi Oscar, we\'d like to book a couple photo session. What\'s your availability?',
    category: 'nested',
  },
  maternity: {
    icon: '🤰',
    label: 'Sesión de Maternidad',
    labelEn: 'Maternity Session',
    message: 'Hola Oscar, estoy embarazada y me gustaría hacer una sesión de maternidad. ¿Qué opciones tienes?',
    messageEn: 'Hi Oscar, I\'m expecting and would like to do a maternity session. What options do you have?',
    category: 'nested',
  },
  familyholiday: {
    icon: '🎄',
    label: 'Sesión Familiar Navidad',
    labelEn: 'Family Holiday Session',
    message: 'Hola Oscar, buscamos fotos familiares para Navidad. ¿Cuál es tu disponibilidad?',
    messageEn: 'Hi Oscar, we\'d like family holiday photos. What\'s your availability?',
    category: 'seasonal',
    season: 'holiday',
  },
  consultation: {
    icon: '💬',
    label: 'Consulta General',
    labelEn: 'General Inquiry',
    message: 'Hola Oscar, me gustaría consultar sobre tus servicios.',
    messageEn: 'Hi Oscar, I\'d like to inquire about your services.',
    category: 'fallback',
  },
} as const;

// ==================== FEATURED SERVICES (Easy to swap for seasons) ====================
// Change this array to control which services show on contact page
// Format: ['portraits', 'weddings', 'graduation'] for graduation season
// Or: ['portraits', 'weddings', 'familyholiday'] for holiday season
export const FEATURED_SERVICES = ['portraits', 'weddings', 'graduation'] as Array<keyof typeof SERVICE_LIBRARY>;

// ==================== CONTACT CONFIG ====================
export const CONTACT_CONFIG = {
  // WhatsApp Configuration
  whatsapp: {
    number: '+526562932374',
    baseUrl: 'https://wa.me/',
    format: 'whatsapp://send?phone=', // For mobile direct app launch
    responseTime: '2 horas', // Promise message
    timezone: 'America/Mexico_City',
  },

  // Contact methods (update email here as needed)
  contact: {
    email: 'oscar.olg.photo@gmail.com',
    phone: '+52 656 293 2374',
    hoursEs: 'Lunes - Viernes: 9am - 7pm',
    hoursEn: 'Monday - Friday: 9am - 7pm',
  },

  // Copy/messaging constants
  messaging: {
    responsePromise: {
      es: '📱 Te responderé en WhatsApp en máximo 2 horas',
      en: '📱 I\'ll respond on WhatsApp within 2 hours',
    },
    preferred: {
      es: '✨ Una consulta gratis en WhatsApp',
      en: '✨ Free consultation on WhatsApp',
    },
    availability: {
      es: '✅ Próximos disponibles',
      en: '✅ Next availability',
    },
  },
};

/**
 * Helper function to generate WhatsApp link
 * @param serviceKey - Service type from SERVICE_LIBRARY
 * @param lang - Language (es/en)
 * @returns Full WhatsApp URL
 */
export function getWhatsAppLink(
  serviceKey: keyof typeof SERVICE_LIBRARY,
  lang: 'es' | 'en' = 'es'
): string {
  const service = SERVICE_LIBRARY[serviceKey];
  const message = lang === 'es' ? service.message : service.messageEn;
  const encodedMessage = encodeURIComponent(message);
  const number = CONTACT_CONFIG.whatsapp.number.replace(/\D/g, ''); // Remove non-digits
  
  // Web link (works on desktop)
  return `${CONTACT_CONFIG.whatsapp.baseUrl}${number}?text=${encodedMessage}`;
}

/**
 * Helper function to get WhatsApp mobile app deeplink
 * @param serviceKey - Service type
 * @returns Mobile WhatsApp deeplink
 */
export function getWhatsAppMobileLink(
  serviceKey: keyof typeof SERVICE_LIBRARY
): string {
  const service = SERVICE_LIBRARY[serviceKey];
  const encodedMessage = encodeURIComponent(service.message);
  const number = CONTACT_CONFIG.whatsapp.number.replace(/\D/g, '');
  
  // Mobile deeplink
  return `${CONTACT_CONFIG.whatsapp.format}${number}&text=${encodedMessage}`;
}

/**
 * Get service label
 * @param serviceKey - Service type
 * @param lang - Language
 * @returns Human-readable label
 */
export function getServiceLabel(
  serviceKey: keyof typeof SERVICE_LIBRARY,
  lang: 'es' | 'en' = 'es'
): string {
  const service = SERVICE_LIBRARY[serviceKey];
  return lang === 'es' ? service.label : service.labelEn;
}

/**
 * Get service icon
 * @param serviceKey - Service type
 * @returns Icon emoji
 */
export function getServiceIcon(serviceKey: keyof typeof SERVICE_LIBRARY): string {
  return SERVICE_LIBRARY[serviceKey].icon;
}

/**
 * Get featured services (what's currently active)
 * @returns Array of currently featured service keys
 */
export function getFeaturedServices() {
  return FEATURED_SERVICES;
}

/**
 * Get all featured service objects with full data
 * @param lang - Language
 * @returns Array of full service objects
 */
export function getFeaturedServicesData(lang: 'es' | 'en' = 'es') {
  return FEATURED_SERVICES.map(key => ({
    key,
    ...SERVICE_LIBRARY[key],
    label: lang === 'es' ? SERVICE_LIBRARY[key].label : SERVICE_LIBRARY[key].labelEn,
  }));
}

/**
 * Update featured services (for seasonal campaigns)
 * Usage: updateFeaturedServices(['portraits', 'weddings', 'familyholiday'])
 * @param serviceKeys - Array of service keys to feature
 */
export function updateFeaturedServices(serviceKeys: Array<keyof typeof SERVICE_LIBRARY>) {
  // This is a helper showing the pattern - actual implementation would
  // require updating FEATURED_SERVICES directly in this file
  console.log('To update seasonal services, change FEATURED_SERVICES array at top of contact.ts');
  console.log('Example: FEATURED_SERVICES = ["portraits", "weddings", "familyholiday"]');
}

