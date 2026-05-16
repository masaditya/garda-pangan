import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgramDetail } from '../components/program-detail'

describe('ProgramDetail', () => {
  it('renders title and preview description correctly', () => {
    render(
      <ProgramDetail
        title="Food Rescue"
        description="<p>Paragraf pertama.</p><p>Paragraf kedua.</p>"
      />,
    )

    expect(screen.getByText('Food Rescue')).toBeDefined()
    expect(screen.getByText('Paragraf pertama.')).toBeDefined()
    expect(screen.queryByText('Paragraf kedua.')).toBeNull()
  })

  it('renders image when provided', () => {
    render(
      <ProgramDetail
        title="Image Test"
        description="<p>Desc</p>"
        image="/test-image.jpg"
      />,
    )

    const img = screen.getByAltText('Image Test')
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('/test-image.jpg')
  })

  it('opens modal with full item content when Selengkapnya is clicked', () => {
    const buttons = [
      { text: 'Selengkapnya', href: '/mitra', variant: 'subtle' as const },
      { text: 'Jadi Mitra', href: '/kontak', variant: 'primary' as const },
    ]

    render(
      <ProgramDetail
        title="Button Test"
        description="<p>Ringkasan singkat.</p><p>Detail lengkap program.</p>"
        buttons={buttons}
      />,
    )

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByText('Detail lengkap program.')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /selengkapnya/i }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    expect(within(dialog).getByText('Button Test')).toBeDefined()
    expect(within(dialog).getByText('Detail lengkap program.')).toBeDefined()
    expect(within(dialog).getByRole('link', { name: /jadi mitra/i })).toBeDefined()
    expect(
      within(dialog).queryByRole('button', { name: /selengkapnya/i }),
    ).toBeNull()
  })
})
