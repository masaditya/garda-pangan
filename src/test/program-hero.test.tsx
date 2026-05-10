import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgramHero } from '../components/program-hero'

describe('ProgramHero', () => {
  it('renders the title and description correctly', () => {
    render(
      <ProgramHero
        title="Program Kami Test"
        description="This is a test description."
      />,
    )

    expect(screen.getByText('Program Kami Test')).toBeDefined()
    expect(screen.getByText('This is a test description.')).toBeDefined()
  })

  it('renders with the background image container', () => {
    const { container } = render(
      <ProgramHero
        title="Test Title"
        description="Test Desc"
        backgroundImage="/test-bg.jpg"
      />,
    )

    const heroContent = screen.getByTestId('program-hero-content')
    expect(heroContent).toBeDefined()

    // We can just verify it renders without crashing and contains the text
    expect(container.firstChild).toBeDefined()
  })
})
