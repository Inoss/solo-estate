import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ka', type: 'text', title: 'Georgian', rows: 3 },
        { name: 'ru', type: 'text', title: 'Russian', rows: 3 },
        { name: 'he', type: 'text', title: 'Hebrew', rows: 3 },
        { name: 'az', type: 'text', title: 'Azerbaijani', rows: 3 },
        { name: 'hy', type: 'text', title: 'Armenian', rows: 3 },
        { name: 'uk', type: 'text', title: 'Ukrainian', rows: 3 },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp' },
        { name: 'address', type: 'text', title: 'Address', rows: 3 },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
      ],
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
        },
      ],
    }),
    defineField({
      name: 'partnerLogos',
      title: 'Partner/Press Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            { name: 'name', type: 'string', title: 'Partner Name' },
            { name: 'link', type: 'url', title: 'Website URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'headerCTA',
      title: 'Header Call-to-Action',
      type: 'object',
      fields: [
        { name: 'text', type: 'object', title: 'CTA Text', fields: [
          { name: 'en', type: 'string', title: 'English' },
          { name: 'ka', type: 'string', title: 'Georgian' },
          { name: 'ru', type: 'string', title: 'Russian' },
          { name: 'he', type: 'string', title: 'Hebrew' },
          { name: 'az', type: 'string', title: 'Azerbaijani' },
          { name: 'hy', type: 'string', title: 'Armenian' },
          { name: 'uk', type: 'string', title: 'Ukrainian' },
        ]},
        { name: 'link', type: 'string', title: 'Link/URL' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description', rows: 3 },
        { name: 'ogImage', type: 'image', title: 'Default Open Graph Image' },
        { name: 'favicon', type: 'image', title: 'Favicon' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Settings',
      }
    },
  },
})
