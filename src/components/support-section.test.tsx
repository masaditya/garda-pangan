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
        embedPlaceholder={messages.support.embedPlaceholder}
      />,
    )
    expect(screen.getAllByText(/Dukung/i)).toBeDefined()
    expect(screen.getAllByText(/Kami/i)).toBeDefined()
  })

  it('should render the midtrans embed placeholder', () => {
    render(
      <SupportSection
        titleLine1={messages.support.titleLine1}
        titleLine2={messages.support.titleLine2}
        description={messages.support.description}
        embedPlaceholder={messages.support.embedPlaceholder}
      />,
    )
    expect(screen.getByText(/embed code dari midtrans/i)).toBeDefined()
  })

  it('should render the description', () => {
    render(
      <SupportSection
        titleLine1={messages.support.titleLine1}
        titleLine2={messages.support.titleLine2}
        description={messages.support.description}
        embedPlaceholder={messages.support.embedPlaceholder}
      />,
    )
    expect(screen.getByText(/dana operasional/i)).toBeDefined()
  })
})
