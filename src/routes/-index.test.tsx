import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import { Route } from './index'

describe('home route', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    class MockIntersectionObserver {
      disconnect = vi.fn()
      observe = vi.fn()
      takeRecords = vi.fn(() => [])
      unobserve = vi.fn()
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    })

    class MockResizeObserver {
      disconnect = vi.fn()
      observe = vi.fn()
      unobserve = vi.fn()
    }

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: MockResizeObserver,
    })
  })

  test('renders awards and instagram after supporters collaborators', () => {
    const HomePage = Route.options.component

    render(<HomePage />)

    const supportersHeading = screen.getByRole('heading', {
      name: /supporter & collabolators/i,
    })
    const awardsHeading = screen.getByRole('heading', {
      name: /awards & recognition/i,
    })

    expect(
      supportersHeading.compareDocumentPosition(awardsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
