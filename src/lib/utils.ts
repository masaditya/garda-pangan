import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEmbedUrl(url : string): string | null {
  try {
    const parsed = new URL(url);

    // Instagram Reel
    if (parsed.hostname.includes("instagram.com")) {
      const match = parsed.pathname.match(
        /^\/reel\/([A-Za-z0-9_-]+)/
      );

      if (match) {
        return `https://www.instagram.com/reel/${match[1]}/embed/`;
      }
    }

    // YouTube
    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com"
    ) {
      const videoId =
        parsed.searchParams.get("v") ||
        parsed.pathname.match(/\/(?:shorts|embed)\/([^/]+)/)?.[1];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtu.be
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export type EmbedType = 'youtube' | 'reel' | null

export function getEmbedType(url: string): EmbedType {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('instagram.com')) {
      if (/^\/reel\//.test(parsed.pathname)) return 'reel'
    }

    if (
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtu.be'
    ) {
      return 'youtube'
    }

    return null
  } catch {
    return null
  }
}