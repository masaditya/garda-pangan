import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PartnerHeroSection } from './partner-hero-section'

describe('PartnerHeroSection', () => {
  it('renders the heading', () => {
    render(<PartnerHeroSection />)
    const heading = screen.getByRole('heading', { name: /Jadi Mitra/i })
    expect(heading).toBeTruthy()
  })

  it('renders the glass cards', () => {
    const { container } = render(<PartnerHeroSection />)
    // Check if there are glass cards rendered (we will map 3 of them)
    const cards = container.querySelectorAll('.backdrop-blur-md')
    expect(cards.length).toBeGreaterThanOrEqual(3)
  })
})
