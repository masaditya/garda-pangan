import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { SupportersCollaboratorsSection } from './supporters-collaborators-section'

describe('SupportersCollaboratorsSection', () => {
  test('renders the heading, supporting copy, and default cards', () => {
    render(<SupportersCollaboratorsSection />)

    const heading = screen.getByRole('heading', {
      name: /ayo jadi agen perubahan/i,
    })

    expect(heading).toBeTruthy()
    expect(
      screen.getByText(
        /melalui garda pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di indonesia/i,
      ),
    ).toBeTruthy()
    expect(screen.getByTestId('agent-change-grid').className).toContain('grid')
  })

  test('correctly resolves wa.me CTA links to external https links without localizing them', () => {
    const mockCards = [
      {
        id: 1,
        title: 'WhatsApp Donasi',
        description: 'Hubungi kami lewat WhatsApp',
        ctaText: 'Hubungi WA',
        ctaLink: 'wa.me/628123456789',
      },
      {
        id: 2,
        title: 'WhatsApp Donasi HTTPS',
        description: 'Hubungi kami lewat WhatsApp dengan HTTPS',
        ctaText: 'Hubungi WA HTTPS',
        ctaLink: 'https://wa.me/628123456789',
      },
      {
        id: 3,
        title: 'Regular Program Link',
        description: 'Link ke program',
        ctaText: 'Lihat Program',
        ctaLink: '/program',
      },
    ]

    render(<SupportersCollaboratorsSection cards={mockCards} locale="id" />)

    const waLink = screen.getByRole('link', { name: /^hubungi waarrow icon$/i })
    expect(waLink.getAttribute('href')).toBe('https://wa.me/628123456789')

    const waHttpsLink = screen.getByRole('link', { name: /^hubungi wa httpsarrow icon$/i })
    expect(waHttpsLink.getAttribute('href')).toBe('https://wa.me/628123456789')

    const normalLink = screen.getByRole('link', { name: /^lihat programarrow icon$/i })
    expect(normalLink.getAttribute('href')).toBe('/id/program')
  })
})
