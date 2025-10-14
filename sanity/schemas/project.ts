import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'object',
      description: 'Project name in all languages',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ka', type: 'string', title: 'Georgian (ქართული)' },
        { name: 'ru', type: 'string', title: 'Russian (Русский)' },
        { name: 'he', type: 'string', title: 'Hebrew (עברית)' },
        { name: 'az', type: 'string', title: 'Azerbaijani (Azərbaycan)' },
        { name: 'hy', type: 'string', title: 'Armenian (Հայերեն)' },
        { name: 'uk', type: 'string', title: 'Ukrainian (Українська)' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Off-Plan', value: 'offPlan' },
          { title: 'Under Construction', value: 'underConstruction' },
          { title: 'Ready', value: 'ready' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'Aparthotel', value: 'aparthotel' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Villa', value: 'villa' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'city', type: 'string', title: 'City' },
        { name: 'area', type: 'string', title: 'Area/District' },
        { name: 'address', type: 'string', title: 'Address' },
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        { name: 'price', type: 'number', title: 'Total Price (USD)', validation: (Rule) => Rule.required() },
        { name: 'pricePerSqm', type: 'number', title: 'Price per m² (USD)' },
        { name: 'currency', type: 'string', title: 'Currency', initialValue: 'USD' },
        { name: 'priceRange', type: 'object', title: 'Price Range (if applicable)', fields: [
          { name: 'min', type: 'number', title: 'Min Price' },
          { name: 'max', type: 'number', title: 'Max Price' },
        ]},
      ],
    }),
    defineField({
      name: 'investment',
      title: 'Investment Metrics',
      type: 'object',
      fields: [
        { name: 'yield', type: 'number', title: 'Projected Yield (%)', validation: (Rule) => Rule.min(0).max(30) },
        { name: 'capRate', type: 'number', title: 'Cap Rate (%)' },
        { name: 'irr', type: 'number', title: 'IRR (%)' },
        { name: 'monthlyRent', type: 'number', title: 'Est. Monthly Rent (USD)' },
        { name: 'occupancy', type: 'number', title: 'Occupancy Assumption (%)' },
        { name: 'managementFee', type: 'number', title: 'Management Fee (%)' },
      ],
    }),
    defineField({
      name: 'delivery',
      title: 'Delivery Date',
      type: 'object',
      fields: [
        { name: 'quarter', type: 'string', title: 'Quarter', options: { list: ['Q1', 'Q2', 'Q3', 'Q4'] } },
        { name: 'year', type: 'number', title: 'Year' },
      ],
    }),
    defineField({
      name: 'area',
      title: 'Area (m²)',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [{ type: 'file' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 5 },
        { name: 'ka', type: 'text', title: 'Georgian', rows: 5 },
        { name: 'ru', type: 'text', title: 'Russian', rows: 5 },
        { name: 'he', type: 'text', title: 'Hebrew', rows: 5 },
        { name: 'az', type: 'text', title: 'Azerbaijani', rows: 5 },
        { name: 'hy', type: 'text', title: 'Armenian', rows: 5 },
        { name: 'uk', type: 'text', title: 'Ukrainian', rows: 5 },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (Features/Benefits)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'documents',
      title: 'Documents (Brochures, Due Diligence)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Document Title' },
            { name: 'file', type: 'file', title: 'PDF File' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
        { name: 'ogImage', type: 'image', title: 'Open Graph Image' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'coverImage',
      status: 'status',
      price: 'pricing.price',
    },
    prepare(selection) {
      const { title, media, status, price } = selection
      return {
        title: title,
        subtitle: `${status} - $${price?.toLocaleString() || 'N/A'}`,
        media: media,
      }
    },
  },
})
