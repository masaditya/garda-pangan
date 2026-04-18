import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutVisionMissionSection } from './about-vision-mission-section'

describe('AboutVisionMissionSection', () => {
  it('renders Visi and Misi headings', () => {
    render(<AboutVisionMissionSection />)
    expect(screen.getByRole('heading', { name: /^Visi$/i })).toBeTruthy()
    expect(screen.getByRole('heading', { name: /^Misi$/i })).toBeTruthy()
  })

  it('renders vision and mission text', () => {
    render(<AboutVisionMissionSection />)
    expect(screen.getByText(/Mewujudkan Indonesia Bebas Lapar/i)).toBeTruthy()
    expect(screen.getByText(/Menyelamatkan potensi makanan/i)).toBeTruthy()
  })
})
