import type { RefObject } from 'react'

type HeroTitleProps = {
  oPortalRef?: RefObject<HTMLSpanElement | null>
  impactBackgroundImage?: string | null
}

export function HeroTitle({ oPortalRef, impactBackgroundImage }: HeroTitleProps) {
  const portalImage = impactBackgroundImage || '/garda-hero-reference.png'
  return (
    <>
      <span className="relative block text-garda-sun">
        <span className='text-white'>ONE STOP</span>{' '}
        <span className="whitespace-nowrap">
          {'F'}
          <span
            ref={oPortalRef}
            data-testid="hero-o-portal"
            className="relative mx-[0.02em] inline-block size-[0.8em] -translate-y-[0.1em] overflow-hidden rounded-full border-4 border-garda-sun bg-garda-forest/30 align-middle"
            aria-hidden="true"
          >
            <img
              src={portalImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          {'OD'}
        </span>
      </span>
      <span className="block text-white">LOSS &amp; <span className='text-garda-sun'>WASTE</span></span>
      <span className="block text-garda-sun">SOLUTION</span>
    </>
  )
}
