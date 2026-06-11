export function SupportSection() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center lg:pb-48 lg:pt-56">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Title */}
        <h1 className="font-serif text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
          Dukung<br />Kami
        </h1>
        
        {/* Description */}
        <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          Dukung gerakan kami dengan berdonasi dana operasional, atau menjadi donatur rutin
        </p>

        {/* Midtrans Embed Card */}
        <div className="mx-auto mt-12 w-full max-w-md overflow-hidden rounded-[40px] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col gap-4">
            {/* Skeleton Placeholders */}
            <div className="h-16 w-full rounded-2xl bg-black/10 animate-pulse" />
            <div className="h-16 w-full rounded-2xl bg-black/10 animate-pulse delay-75" />
            <div className="h-16 w-full rounded-2xl bg-black/10 animate-pulse delay-150" />
            
            {/* Embed Placeholder Text */}
            <div className="mt-4 flex flex-col items-center justify-center py-4 text-garda-forest/60">
              <span className="font-mono text-sm font-bold tracking-tight">
                &lt; embed code dari midtrans/ &gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
