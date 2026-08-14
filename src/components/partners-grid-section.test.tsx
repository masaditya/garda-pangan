import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { PartnersGridSection } from './partners-grid-section'

describe('PartnersGridSection', () => {
  test('renders the default marquee elements if no props are passed', () => {
    render(<PartnersGridSection />)

    const heading = screen.getByRole('heading', { name: /partners & supporters/i })
    expect(heading).toBeTruthy()

    // It should render three rows
    const row0 = screen.getByTestId('marquee-row-0')
    const row1 = screen.getByTestId('marquee-row-1')
    const row2 = screen.getByTestId('marquee-row-2')

    expect(row0).toBeTruthy()
    expect(row1).toBeTruthy()
    expect(row2).toBeTruthy()

    // The second row should have reversed animation direction
    const marquee0 = row0.querySelector('.animate-marquee')
    const marquee1 = row1.querySelector('.animate-marquee')
    const marquee2 = row2.querySelector('.animate-marquee')

    expect(marquee0).toBeTruthy()
    expect(marquee1).toBeTruthy()
    expect(marquee2).toBeTruthy()

    // Read the styles of the marquee elements
    expect((marquee0 as HTMLElement).style.animationDirection).not.toBe('reverse')
    expect((marquee1 as HTMLElement).style.animationDirection).toBe('reverse')
    expect((marquee2 as HTMLElement).style.animationDirection).not.toBe('reverse')
  })

  test('renders provided title, subtitle, and custom logos', () => {
    const mockPartners = [
      { id: 1, name: 'Custom Partner 1', logoSrc: '/custom-partner.png' },
    ]
    const mockSupporters = [
      { id: 1, title: 'Custom Supporter 1', image: { url: '/custom-supporter.png' } },
    ]

    render(
      <PartnersGridSection
        title="Custom Title"
        subtitle="Custom Subtitle"
        partners={mockPartners}
        supporters={mockSupporters}
      />
    )

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeTruthy()
    expect(screen.getByText(/custom subtitle/i)).toBeTruthy()

    // Verify it renders the custom partner/supporter items
    // Since they are repeated in the loop track, we check they exist
    const partners = screen.getAllByTitle('Custom Partner 1')
    const supporters = screen.getAllByTitle('Custom Supporter 1')

    expect(partners.length).toBeGreaterThan(0)
    expect(supporters.length).toBeGreaterThan(0)
  })
})
