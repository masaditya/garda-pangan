import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PartnerCurrentSection } from './partner-current-section'

describe('PartnerCurrentSection', () => {
  it('renders Current Partner heading', () => {
    render(<PartnerCurrentSection />)
    expect(
      screen.getByRole('heading', { name: /Current Partner/i }),
    ).toBeTruthy()
  })

  it('renders partner items', () => {
    render(<PartnerCurrentSection />)
    expect(screen.getByText('Organic Market')).toBeTruthy()
    expect(screen.getByText('Catering')).toBeTruthy()
  })
})
