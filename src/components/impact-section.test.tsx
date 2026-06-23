import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ImpactSection } from './impact-section'

describe('ImpactSection', () => {
  test('renders the heading and all figma metrics', () => {
    render(<ImpactSection />)

    expect(screen.getByRole('heading', { name: /our impact/i })).toBeTruthy()
    expect(screen.getByText('608,311')).toBeTruthy()
    expect(screen.getByText(/portions of food rescued/i)).toBeTruthy()
    expect(screen.getByText('788,500')).toBeTruthy()
    expect(
      screen.getByText(/kg co2-ek greenhouse gas emission reduced/i),
    ).toBeTruthy()
    expect(screen.getByText('143')).toBeTruthy()
    expect(
      screen.getByText(/tons of potential food loses and waste rescued/i),
    ).toBeTruthy()
    expect(screen.getByText('272')).toBeTruthy()
    expect(
      screen.getByText(/toons of food scrap processed into animal feeds/i),
    ).toBeTruthy()

    expect(screen.getByTestId('impact-panel').className).toContain(
      'max-w-[1440px]',
    )
    expect(screen.getByTestId('impact-card-top-left')).toBeTruthy()
    expect(screen.getByTestId('impact-card-top-right')).toBeTruthy()
    expect(screen.getByTestId('impact-card-bottom-left')).toBeTruthy()
    expect(screen.getByTestId('impact-card-bottom-right')).toBeTruthy()
    expect(screen.getByTestId('impact-card-pattern')).toBeTruthy()
  })
})
