import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { getMessages } from '#/lib/i18n'
import { VolunteerSection } from './volunteer-section'

const messages = getMessages('id')

describe('VolunteerSection', () => {
  it('should render the hero section with correct title', () => {
    render(
      <VolunteerSection
        titleLine1={messages.volunteer.titleLine1}
        titleLine2={messages.volunteer.titleLine2}
        description={messages.volunteer.description}
        cta={messages.volunteer.cta}
      />,
    )
    expect(screen.getAllByText(/Pahlawan/i)).toBeDefined()
    expect(screen.getAllByText(/Pangan/i)).toBeDefined()
  })

  it('should render the "Daftar Sekarang" button', () => {
    render(
      <VolunteerSection
        titleLine1={messages.volunteer.titleLine1}
        titleLine2={messages.volunteer.titleLine2}
        description={messages.volunteer.description}
        cta={messages.volunteer.cta}
      />,
    )
    expect(screen.getByText('Daftar Sekarang')).toBeDefined()
  })

  it('should render the description', () => {
    render(
      <VolunteerSection
        titleLine1={messages.volunteer.titleLine1}
        titleLine2={messages.volunteer.titleLine2}
        description={messages.volunteer.description}
        cta={messages.volunteer.cta}
      />,
    )
    expect(screen.getByText(/Food Heroes/i)).toBeDefined()
  })
})
