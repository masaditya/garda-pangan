import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { AwardsInstagramSection } from './awards-instagram-section'

vi.mock('embla-carousel-react', async () => {
  const React = await import('react')

  function useEmblaCarousel(options?: { loop?: boolean }) {
    const [index, setIndex] = React.useState(0)
    const indexRef = React.useRef(0)
    const listenersRef = React.useRef({
      reInit: new Set<() => void>(),
      select: new Set<() => void>(),
    })

    indexRef.current = index

    const api = React.useMemo(
      () => ({
        canScrollNext: () => (options?.loop ? true : indexRef.current < 9),
        canScrollPrev: () => (options?.loop ? true : indexRef.current > 0),
        off: (event: 'reInit' | 'select', callback: () => void) => {
          listenersRef.current[event].delete(callback)
        },
        on: (event: 'reInit' | 'select', callback: () => void) => {
          listenersRef.current[event].add(callback)
        },
        scrollNext: () => {
          setIndex((current) => (current === 9 ? 0 : current + 1))
        },
        scrollPrev: () => {
          setIndex((current) => (current === 0 ? 9 : current - 1))
        },
        scrollSnapList: () => Array.from({ length: 10 }, (_, i) => i),
        selectedScrollSnap: () => indexRef.current,
      }),
      [options?.loop],
    )

    React.useEffect(() => {
      listenersRef.current.select.forEach((callback) => callback())
    }, [index])

    const ref = React.useCallback(() => {}, [])

    return [ref, api] as const
  }

  return {
    __esModule: true,
    default: useEmblaCarousel,
  }
})

describe('AwardsInstagramSection', () => {
  test('renders an interactive awards carousel and the instagram gallery', () => {
    render(<AwardsInstagramSection />)

    expect(
      screen.getByRole('heading', { name: /awards & recognition/i }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: /our instagram/i })).toBeTruthy()

    // Award cards still render inside the carousel
    expect(screen.getAllByTestId(/award-card-/i)).toHaveLength(10)

    // Carousel ARIA structure
    const regions = screen.getAllByRole('region')
    const carousel = regions.find(
      (el) => el.getAttribute('aria-roledescription') === 'carousel',
    )
    expect(carousel).toBeTruthy()

    const slides = screen.getAllByRole('group')
    expect(slides.length).toBeGreaterThanOrEqual(10)
    expect(slides[0].getAttribute('aria-roledescription')).toBe('slide')

    // Navigation arrows
    expect(screen.getByRole('button', { name: /previous award/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /next award/i })).toBeTruthy()

    // Instagram section unchanged
    expect(
      screen.getAllByRole('img', { name: /instagram post/i }),
    ).toHaveLength(10)
    expect(screen.getByTestId('instagram-grid').className).toContain('grid')
    expect(screen.getByTestId('instagram-grid').className).toContain(
      'lg:grid-cols-5',
    )
  })
})
