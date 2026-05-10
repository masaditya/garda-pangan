import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgramDetail } from '../components/program-detail'

describe('ProgramDetail', () => {
  it('renders title and description correctly', () => {
    render(
      <ProgramDetail
        title="Food Rescue"
        description="Penyelamatan makanan surplus."
      />,
    )

    expect(screen.getByText('Food Rescue')).toBeDefined()
    expect(screen.getByText('Penyelamatan makanan surplus.')).toBeDefined()
  })

  it('renders image when provided', () => {
    render(
      <ProgramDetail
        title="Image Test"
        description="Desc"
        image="/test-image.jpg"
      />,
    )

    const img = screen.getByAltText('Image Test')
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('/test-image.jpg')
  })

  it('renders buttons correctly', () => {
    const buttons = [
      { text: 'Selengkapnya', href: '/more', variant: 'subtle' as const },
      { text: 'Jadi Mitra', href: '/mitra', variant: 'primary' as const },
    ]

    render(
      <ProgramDetail
        title="Button Test"
        description="Desc"
        buttons={buttons}
      />,
    )

    const selengkapnyaBtn = screen.getByText('Selengkapnya')
    const mitraBtn = screen.getByText('Jadi Mitra')

    expect(selengkapnyaBtn).toBeDefined()
    expect(selengkapnyaBtn.closest('a')?.getAttribute('href')).toBe('#')

    expect(mitraBtn).toBeDefined()
    expect(mitraBtn.closest('a')?.getAttribute('href')).toBe('/mitra')
  })
})
