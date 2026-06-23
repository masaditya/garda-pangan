import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { DidYouKnowSection } from './did-you-know-section'
import { GardaButton } from './garda-button'
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
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none text-garda-sun">
                  {metric.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/90 sm:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DidYouKnowSection slides={didYouKnowSlides} variant="immersive" />
    </div>
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
    const stats = statsRef.current
    const facts = factsRef.current

    if (
      !wrapper ||
      !pin ||
      !revealClip ||
      !revealImage ||
      !heroMask ||
      !impactOverlay ||
      !heroContent ||
      !stats ||
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

    gsap.set([stats, facts, impactOverlay], { opacity: 0 })
    gsap.set(stats, { y: 28 })
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

      timeline.to(
        facts,
        { opacity: 0, y: -16, duration: 0.16, ease: 'power1.in' },
        0.78,
      )

      timeline.to(
        stats,
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.84,
      )
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
          ref={statsRef}
          data-testid="hero-impact-stats"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-20 pt-10 opacity-0 sm:px-12 md:px-16 lg:px-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none text-garda-sun">
                  {metric.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/90 sm:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={factsRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center opacity-0"
        >
          <div className="pointer-events-auto w-full">
            <DidYouKnowSection
              slides={props.didYouKnowSlides}
              variant="immersive"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
