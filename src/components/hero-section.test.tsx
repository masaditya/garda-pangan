import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { HeroSection } from './hero-section'

describe('HeroSection', () => {
  test('renders the figma hero copy in a full-bleed viewport hero', () => {
    const { container } = render(<HeroSection />)

    const heading = screen.getByRole('heading', {
      name: /one stop food loss & waste solution/i,
    })
    const hero = screen.getByRole('banner')

    expect(heading).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /pelajari selengkapnya/i }),
    ).toBeTruthy()
    expect(
      screen.queryByText(/bersama kurangi food loss dan waste di indonesia/i),
    ).toBeNull()
    expect(
      screen.queryByText(
        /garda pangan menghubungkan donatur, mitra, penerima, dan relawan/i,
      ),
    ).toBeNull()
    expect(hero.className).toContain('min-h-screen')
    expect(hero.className).not.toContain('rounded-[')
    expect(screen.getByTestId('hero-content').className).toContain(
      'items-center',
    )
    expect(container.querySelector('.hero-section')).toBeNull()
  })
})
