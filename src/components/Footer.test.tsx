import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Footer from './Footer'

describe('Footer', () => {
  test('marks the current footer nav link as active from props', () => {
    render(<Footer currentPath="/mitra" />)

    const mitraLink = screen.getByRole('link', { name: /^mitra$/i })

    expect(mitraLink.getAttribute('aria-current')).toBe('page')
  })
})
