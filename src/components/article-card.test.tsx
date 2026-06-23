import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ArticleCard } from './article-card'

describe('ArticleCard', () => {
  test('renders article link, metadata, and cover image', () => {
    render(
      <ArticleCard
        article={{
          id: 1,
          documentId: 'article-doc',
          title: 'Food Rescue 101',
          description: 'A short guide',
          slug: 'food-rescue-101',
          isFeatured: true,
          cover: {
            id: 1,
            documentId: 'media-doc',
            name: 'cover.jpg',
            alternativeText: 'Food rescue volunteers',
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
          category: {
            id: 1,
            documentId: 'category-doc',
            name: 'Knowledge',
            slug: 'knowledge',
            createdAt: '',
            updatedAt: '',
            publishedAt: '',
          },
          createdAt: '',
          updatedAt: '',
          publishedAt: '2026-04-28T08:00:00.000Z',
        }}
      />,
    )

    expect(
      screen
        .getByRole('link', { name: /food rescue 101/i })
        .getAttribute('href'),
    ).toBe('/id/artikel/food-rescue-101')
    expect(screen.getByText('Knowledge')).toBeTruthy()
    expect(
      screen.getByRole('img', { name: /food rescue volunteers/i }),
    ).toBeTruthy()
  })
})
