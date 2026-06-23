import type { RefObject } from 'react'

const IMPACT_BACKGROUND_IMAGE = '/garda-hero-reference.png'

type HeroTitleProps = {
  oPortalRef?: RefObject<HTMLSpanElement | null>
}

export function HeroTitle({ oPortalRef }: HeroTitleProps) {
  return (
    <>
      <span className="relative block text-white">
        ONE STOP F
        <span
          ref={oPortalRef}
          data-testid="hero-o-portal"
          className="relative mx-[0.02em] inline-block size-[0.8em] -translate-y-[0.1em] overflow-hidden rounded-full border-4 border-white/90 bg-garda-forest/30 align-middle"
          aria-hidden="true"
        >
          <img
            src={IMPACT_BACKGROUND_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        OD
      </span>
      <span className="block text-white">LOSS &amp; WASTE</span>
      <span className="block text-garda-sun">SOLUTION</span>
    </>
  )
}
