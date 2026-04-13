// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from '../components/home/HomePage'

describe('HomePage', () => {
  it('renders the supporter section below ayo jadi agen perubahan with 16 supporter logos', () => {
    const { container } = render(<HomePage />)

    const changeAgentHeading = screen.getByRole('heading', {
      name: /ayo jadi agen perubahan/i,
    })
    const supportersHeading = screen.getByRole('heading', {
      name: /supporter & collabolators/i,
    })

    expect(
      screen.getByText(
        /since 2021, we have partnered with these companies to create impact for the future\. will your logo be next here\?/i,
      ),
    ).toBeTruthy()

    const supporterLogos = screen.getAllByAltText(/badan pangan nasional/i)

    expect(supporterLogos).toHaveLength(16)
    expect(
      changeAgentHeading.compareDocumentPosition(supportersHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(container.querySelectorAll('img[alt]')).toHaveLength(16)
  })
})
