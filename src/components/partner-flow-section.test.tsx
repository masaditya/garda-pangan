import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PartnerFlowSection } from './partner-flow-section'

describe('PartnerFlowSection', () => {
  it('renders the alur donasi heading', () => {
    render(<PartnerFlowSection />)
    expect(
      screen.getByRole('heading', {
        name: /Bagaimana alur donasi Garda Pangan/i,
      }),
    ).toBeTruthy()
  })

  it('renders the 5 steps of the flow', () => {
    render(<PartnerFlowSection />)
    expect(
      screen.getByText(/Punya makanan berlebih yang masih layak konsumsi\?/i),
    ).toBeTruthy()
    expect(screen.getByText(/Silahkan hubungi narahubung kami/i)).toBeTruthy()
    expect(screen.getByText(/Informasikan beberapa keterangan/i)).toBeTruthy()
    expect(
      screen.getByText(/Tim Garda Pangan akan menjemput donasi/i),
    ).toBeTruthy()
    expect(
      screen.getByText(/Laporan bulanan dari tim Garda Pangan/i),
    ).toBeTruthy()
  })
})
