import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { GardaButton } from './garda-button'

describe('GardaButton', () => {
  test('renders the primary CTA treatment with arrow affordance', () => {
    render(
      <GardaButton href="/donasi" variant="primary">
        Dukung
      </GardaButton>,
    )

    const link = screen.getByRole('link', { name: /dukung/i })

    expect(link.getAttribute('href')).toBe('/donasi')
    expect(link.className).toContain('rounded-full')
    expect(link.className).not.toContain('garda-button')
    expect(screen.getByLabelText(/arrow icon/i)).toBeTruthy()
  })

  test('renders the hero CTA with locked white label styling', () => {
    render(
      <GardaButton href="/tentang-kami" variant="hero">
        Pelajari Selengkapnya
      </GardaButton>,
    )

    const link = screen.getByRole('link', { name: /pelajari selengkapnya/i })
    const label = screen.getByText(/pelajari selengkapnya/i)

    expect(link.className).toContain('text-white')
    expect(link.className).toContain('bg-garda-forest')
    expect(link.className).toContain('rounded-full')
    expect(label.className).toContain('text-white')
    expect(screen.getByLabelText(/arrow icon/i)).toBeTruthy()
  })

  test('renders the impact CTA variant for homepage action cards', () => {
    render(
      <GardaButton href="/relawan" variant="impact">
        MULAI
      </GardaButton>,
    )

    const link = screen.getByRole('link', { name: /mulai/i })
    const label = screen.getByText(/mulai/i)

    expect(link.className).toContain('bg-garda-forest')
    expect(link.className).toContain('text-garda-sun')
    expect(link.className).toContain('justify-between')
    expect(label.className).toContain('text-garda-sun')
    expect(screen.getByLabelText(/arrow icon/i)).toBeTruthy()
  })
})
