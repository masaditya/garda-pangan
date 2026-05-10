import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BeneficiarySection } from './beneficiary-section'

const dummyData = {
  heroTitle: 'Penerima Bantuan',
  heroDescription: 'Deskripsi dummy untuk testing.',
  testimonialButtonLabel: 'Tonton Testimoni',
  testimonialButtonLink: '#testimoni'
}

describe('BeneficiarySection', () => {
  it('should render the hero section with correct title', () => {
    render(<BeneficiarySection data={dummyData} />)
    expect(screen.getAllByText(/Penerima/i)).toBeDefined()
    expect(screen.getAllByText(/Bantuan/i)).toBeDefined()
  })

  it('should render the testimonial cards', () => {
    render(<BeneficiarySection data={dummyData} />)
    // Check for some names from the dummy data
    expect(screen.getAllByText('Siti Rahayu').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dewi Wahyuni').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bapak Ponimin').length).toBeGreaterThan(0)
  })

  it('should render the "Tonton Testimoni" button', () => {
    render(<BeneficiarySection data={dummyData} />)
    expect(screen.getByText('Tonton Testimoni')).toBeDefined()
  })
})
