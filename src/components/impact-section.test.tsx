import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ImpactSection } from './impact-section'

describe('ImpactSection', () => {
  test('renders the heading and all figma metrics', () => {
    const { container } = render(<ImpactSection />)

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
    expect(screen.getByAltText('Illustration of food care')).toBeTruthy()

    expect(screen.getByTestId('impact-panel').className).toContain(
      'max-w-[1376px]',
    )
    expect(screen.getByTestId('impact-panel').className).toContain(
      'rounded-[2rem]',
    )
    expect(screen.getByTestId('impact-stage').className).toContain(
      'lg:grid-cols-[406px_minmax(280px,1fr)_406px]',
    )
    expect(screen.getByTestId('impact-stage').className).toContain(
      'lg:grid-rows-[279px_279px]',
    )
    expect(screen.getByTestId('impact-card-top-left').className).toContain(
      'lg:h-[558px]',
    )
    expect(screen.getByTestId('impact-card-top-right').className).toContain(
      'lg:h-[598px]',
    )
    expect(screen.getByTestId('impact-card-bottom-left').className).toContain(
      'lg:h-[558px]',
    )
    expect(screen.getByTestId('impact-card-bottom-right').className).toContain(
      'lg:h-[650px]',
    )
    expect(screen.getByTestId('impact-card-pattern')).toBeTruthy()
    expect(container.querySelector('.impact-section__panel')).toBeNull()
  })
})
