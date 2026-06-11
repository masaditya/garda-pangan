import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgramListSection } from '../components/program-list-section'

const samplePrograms = [
  {
    title: 'Food Rescue Dari Bisnis Makanan',
    description: '<p>Ringkasan program.</p><p>Detail lengkap program.</p>',
    image: '/test-image.jpg',
    buttons: [
      { text: 'Selengkapnya', href: '/mitra', variant: 'subtle' as const },
      { text: 'Jadi Mitra', href: '/kontak', variant: 'primary' as const },
    ],
  },
  {
    title: 'Gleaning Dari Lahan Pertanian',
    description: '<p>Program gleaning.</p>',
    image: '/gleaning.jpg',
  },
]

describe('ProgramListSection', () => {
  it('renders hero title, description, and program list', () => {
    render(
      <ProgramListSection
        title="Program <br /> Kami"
        description="Deskripsi hero program."
        programs={samplePrograms}
      />,
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
    expect(screen.getByText('Program')).toBeDefined()
    expect(screen.getByText('Kami')).toBeDefined()
    expect(screen.getByText('Deskripsi hero program.')).toBeDefined()
    expect(
      screen.getByRole('button', { name: /food rescue dari bisnis makanan/i }),
    ).toBeDefined()
    expect(
      screen.getByRole('button', { name: /gleaning dari lahan pertanian/i }),
    ).toBeDefined()
  })

  it('shows tilted preview image on hover', () => {
    render(
      <ProgramListSection
        title="Program Kami"
        description="Deskripsi."
        programs={samplePrograms}
      />,
    )

    const firstItem = screen.getByRole('button', {
      name: /food rescue dari bisnis makanan/i,
    })

    fireEvent.mouseEnter(firstItem)

    const preview = screen.getByTestId('program-hover-preview')
    expect(preview).toBeDefined()
    expect(preview.className).toContain('opacity-100')
    expect(preview.querySelector('img')?.getAttribute('src')).toContain(
      '/test-image.jpg',
    )
  })

  it('opens modal with full content when a list item is clicked', () => {
    render(
      <ProgramListSection
        title="Program Kami"
        description="Deskripsi."
        programs={samplePrograms}
      />,
    )

    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(
      screen.getByRole('button', { name: /food rescue dari bisnis makanan/i }),
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    expect(within(dialog).getByText('Food Rescue Dari Bisnis Makanan')).toBeDefined()
    expect(within(dialog).getByText('Detail lengkap program.')).toBeDefined()
    expect(within(dialog).getByRole('link', { name: /jadi mitra/i })).toBeDefined()
  })
})
