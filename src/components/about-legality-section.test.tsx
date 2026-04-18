import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutLegalitySection } from './about-legality-section'

describe('AboutLegalitySection', () => {
  it('renders legality heading and text', () => {
    render(<AboutLegalitySection />)
    expect(screen.getByRole('heading', { name: /Legalitas/i })).toBeTruthy()
    expect(screen.getByText(/Garda Pangan merupakan yayasan/i)).toBeTruthy()
  })
})
