import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '#/components/ui/carousel'
import type { CarouselApi } from '#/components/ui/carousel'

import { DidYouKnowSection } from './did-you-know-section'
import { GardaButton } from './garda-button'
import { GardaLogo } from './garda-logo'
import { HeroTitle } from './hero-title'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '#/lib/gsap-client'
import { buildImpactMetrics } from '#/lib/impact-metrics'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const SCROLL_DISTANCE_VH = 420
const IMPACT_BACKGROUND_IMAGE = '/garda-hero-reference.png'

function resolveHeroBackground(backgroundImage?: string | null) {
  return normalizeStrapiMediaUrl(backgroundImage)
}

type HeroScrollSequenceProps = {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  backgroundImage?: string | null
  didYouKnowSlides?: { id: number | string; content: string }[]
  portionsRescued?: string | null
  co2Reduced?: string | null
  foodLossPotential?: string | null
  foodScrap?: string | null
  impactStats?: { id: number; label: string; value: string }[]
}

type PortalMetrics = {
  cx: number
  cy: number
  portalSize: number
}

function getPortalMetrics(anchor: HTMLElement): PortalMetrics {
  const rect = anchor.getBoundingClientRect()
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    portalSize: Math.max(rect.width, rect.height, 1),
  }
}

function getFallbackPortalMetrics(heading: HTMLElement): PortalMetrics {
  const rect = heading.getBoundingClientRect()
  const portalSize = Math.max(Math.min(rect.width, rect.height) * 0.09, 1)
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height * 0.72,
    portalSize,
  }
}

function getCircleCenter(portal: PortalMetrics, container: HTMLElement) {
  const rect = container.getBoundingClientRect()

  return {
    cx: portal.cx - rect.left,
    cy: portal.cy - rect.top,
  }
}

function getMaxCircleRadius(portal: PortalMetrics, container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  const { cx, cy } = getCircleCenter(portal, container)

  return Math.hypot(
    Math.max(cx, rect.width - cx),
    Math.max(cy, rect.height - cy),
  )
}

function getCircleClip(
  radius: number,
  portal: PortalMetrics,
  container: HTMLElement,
) {
  const { cx, cy } = getCircleCenter(portal, container)
  return `circle(${radius}px at ${cx}px ${cy}px)`
}

function readMotionPreference() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function HeroScrollSequenceStatic({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  didYouKnowSlides,
  portionsRescued,
  co2Reduced,
  foodLossPotential,
  foodScrap,
  impactStats,
}: HeroScrollSequenceProps) {
  const heroBgUrl = resolveHeroBackground(backgroundImage)
  const metrics = buildImpactMetrics({
    portionsRescued,
    co2Reduced,
    foodLossPotential,
    foodScrap,
    stats: impactStats,
  })
  const headingLabel =
    title || 'ONE STOP FOOD LOSS & WASTE SOLUTION'

  return (
    <div data-testid="hero-scroll-sequence-static">
      <section
        role="banner"
        className="relative isolate min-h-screen overflow-hidden bg-garda-forest-deep"
      >
        {heroBgUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroBgUrl}')` }}
          />
        ) : null}
        <div className="absolute inset-0 bg-garda-forest-deep/75" />
        <div className="absolute inset-0 bg-linear-to-b from-garda-forest-deep/50 via-garda-forest-deep/35 to-garda-forest-deep/80" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6 pb-24 pt-32 text-center sm:px-12 md:px-16 lg:px-24">
          <div className="flex max-w-5xl flex-col items-center gap-6">
            <h1
              aria-label={headingLabel}
              className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.03em]"
            >
              <HeroTitle />
            </h1>
            {subtitle ? (
              <p className="max-w-[600px] text-lg font-medium text-white/85 sm:text-xl">
                {subtitle}
              </p>
            ) : null}
          </div>

          <GardaButton
            href={ctaLink || '/program'}
            variant="hero"
            className="h-16 px-8 text-lg"
          >
            {ctaText || 'Pelajari Selengkapnya'}
          </GardaButton>
        </div>
      </section>

      <section
        aria-label="Dampak Garda Pangan"
        className="relative min-h-screen overflow-hidden bg-garda-forest-deep"
      >
        <img
          src={IMPACT_BACKGROUND_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-garda-forest-deep/20" />
        <div className="absolute inset-0 bg-linear-to-b from-garda-forest-deep/10 via-transparent to-garda-forest-deep/55" />

        <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-24 pt-32 sm:px-12 md:px-16 lg:px-24">
          <div
            data-testid="hero-impact-stats"
            className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {metrics.map((metric) => {
              const [unit, ...restLabel] = metric.label.split(' ')
              const remainingLabel = restLabel.join(' ')

              return (
                <div key={metric.label} className="text-left flex flex-col">
                  <div className="flex items-baseline gap-2 text-garda-sun">
                    <span className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none">
                      {metric.value}
                    </span>
                    {unit && (
                      <span className="text-sm font-medium uppercase tracking-widest sm:text-base">
                        {unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-white/90 sm:text-sm">
                    {remainingLabel}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <DidYouKnowSection slides={didYouKnowSlides} variant="immersive" autoPlay />
    </div>
  )
}

function DidYouKnowCarouselInternal({
  slides,
}: {
  slides?: { id: number | string; content: string }[]
}) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const items = slides && slides.length > 0 ? slides : [
    { id: 'default', content: '“Kalau sepertiga makanan yang diproduksi di seluruh dunia terbuang sia-sia? Kerugian ekonomi yang ditimbulkan juga luar biasa besar!”' }
  ]

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      plugins={[plugin.current]}
      setApi={setCarouselApi}
      className="w-full static"
    >
      <CarouselContent>
        {items.map((slide) => (
          <CarouselItem key={slide.id}>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed text-right pb-20">
              {slide.content}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 right-0 flex justify-end gap-4 z-20">
        <button
          onClick={() => carouselApi?.scrollPrev()}
          className="w-14 h-14 rounded-full bg-garda-sun text-[#0d2b14] flex items-center justify-center transition-transform hover:scale-105"
          aria-label="Previous fact"
        >
          <ChevronLeft className="size-6 stroke-2" />
        </button>
        <button
          onClick={() => carouselApi?.scrollNext()}
          className="w-14 h-14 rounded-full bg-garda-sun text-[#0d2b14] flex items-center justify-center transition-transform hover:scale-105"
          aria-label="Next fact"
        >
          <ChevronRight className="size-6 stroke-2" />
        </button>
      </div>
    </Carousel>
  )
}

export function HeroScrollSequence(props: HeroScrollSequenceProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readMotionPreference)
  const [isScrollReady, setIsScrollReady] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const heroMaskRef = useRef<HTMLDivElement>(null)
  const revealClipRef = useRef<HTMLDivElement>(null)
  const revealImageRef = useRef<HTMLImageElement>(null)
  const impactOverlayRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const oPortalRef = useRef<HTMLSpanElement>(null)

  const heroBgUrl = resolveHeroBackground(props.backgroundImage)
  const metrics = buildImpactMetrics({
    portionsRescued: props.portionsRescued,
    co2Reduced: props.co2Reduced,
    foodLossPotential: props.foodLossPotential,
    foodScrap: props.foodScrap,
    stats: props.impactStats,
  })
  const headingLabel =
    props.title || 'ONE STOP FOOD LOSS & WASTE SOLUTION'

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const preload = new Image()
    preload.src = IMPACT_BACKGROUND_IMAGE
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const wrapper = wrapperRef.current
    const pin = pinRef.current
    const revealClip = revealClipRef.current
    const revealImage = revealImageRef.current
    const heroBg = heroBgRef.current
    const heroMask = heroMaskRef.current
    const impactOverlay = impactOverlayRef.current
    const heroContent = heroContentRef.current
    const facts = factsRef.current

    if (
      !wrapper ||
      !pin ||
      !revealClip ||
      !revealImage ||
      !heroMask ||
      !impactOverlay ||
      !heroContent ||
      !facts
    ) {
      return
    }

    ensureGsapPlugins()

    const html = document.documentElement
    html.dataset.heroScroll = 'active'

    const syncPortal = (): PortalMetrics | null => {
      if (oPortalRef.current) {
        return getPortalMetrics(oPortalRef.current)
      }

      const heading = heroContent.querySelector('h1')
      if (heading instanceof HTMLElement) {
        return getFallbackPortalMetrics(heading)
      }

      return null
    }

    const paintRevealCircle = (radius: number) => {
      const portal = syncPortal()
      if (!portal) return null

      revealClip.style.clipPath = getCircleClip(radius, portal, pin)
      gsap.set(revealClip, { opacity: 1 })

      return portal
    }

    const portal = syncPortal()
    if (!portal) {
      delete html.dataset.heroScroll
      return
    }

    const initialRadius = portal.portalSize / 2
    const maxRadius = getMaxCircleRadius(portal, pin)
    paintRevealCircle(initialRadius)

    gsap.set([facts, impactOverlay], { opacity: 0 })
    gsap.set(facts, { y: 24 })

    const revealState = { radius: initialRadius, maxRadius }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(revealState, {
        radius: () => {
          const currentPortal = syncPortal()
          if (!currentPortal) return revealState.maxRadius
          return getMaxCircleRadius(currentPortal, pin)
        },
        duration: 0.54,
        onUpdate: () => {
          paintRevealCircle(revealState.radius)
        },
      })

      timeline.to(
        [heroBg, heroMask],
        { opacity: 0, duration: 0.18, ease: 'power1.out' },
        0.28,
      )

      timeline.to(
        heroContent,
        { opacity: 0, duration: 0.18, ease: 'power1.out' },
        0.3,
      )

      timeline.to(
        impactOverlay,
        { opacity: 1, duration: 0.2, ease: 'power1.out' },
        0.48,
      )

      timeline.to(
        facts,
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.52,
      )

      const numberEls = pin.querySelectorAll('.impact-number')
      numberEls.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-value') || '0')
        const obj = { val: 0 }
        timeline.to(
          obj,
          {
            val: targetVal,
            duration: 0.25,
            ease: 'power1.out',
            onUpdate: () => {
              el.innerHTML = Math.round(obj.val).toLocaleString('en-US')
            }
          },
          0.52
        )
      })

      // Note: Removed facts fade out and stats fade in to keep the combined layout visible
    }, wrapper)

    const refreshScroll = () => {
      const currentPortal = syncPortal()
      if (currentPortal) {
        revealState.maxRadius = getMaxCircleRadius(currentPortal, pin)
      }
      paintRevealCircle(revealState.radius)
      ScrollTrigger.refresh()
    }

    const refreshFrame = window.requestAnimationFrame(refreshScroll)
    const refreshTimeout = window.setTimeout(refreshScroll, 250)

    window.addEventListener('load', refreshScroll)
    window.addEventListener('resize', refreshScroll)
    document.fonts?.ready.then(refreshScroll).catch(() => undefined)

    setIsScrollReady(true)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimeout)
      window.removeEventListener('load', refreshScroll)
      window.removeEventListener('resize', refreshScroll)
      delete html.dataset.heroScroll
      setIsScrollReady(false)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return <HeroScrollSequenceStatic {...props} />
  }

  return (
    <div
      ref={wrapperRef}
      data-testid="hero-scroll-sequence"
      data-scroll-ready={isScrollReady ? 'true' : 'false'}
      className="relative"
      style={{ height: `${SCROLL_DISTANCE_VH}vh` }}
    >
      <div
        ref={pinRef}
        className="relative h-svh min-h-svh w-full overflow-hidden bg-garda-forest-deep"
      >
        {heroBgUrl ? (
          <div
            ref={heroBgRef}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroBgUrl}')` }}
          />
        ) : (
          <div ref={heroBgRef} className="absolute inset-0 z-0 bg-garda-forest-deep" />
        )}

        <div
          ref={heroMaskRef}
          className="absolute inset-0 z-1 pointer-events-none"
        >
          <div className="absolute inset-0 bg-garda-forest-deep/75" />
          <div className="absolute inset-0 bg-linear-to-b from-garda-forest-deep/50 via-garda-forest-deep/35 to-garda-forest-deep/80" />
        </div>

        <div
          ref={revealClipRef}
          data-testid="hero-reveal-clip"
          className="pointer-events-none absolute inset-0 z-2 opacity-0 will-change-[clip-path]"
          style={{ clipPath: 'circle(0px at 50% 50%)' }}
        >
          <img
            ref={revealImageRef}
            src={IMPACT_BACKGROUND_IMAGE}
            alt=""
            aria-hidden="true"
            draggable={false}
            data-testid="hero-reveal-image"
            className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
          />
        </div>

        <div
          ref={impactOverlayRef}
          className="pointer-events-none absolute inset-0 z-3 opacity-0"
        >
          <div className="absolute inset-0 bg-garda-forest-deep/20" />
          <div className="absolute inset-0 bg-linear-to-b from-garda-forest-deep/10 via-transparent to-garda-forest-deep/55" />
        </div>

        <div
          ref={heroContentRef}
          data-testid="hero-content"
          className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 pb-24 pt-32 text-center sm:px-12 md:px-16 lg:px-24"
        >
          <div className="flex max-w-5xl flex-col items-center gap-6">
            <h1
              aria-label={headingLabel}
              className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.03em]"
            >
              <HeroTitle oPortalRef={oPortalRef} />
            </h1>
            {/* {props.subtitle ? (
              <p className="max-w-[600px] text-lg font-medium text-white/85 sm:text-xl">
                {props.subtitle}
              </p>
            ) : null} */}
          </div>

          {/* <GardaButton
            href={props.ctaLink || '/program'}
            variant="hero"
            className="h-16 px-8 text-lg"
          >
            {props.ctaText || 'Pelajari Selengkapnya'}
          </GardaButton> */}

          <a
            href="#featured-by"
            aria-label="Scroll ke konten"
            className="absolute bottom-10 flex size-11 items-center justify-center rounded-full border border-garda-sun/40 bg-garda-sun/10 text-garda-sun transition hover:bg-garda-sun/20"
          >
            <ChevronDown className="size-5" aria-hidden="true" />
          </a>
        </div>

        <div
          ref={factsRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center opacity-0"
        >
          <div className="pointer-events-auto w-full px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="relative mx-auto max-w-6xl mt-20">
              {/* Top Card */}
              <div className="relative bg-[#0d2b14] rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-2xl">
                {/* Watermark Logo Placeholder */}
                <div className="absolute -bottom-16 -left-16 text-white/5 opacity-20 pointer-events-none">
                  <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 90 C27.9 90 10 72.1 10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 C90 72.1 72.1 90 50 90 Z" />
                  </svg>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <h2 className="text-garda-sun font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1]">
                      Tahukah<br/>Kamu?
                    </h2>
                    <GardaLogo className="mt-6 opacity-30 invert brightness-0 pointer-events-none transform scale-150 origin-top-left" />
                  </div>
                  <div className="flex flex-col justify-between items-end w-full max-w-md ml-auto">
                    <DidYouKnowCarouselInternal slides={props.didYouKnowSlides} />
                  </div>
                </div>
              </div>

              {/* Person Image */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[10%] md:top-[8%] z-10 w-[280px] md:w-[380px] pointer-events-none">
                <img src="/hero-facts.png" alt="Volunteer" className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* Bottom Card */}
              <div className="relative bg-[#0d2b14] rounded-[2rem] p-8 md:p-12 mt-24 md:mt-32 z-20 shadow-2xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {metrics.map((metric) => {
                    const numMatch = metric.value.match(/[\d,.]+/);
                    const numStr = numMatch ? numMatch[0] : '';
                    const [unit, ...restLabel] = metric.label.split(' ');
                    const remainingLabel = restLabel.join(' ');

                    return (
                      <div key={metric.label}>
                        <div className="flex items-baseline gap-1.5 text-garda-sun mb-2 flex-wrap xl:flex-nowrap">
                          <span className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] tracking-tighter">
                            {numStr ? <span className="impact-number" data-value={numStr.replace(/,/g, '')}>0</span> : metric.value}
                          </span>
                          {unit && <span className="text-xs md:text-sm uppercase tracking-wider">{unit}</span>}
                        </div>
                        <p className="text-white/90 text-xs md:text-sm uppercase tracking-wider max-w-[200px]">
                          {remainingLabel}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
