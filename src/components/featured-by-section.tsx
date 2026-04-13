import { LogoCard } from './logo-card'
import { SectionShell } from './section-shell'

const featuredLogos = [
  { id: 'tempo', label: 'TEMPO.CO', variant: 'tempo' },
  { id: 'cnn', label: 'CNN Indonesia', variant: 'cnn' },
  { id: 'metro', label: 'METRO TV', variant: 'metro' },
  { id: 'forbes', label: 'Forbes Indonesia', variant: 'forbes' },
  { id: 'bbc', label: 'BBC NEWS', variant: 'bbc' },
  { id: 'trans-1', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-1', label: "Reader's Digest", variant: 'reader' },
  { id: 'trans-2', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-2', label: "Reader's Digest", variant: 'reader' },
  { id: 'trans-3', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-3', label: "Reader's Digest", variant: 'reader' },
  { id: 'trans-4', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-4', label: "Reader's Digest", variant: 'reader' },
  { id: 'reader-5', label: "Reader's Digest", variant: 'reader' },
] as const

export function FeaturedBySection() {
  return (
    <SectionShell
      aria-labelledby="featured-by-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-8">
        <div className="mx-auto flex items-center justify-center text-center">
          <h2
            id="featured-by-heading"
            className="font-sans text-[clamp(2.75rem,5vw,3.5rem)] font-black tracking-[-0.04em] text-[#222] lg:text-[3.5rem]"
          >
            FEATURED BY
          </h2>
        </div>

        <div
          data-testid="featured-grid"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-5"
        >
          {featuredLogos.map((logo) => (
            <LogoCard key={logo.id} className="lg:w-[15rem]" data-testid={`featured-card-${logo.id}`}>
              <span
                className={
                  logo.variant === 'tempo'
                    ? 'text-center text-[1.6rem] font-black tracking-[-0.06em] text-[#d7352a] sm:text-[1.9rem]'
                    : logo.variant === 'cnn'
                      ? 'flex flex-col items-center gap-0.5 text-[#cf1e1e]'
                      : logo.variant === 'metro'
                        ? 'text-center text-[1.45rem] font-black tracking-[-0.05em] text-[#1d6db4] sm:text-[1.7rem]'
                        : logo.variant === 'forbes'
                          ? 'flex items-start text-black'
                          : logo.variant === 'bbc'
                            ? 'flex flex-col items-center gap-0.5 rounded-sm bg-[#bb1e22] px-3 py-2 text-[0.95rem] font-black tracking-[0.08em] text-white'
                            : logo.variant === 'trans'
                              ? 'text-center text-[1.4rem] font-black tracking-[-0.05em] text-[#1c4e9e] sm:text-[1.65rem]'
                              : 'text-center text-[1.85rem] font-medium tracking-[-0.08em] text-[#d7d7d7]'
                }
                aria-label={logo.label}
              >
                {logo.variant === 'cnn' ? (
                  <>
                    <span className="text-[1.55rem] font-black tracking-[-0.05em] sm:text-[1.8rem]">
                      CNN
                    </span>
                    <span className="text-[0.65rem] font-bold tracking-normal">
                      Indonesia
                    </span>
                  </>
                ) : logo.variant === 'forbes' ? (
                  <>
                    <span className="text-[1.85rem] font-black tracking-[-0.06em] sm:text-[2.15rem]">
                      Forbes
                    </span>
                    <span className="mt-0.5 ml-1 text-[0.55rem] font-semibold tracking-normal">
                      Indonesia
                    </span>
                  </>
                ) : logo.variant === 'bbc' ? (
                  <>
                    <span>BBC</span>
                    <span>NEWS</span>
                  </>
                ) : (
                  logo.label
                )}
              </span>
            </LogoCard>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
