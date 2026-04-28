import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ArticleBlockRenderer } from './article-block-renderer'

describe('ArticleBlockRenderer', () => {
  test('renders rich text, quote, media, and slider blocks', () => {
    render(
      <ArticleBlockRenderer
        blocks={[
          {
            id: 1,
            __component: 'shared.rich-text',
            body: '<p>Food rescue story</p>',
          },
          {
            id: 2,
            __component: 'shared.quote',
            title: 'Volunteer',
            body: 'Every portion matters.',
          },
          {
            id: 3,
            __component: 'shared.media',
            file: {
              id: 1,
              documentId: 'media-doc',
              name: 'cover.jpg',
              alternativeText: 'Food rescue team',
              caption: null,
              width: 1200,
              height: 800,
              hash: 'cover',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 100,
              url: '/uploads/cover.jpg',
              provider: 'local',
              createdAt: '',
              updatedAt: '',
              publishedAt: '',
            },
          },
          {
            id: 4,
            __component: 'shared.slider',
            files: [
              {
                id: 2,
                documentId: 'slide-doc',
                name: 'slide.jpg',
                alternativeText: 'Donation pickup',
                caption: null,
                width: 1200,
                height: 800,
                hash: 'slide',
                ext: '.jpg',
                mime: 'image/jpeg',
                size: 100,
                url: '/uploads/slide.jpg',
                provider: 'local',
                createdAt: '',
                updatedAt: '',
                publishedAt: '',
              },
            ],
          },
        ]}
      />,
    )

    expect(screen.getByText('Food rescue story')).toBeTruthy()
    expect(screen.getByText('Every portion matters.')).toBeTruthy()
    expect(screen.getByRole('img', { name: /food rescue team/i })).toBeTruthy()
    expect(screen.getByRole('img', { name: /donation pickup/i })).toBeTruthy()
  })
})
