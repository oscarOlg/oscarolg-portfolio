import {defineField, defineType} from 'sanity'
import { getSanityCategoryOptions } from '../../src/config/services'

export const servicePackageType = defineType({
  name: 'servicePackage',
  title: 'Paquete de Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Paquete',
      type: 'string',
      description: 'Ej.: "Esencial", "Clásico", "Premium", "Retrato Corporativo"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría del Servicio',
      type: 'string',
      options: {
        list: getSanityCategoryOptions(),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Nivel del Paquete',
      type: 'string',
      options: {
        list: [
          {title: 'Esencial', value: 'essential'},
          {title: 'Premium', value: 'premium'},
          {title: 'Deluxe', value: 'deluxe'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'price',
      title: 'Precio (MXN)',
      type: 'number',
      description: 'Precio en pesos mexicanos. Para colaboraciones TFP usar 0.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'showPrice',
      title: 'Mostrar Precio en la Página de Servicios',
      type: 'boolean',
      description: 'Desactivar para ocultar el precio en la página (ej. tarifas editoriales negociables)',
      initialValue: true,
    }),
    defineField({
      name: 'pricePrefix',
      title: 'Prefijo del Precio (opcional)',
      type: 'string',
      description: 'Texto que aparece antes del precio. Ej.: "A partir de"',
    }),
    defineField({
      name: 'description',
      title: 'Subtítulo / Descripción Corta',
      type: 'string',
      description: 'Texto que aparece debajo del nombre del paquete. Ej.: "Cobertura de 6 horas", "Sesión Express"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Características / Incluye (Puntos de viñeta)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Dejar vacío si se usa el campo "Texto en Párrafo" en su lugar.',
    }),
    defineField({
      name: 'bodyText',
      title: 'Texto en Párrafo (formato narrativo)',
      type: 'text',
      rows: 4,
      description: 'Usar en lugar de viñetas para tarjetas editoriales o TFP. Separa dos párrafos con una línea en blanco — el segundo párrafo se muestra en cursiva.',
    }),
    defineField({
      name: 'popular',
      title: 'Paquete Destacado / Popular',
      type: 'boolean',
      description: 'Activa el borde y la insignia de destacado en esta tarjeta',
      initialValue: false,
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Texto de la Insignia',
      type: 'string',
      description: 'Texto dentro de la insignia de destacado. Si se deja vacío, muestra "Más Popular".',
      placeholder: 'Más Popular',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Botón CTA (por paquete)',
      type: 'string',
      description: 'Reemplaza el CTA del servicio para este paquete en específico. Dejar vacío para usar el valor por defecto del servicio.',
    }),
    defineField({
      name: 'ctaVariant',
      title: 'Estilo del Botón CTA',
      type: 'string',
      options: {
        list: [
          {title: 'Relleno (por defecto)', value: 'filled'},
          {title: 'Contorno (solo borde)', value: 'outline'},
        ],
        layout: 'radio',
      },
      initialValue: 'filled',
    }),
    defineField({
      name: 'addOns',
      title: 'Complementos (para el Formulario de Contacto)',
      type: 'array',
      description: 'Usados en el formulario de contacto para el cálculo de precios. No se muestran en la sección "Complementos" de la página de servicios.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Nombre del Complemento'},
            {name: 'price', type: 'number', title: 'Precio Adicional (MXN)'},
            {name: 'unit', type: 'string', title: 'Unidad (opcional)', description: 'Ej.: "por hora", "c.u."'},
            {name: 'description', type: 'string', title: 'Descripción (opcional)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'isSpecialVariant',
      title: 'Tarjeta de Variante Especial',
      type: 'boolean',
      description: 'Muestra este paquete como tarjeta destacada independiente (ej. Boda Civil/Íntima) fuera de la cuadrícula principal',
      initialValue: false,
    }),
    defineField({
      name: 'variantType',
      title: 'Tipo de Variante',
      type: 'string',
      hidden: ({document}) => !document?.isSpecialVariant,
      options: {
        list: [
          {title: 'Boda Civil / Íntima', value: 'wedding_civil'},
          {title: 'Editorial TFP', value: 'editorial_tfp'},
          {title: 'Otro', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duración de la Sesión (horas)',
      type: 'number',
    }),
    defineField({
      name: 'deliverables',
      title: 'Entregables',
      type: 'string',
      description: 'Ej.: "50-60 fotos editadas por hora de cobertura"',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Número que determina el orden dentro de su categoría (1, 2, 3...)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      price: 'price',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.category} — $${selection.price?.toLocaleString('es-MX') ?? '?'} MXN`,
      }
    },
  },
})
