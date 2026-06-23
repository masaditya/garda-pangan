import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { buildContactCategories, getMessages } from '#/lib/i18n'
import { ContactSection } from './contact-section'

const messages = getMessages('id')
const contactCategories = buildContactCategories(messages)

const defaultProps = {
  titleLine1: messages.contact.heroTitleLine1,
  titleLine2: messages.contact.heroTitleLine2,
  description: messages.contact.heroDescription,
  illustrationLabel: messages.contact.illustrationLabel,
  categories: contactCategories,
}

describe('ContactSection', () => {
  it('should render the hero section with correct title', () => {
    render(<ContactSection {...defaultProps} />)
    expect(screen.getAllByText(/Hubungi/i)).toBeDefined()
    expect(screen.getAllByText(/Kami/i)).toBeDefined()
  })

  it('should render multiple contact category cards', () => {
    render(<ContactSection {...defaultProps} />)
    expect(screen.getAllByText(/DONASI DANA/i)).toBeDefined()
    expect(screen.getAllByText(/KUNJUNGAN/i)).toBeDefined()
    expect(screen.getAllByText(/KOLABORASI CSR/i)).toBeDefined()
  })

  it('should render "Hubungi Kami" buttons on cards', () => {
    render(<ContactSection {...defaultProps} />)
    const buttons = screen.getAllByText('Hubungi Kami')
    expect(buttons.length).toBeGreaterThanOrEqual(11)
  })
})
