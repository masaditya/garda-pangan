import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MerchandiseHeroSection } from './merchandise-hero-section'

describe('MerchandiseHeroSection', () => {
  it('renders the heading and description', () => {
    render(<MerchandiseHeroSection />)
    expect(screen.getByRole('heading', { name: /Merchandise/i })).toBeTruthy()
    expect(screen.getByText(/gaya hidup bebas sampah/i)).toBeTruthy()
  })
})
