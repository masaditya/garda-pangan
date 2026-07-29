import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { getMessages } from '#/lib/i18n'
import { SupportSection } from './support-section'

const messages = getMessages('id')

describe('SupportSection', () => {
  it('should render the hero section with correct title', () => {
    render(
      <SupportSection
        titleLine1={messages.support.titleLine1}
        titleLine2={messages.support.titleLine2}
        description={messages.support.description}
        qrisImageSrc={messages.support.qrisImageSrc}
      />,
    )
    expect(screen.getAllByText(/Dukung/i)).toBeDefined()
    expect(screen.getAllByText(/Kami/i)).toBeDefined()
  })

  it('should render the QRIS image', () => {
    render(
      <SupportSection
        titleLine1={messages.support.titleLine1}
        titleLine2={messages.support.titleLine2}
        description={messages.support.description}
        qrisImageSrc={messages.support.qrisImageSrc}
      />,
    )
    const qrisImg = screen.getByAltText('QRIS')
    expect(qrisImg).toBeDefined()
    // URL is normalized by normalizeStrapiMediaUrl utility
    expect(qrisImg.getAttribute('src')).toContain('/qris/qris-garda-pangan.png')
  })

  it('should render the description', () => {
    render(
      <SupportSection
        titleLine1={messages.support.titleLine1}
        titleLine2={messages.support.titleLine2}
        description={messages.support.description}
        qrisImageSrc={messages.support.qrisImageSrc}
      />,
    )
    expect(screen.getByText(/dana operasional/i)).toBeDefined()
  })
})
