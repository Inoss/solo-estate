import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Developer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'completedProjects',
      title: 'Number of Completed Projects',
      type: 'number',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, media, rating } = selection
      return {
        title: title,
        subtitle: rating ? `Rating: ${rating}/5` : 'No rating',
        media: media,
      }
    },
  },
})
