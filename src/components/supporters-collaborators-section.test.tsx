import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { SupportersCollaboratorsSection } from './supporters-collaborators-section'

describe('SupportersCollaboratorsSection', () => {
  test('renders the heading, supporting copy, and 16 supporter logo cards', () => {
    const { container } = render(<SupportersCollaboratorsSection />)

    const heading = screen.getByRole('heading', {
      name: /supporter & collaborators/i,
    })

    expect(heading).toBeTruthy()
    expect(
      screen.getByText(
        /since 2021, we have partnered with these companies to create impact for the future\. will your logo be next here\?/i,
      ),
    ).toBeTruthy()
    expect(screen.getAllByAltText(/badan pangan nasional/i)).toHaveLength(16)
    expect(screen.getByTestId('supporters-grid').className).toContain('grid')
    expect(screen.getByTestId('supporters-grid').className).toContain(
      'xl:[grid-template-columns:repeat(8,minmax(9.375rem,9.375rem))]',
    )
    expect(container.querySelector('.supporters-section')).toBeNull()
  })
})
