import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VolunteerSection } from './volunteer-section'

describe('VolunteerSection', () => {
  it('should render the hero section with correct title', () => {
    render(<VolunteerSection />)
    expect(screen.getAllByText(/Pahlawan/i)).toBeDefined()
    expect(screen.getAllByText(/Pangan/i)).toBeDefined()
  })

  it('should render the "Daftar Sekarang" button', () => {
    render(<VolunteerSection />)
    expect(screen.getByText('Daftar Sekarang')).toBeDefined()
  })

  it('should render the description', () => {
    render(<VolunteerSection />)
    expect(screen.getByText(/Food Heroes/i)).toBeDefined()
  })
})
