import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { DidYouKnowSection } from './did-you-know-section'

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
        canScrollNext: () => (options?.loop ? true : indexRef.current < 2),
        canScrollPrev: () => (options?.loop ? true : indexRef.current > 0),
        off: (event: 'reInit' | 'select', callback: () => void) => {
          listenersRef.current[event].delete(callback)
        },
        on: (event: 'reInit' | 'select', callback: () => void) => {
          listenersRef.current[event].add(callback)
        },
        scrollNext: () => {
          setIndex((current) => (current === 2 ? 0 : current + 1))
        },
        scrollPrev: () => {
          setIndex((current) => (current === 0 ? 2 : current - 1))
        },
        scrollSnapList: () => [0, 1, 2],
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

describe('DidYouKnowSection', () => {
  test('renders the figma heading and first fact on load', () => {
    const { container } = render(<DidYouKnowSection />)

    expect(
      screen.getByRole('heading', { name: /tahukah kamu\?/i }),
    ).toBeTruthy()
    expect(
      screen.getByText(
        /kalau sepertiga makanan yang diproduksi di seluruh dunia terbuang sia-sia/i,
      ),
    ).toBeTruthy()
    expect(screen.getByTestId('facts-frame').className).toContain('bg-white')
    expect(screen.getByTestId('facts-frame').className).not.toContain(
      'rounded-',
    )
    expect(screen.getByTestId('facts-frame').className).not.toContain('shadow-')
    expect(container.querySelector('.facts-section__frame')).toBeNull()
  })

  test('changes the active slide when the controls are used', () => {
    const { container } = render(<DidYouKnowSection />)

    fireEvent.click(screen.getByRole('button', { name: /next fact/i }))

    const secondSlide = screen.getByText(
      /food rescue is the practice of saving surplus food from the hospitality and food business sectors/i,
    )

    expect(secondSlide).toBeTruthy()
    expect(
      secondSlide.closest('[data-active]')?.getAttribute('data-active'),
    ).toBe('true')

    fireEvent.click(screen.getByRole('button', { name: /previous fact/i }))

    const firstSlide = screen.getByText(
      /kalau sepertiga makanan yang diproduksi di seluruh dunia terbuang sia-sia/i,
    )

    expect(
      firstSlide.closest('[data-active]')?.getAttribute('data-active'),
    ).toBe('true')
    expect(screen.getByTestId('facts-frame').className).toContain('bg-white')
  })
})
