import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutTargetAudienceSection } from './about-target-audience-section'

describe('AboutTargetAudienceSection', () => {
  it('renders target donatur and penerima headings', () => {
    render(<AboutTargetAudienceSection />)
    expect(
      screen.getByRole('heading', { name: /Target Donatur/i }),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: /Target Penerima/i }),
    ).toBeTruthy()
  })

  it('renders audience items', () => {
    render(<AboutTargetAudienceSection />)
    expect(screen.getByText('Industri Makanan')).toBeTruthy()
    expect(screen.getByText('Panti Asuhan')).toBeTruthy()
  })
})
