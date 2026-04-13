import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Header from './Header'

describe('Header', () => {
  test('renders Garda branding, nav links, and the active home state', () => {
    const { container } = render(<Header currentPath="/" />)

    expect(screen.getByText(/garda pangan/i)).toBeTruthy()
    expect(
      screen.getByRole('navigation', { name: /primary navigation/i }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: /tentang kami/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /mitra/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /relawan/i })).toBeTruthy()

    const homeLink = screen.getByRole('link', { name: /beranda/i })
    expect(homeLink.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.site-header')).toBeNull()
  })

  test('opens the mobile navigation sheet', () => {
    render(<Header currentPath="/tentang-kami" />)

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

    expect(screen.getAllByText(/tentang kami/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /dukung/i })).toBeTruthy()
  })
})
