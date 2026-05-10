import { useState } from 'react'
import { Link2, Facebook, Linkedin, Check } from 'lucide-react'

type EventShareButtonsProps = {
  url: string
  title: string
}

export function EventShareButtons({ url, title }: EventShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
    )
  }

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
    )
  }

  const handleShareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      '_blank',
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-garda-forest focus:ring-offset-2"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Link2 className="size-4" />
        )}
        <span>{copied ? 'Copied!' : 'Copy link'}</span>
      </button>

      <button
        onClick={handleShareTwitter}
        className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-garda-forest focus:ring-offset-2"
        aria-label="Share to X (Twitter)"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        onClick={handleShareFacebook}
        className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-garda-forest focus:ring-offset-2"
        aria-label="Share to Facebook"
      >
        <Facebook className="size-4 fill-current" />
      </button>

      <button
        onClick={handleShareLinkedin}
        className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-garda-forest focus:ring-offset-2"
        aria-label="Share to LinkedIn"
      >
        <Linkedin className="size-4 fill-current" />
      </button>
    </div>
  )
}
