import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutHistorySection } from './about-history-section'

describe('AboutHistorySection', () => {
  it('renders the section correctly', () => {
    render(<AboutHistorySection />)
    const heading = screen.getByRole('heading', { name: /Sejarah/i })
    expect(heading).toBeTruthy()

    expect(screen.getByText(/Berawal dari pengalaman/i)).toBeTruthy()
    expect(screen.getByText(/Eva Bachtiar/i)).toBeTruthy()
  })
})
