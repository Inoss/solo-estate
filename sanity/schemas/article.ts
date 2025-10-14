import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article/Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ka', type: 'string', title: 'Georgian' },
        { name: 'ru', type: 'string', title: 'Russian' },
        { name: 'he', type: 'string', title: 'Hebrew' },
        { name: 'az', type: 'string', title: 'Azerbaijani' },
        { name: 'hy', type: 'string', title: 'Armenian' },
        { name: 'uk', type: 'string', title: 'Ukrainian' },
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
      name: 'excerpt',
      title: 'Excerpt',
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
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'block' }] },
        { name: 'ka', type: 'array', title: 'Georgian', of: [{ type: 'block' }] },
        { name: 'ru', type: 'array', title: 'Russian', of: [{ type: 'block' }] },
        { name: 'he', type: 'array', title: 'Hebrew', of: [{ type: 'block' }] },
        { name: 'az', type: 'array', title: 'Azerbaijani', of: [{ type: 'block' }] },
        { name: 'hy', type: 'array', title: 'Armenian', of: [{ type: 'block' }] },
        { name: 'uk', type: 'array', title: 'Ukrainian', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Market Report', value: 'market-report' },
          { title: 'Investment Guide', value: 'investment-guide' },
          { title: 'Company News', value: 'company-news' },
          { title: 'Legal & Tax', value: 'legal-tax' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'coverImage',
      category: 'category',
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title: title,
        subtitle: category || 'Uncategorized',
        media: media,
      }
    },
  },
})
