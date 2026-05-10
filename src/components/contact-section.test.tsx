import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ContactSection } from './contact-section'

describe('ContactSection', () => {
  it('should render the hero section with correct title', () => {
    render(<ContactSection />)
    expect(screen.getAllByText(/Hubungi/i)).toBeDefined()
    expect(screen.getAllByText(/Kami/i)).toBeDefined()
  })

  it('should render multiple contact category cards', () => {
    render(<ContactSection />)
    // Check for some titles from the dummy data
    expect(screen.getAllByText(/DONASI DANA/i)).toBeDefined()
    expect(screen.getAllByText(/KUNJUNGAN/i)).toBeDefined()
    expect(screen.getAllByText(/KOLABORASI CSR/i)).toBeDefined()
  })

  it('should render "Hubungi Kami" buttons on cards', () => {
    render(<ContactSection />)
    const buttons = screen.getAllByText('Hubungi Kami')
    // There are 11 categories in dummy data + 1 in hero description might match
    expect(buttons.length).toBeGreaterThanOrEqual(11)
  })
})
