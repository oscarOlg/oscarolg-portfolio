import {defineField, defineType} from 'sanity'

export const serviceConfigType = defineType({
  name: 'serviceConfig',
  title: 'Configuración de Servicio',
  type: 'document',
  fields: [
    // ── Identidad ────────────────────────────────────────────────────────────
    defineField({
      name: 'serviceKey',
      title: 'Clave del Servicio',
      type: 'string',
      description: 'Debe coincidir con una clave en src/config/services.ts',
      options: {
        list: [
          {title: 'Bodas', value: 'weddings'},
          {title: 'Retratos', value: 'portrait'},
          {title: 'Parejas y Grupales', value: 'couples'},
          {title: 'Maternidad', value: 'maternity'},
          {title: 'Comercial', value: 'commercial'},
          {title: 'Editorial', value: 'editorial'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Nombre para Mostrar',
      type: 'string',
      description: 'Nombre del servicio tal como aparece en la página (ej. "Bodas", "Retratos")',
      validation: (Rule) => Rule.required(),
    }),

    // ── Introducción ─────────────────────────────────────────────────────────
    defineField({
      name: 'introText',
      title: 'Párrafo de Introducción (opcional)',
      type: 'text',
      rows: 3,
      description: 'Párrafo corto que aparece encima de la cuadrícula de paquetes. Dejar vacío para Bodas.',
    }),

    // ── Diseño ───────────────────────────────────────────────────────────────
    defineField({
      name: 'gridColumns',
      title: 'Columnas en la Cuadrícula de Paquetes',
      type: 'number',
      options: {
        list: [
          {title: '2 Columnas', value: 2},
          {title: '3 Columnas', value: 3},
        ],
        layout: 'radio',
      },
      initialValue: 3,
    }),

    // ── Complementos ─────────────────────────────────────────────────────────
    defineField({
      name: 'hasAddOns',
      title: 'Mostrar Sección de Complementos',
      type: 'boolean',
      description: 'Muestra la tabla de complementos debajo de la cuadrícula de paquetes',
      initialValue: true,
    }),
    defineField({
      name: 'complementos',
      title: 'Complementos (página de servicios)',
      type: 'array',
      description: 'Elementos listados en la sección "Complementos" en la página de servicios. Independientes de los add-ons usados en el formulario de contacto.',
      of: [
        {
          type: 'object',
          name: 'complemento',
          title: 'Complemento',
          fields: [
            {name: 'name', type: 'string', title: 'Nombre'},
            {name: 'price', type: 'number', title: 'Precio (MXN)'},
            {name: 'unit', type: 'string', title: 'Unidad (opcional)', description: 'Ej.: "hr", "c.u."'},
            {name: 'note', type: 'string', title: 'Nota (opcional)', description: 'Ej.: "Incluida en el paquete Premium"'},
          ],
        },
      ],
    }),

    // ── Tarjeta Informativa ───────────────────────────────────────────────────
    defineField({
      name: 'infoCardVariant',
      title: 'Tipo de Tarjeta Informativa',
      type: 'string',
      description: 'Controla cómo se muestra la tarjeta informativa. "Panel derecho" aparece junto a los complementos. "Centrada a ancho completo" aparece debajo de la cuadrícula.',
      options: {
        list: [
          {title: 'Ninguna', value: 'none'},
          {title: 'Panel derecho (junto a complementos)', value: 'right_panel'},
          {title: 'Centrada a ancho completo (debajo de la cuadrícula)', value: 'full_width_centered'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'infoCardHeading',
      title: 'Título de la Tarjeta Informativa',
      type: 'string',
      hidden: ({document}) => document?.infoCardVariant === 'none',
    }),
    defineField({
      name: 'infoCardContent',
      title: 'Contenido de la Tarjeta Informativa',
      type: 'text',
      rows: 3,
      hidden: ({document}) => document?.infoCardVariant === 'none',
    }),

    // ── Bloque Personalizado (ej. "Presupuestos a la Medida") ────────────────
    defineField({
      name: 'customBlockHeading',
      title: 'Título del Bloque Personalizado (opcional)',
      type: 'string',
      description: 'Usado para bloques destacados como "Presupuestos a la Medida" en el servicio Comercial',
    }),
    defineField({
      name: 'customBlockContent',
      title: 'Contenido del Bloque Personalizado (opcional)',
      type: 'text',
      rows: 4,
    }),

    // ── Beneficios Globales ───────────────────────────────────────────────────
    defineField({
      name: 'hasGlobalBenefits',
      title: 'Mostrar Sección de Beneficios Globales',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'globalBenefitsHeading',
      title: 'Título de Beneficios Globales',
      type: 'string',
      initialValue: 'Inclusiones en todos los paquetes',
      hidden: ({document}) => !document?.hasGlobalBenefits,
    }),
    defineField({
      name: 'globalBenefitsText',
      title: 'Texto de Beneficios Globales',
      type: 'text',
      rows: 3,
      hidden: ({document}) => !document?.hasGlobalBenefits,
    }),

    // ── Proceso de Trabajo ────────────────────────────────────────────────────
    defineField({
      name: 'hasProcess',
      title: 'Mostrar Sección de Proceso de Trabajo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'processTitle',
      title: 'Título de la Sección de Proceso',
      type: 'string',
      hidden: ({document}) => !document?.hasProcess,
    }),
    defineField({
      name: 'processSteps',
      title: 'Pasos del Proceso',
      type: 'array',
      hidden: ({document}) => !document?.hasProcess,
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Paso',
          fields: [
            {name: 'number', type: 'number', title: 'Número de Paso'},
            {name: 'heading', type: 'string', title: 'Título'},
            {name: 'description', type: 'text', rows: 2, title: 'Descripción'},
          ],
        },
      ],
    }),

    // ── Botón CTA por Defecto ─────────────────────────────────────────────────
    defineField({
      name: 'ctaButtonText',
      title: 'Texto del Botón CTA por Defecto',
      type: 'string',
      description: 'Usado para paquetes que no tienen un texto de CTA propio. Ej.: "Reservar", "Cotizar"',
      initialValue: 'Reservar',
    }),
  ],

  preview: {
    select: {
      title: 'displayName',
      subtitle: 'serviceKey',
    },
  },
})
