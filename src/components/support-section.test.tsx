import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SupportSection } from './support-section'

describe('SupportSection', () => {
  it('should render the hero section with correct title', () => {
    render(<SupportSection />)
    expect(screen.getAllByText(/Dukung/i)).toBeDefined()
    expect(screen.getAllByText(/Kami/i)).toBeDefined()
  })

  it('should render the midtrans embed placeholder', () => {
    render(<SupportSection />)
    expect(screen.getByText(/embed code dari midtrans/i)).toBeDefined()
  })

  it('should render the description', () => {
    render(<SupportSection />)
    expect(screen.getByText(/dana operasional/i)).toBeDefined()
  })
})
