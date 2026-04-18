import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VolunteerHeroSection } from './volunteer-hero-section'

describe('VolunteerHeroSection', () => {
  it('renders the heading correctly', () => {
    render(<VolunteerHeroSection />)
    const heading = screen.getByRole('heading', { name: /Jadi Pahlawan Pangan Nyata/i })
    expect(heading).toBeTruthy()
  })

  it('renders the description text', () => {
    render(<VolunteerHeroSection />)
    expect(screen.getByText(/Dapatkan pengalaman berharga/i)).toBeTruthy()
  })

  it('renders the call to action button', () => {
    render(<VolunteerHeroSection />)
    expect(screen.getByRole('link', { name: /Daftar Sekarang/i })).toBeTruthy()
  })
})
