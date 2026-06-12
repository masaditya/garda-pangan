'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'

import type { MitraPage as MitraData } from '#/lib/strapi/pages'

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function PartnerHeroSection({ data }: { data?: MitraData }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const bgImage = data?.heroBackgroundMedia?.url || '/garda-hero-reference.png'
  const title = data?.heroTitle || 'Jadi \n Mitra'
  const videoId = data?.heroVideoUrl ? getYoutubeId(data.heroVideoUrl) : null

  return (
    <section
      role="banner"
      className="relative isolate min-h-screen overflow-hidden bg-garda-forest text-white"
    >
      {/* Background Image or Video */}
      {!isPlaying ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : videoId ? (
        <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
          {/* using aspect ratio trick to keep iframe proportionally large */}
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}

      {/* Overlays */}
      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,56,30,0.30)_0%,rgba(12,56,30,0.18)_34%,rgba(12,56,30,0.26)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.98)_100%)] sm:h-44" />
        </>
      )}

      {/* Close Button when playing */}
      {isPlaying && (
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute top-24 right-6 sm:right-10 lg:right-16 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer border border-white/20"
        >
          <X className="h-6 w-6" />
        </button>
      )}

      {/* Play Button Wrapper */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pt-24 text-white/50 z-20 pointer-events-none">
          {videoId ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 pointer-events-auto cursor-pointer"
            >
              <Play className="h-6 w-6 text-white ml-1" />
            </button>
          ) : (
            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 pointer-events-auto cursor-not-allowed opacity-50">
              <Play className="h-6 w-6 text-white ml-1" />
            </button>
          )}
        </div>
      )}

      {/* Hero Content (hides when playing video) */}
      <div
        className={`relative z-10 flex min-h-screen flex-col justify-end gap-8 px-6 pb-28 pt-32 sm:px-10 sm:pt-36 md:gap-10 lg:px-8 lg:pb-32 lg:pt-40 transition-all duration-500 ${
          isPlaying
            ? 'opacity-0 pointer-events-none translate-y-8'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <h1 className="text-5xl tracking-tight text-white mb-6 sm:text-6xl lg:text-7xl whitespace-pre-line">
                {title}
              </h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md"
                >
                  <div className="mb-3 h-8 w-8 rounded-full bg-garda-lemon/20" />
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    Bersama mewujudkan ketahanan pangan lokal dengan kontribusi
                    aktif.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
