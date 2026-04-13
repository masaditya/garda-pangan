import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { FeaturedBySection } from './featured-by-section'

describe('FeaturedBySection', () => {
  test('renders the heading, logo set, and responsive grid shell', () => {
    const { container } = render(<FeaturedBySection />)

    const heading = screen.getByRole('heading', { name: /featured by/i })

    expect(heading).toBeTruthy()
    expect(heading.className).toContain('lg:text-[3.5rem]')
    expect(screen.getByText(/tempo\.co/i)).toBeTruthy()
    expect(screen.getByText(/cnn/i)).toBeTruthy()
    expect(screen.getByText(/forbes/i)).toBeTruthy()
    expect(
      screen.queryByText(/since 2021, we have partnered with these companies/i),
    ).toBeNull()
    expect(screen.getByTestId('featured-grid').className).toContain('grid')
    expect(screen.getByTestId('featured-grid').className).toContain('lg:grid-cols-5')
    expect(screen.getByTestId('featured-card-tempo').className).toContain('shadow-none')
    expect(screen.getByTestId('featured-card-tempo').className).toContain('rounded-[0.75rem]')
    expect(container.querySelector('.featured-section')).toBeNull()
  })
})
