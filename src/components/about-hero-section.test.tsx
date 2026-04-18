import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutHeroSection } from './about-hero-section'

describe('AboutHeroSection', () => {
  it('renders the heading', () => {
    render(<AboutHeroSection />)
    const heading = screen.getByRole('heading', { name: /Tentang Kami/i })
    expect(heading).toBeTruthy()
  })

  it('renders the description text', () => {
    render(<AboutHeroSection />)
    expect(
      screen.getByText(/Garda Pangan adalah food bank/i),
    ).toBeTruthy()
  })
})
