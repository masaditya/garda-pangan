import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { AgentChangeSection } from './agent-change-section'

describe('AgentChangeSection', () => {
  test('renders the intro, action cards, and reusable grid layout', () => {
    const { container } = render(<AgentChangeSection />)

    expect(
      screen.getByRole('heading', { name: /ayo jadi agen perubahan/i }),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: /donasi makanan/i, level: 3 }),
    ).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /mulai/i }).length).toBe(4)
    expect(screen.queryByText(/food rescue/i)).toBeNull()
    expect(screen.getByTestId('agent-change-grid').className).toContain('grid')
    expect(screen.getByTestId('agent-change-grid').className).toContain(
      'lg:grid-cols-4',
    )
    expect(container.querySelector('.agent-change-section')).toBeNull()
  })
})
