import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

import type { ArticleBlock } from '#/lib/strapi/articles'
import type { StrapiMedia } from '#/lib/strapi/types'

type ArticleBlockRendererProps = {
  blocks?: ArticleBlock[]
}

function getMediaAlt(media: StrapiMedia) {
  return media.alternativeText || media.caption || media.name
}

function MediaImage({ media }: { media: StrapiMedia }) {
  const src = normalizeStrapiMediaUrl(media.url)

  if (!src) {
    return null
  }

  return (
    <img
      src={src}
      alt={getMediaAlt(media)}
      loading="lazy"
      decoding="async"
      className="w-full rounded-[2rem] object-cover shadow-[0_24px_60px_rgba(13,42,22,0.14)]"
    />
  )
}

export function ArticleBlockRenderer({
  blocks = [],
}: ArticleBlockRendererProps) {
  return (
    <div className="space-y-10">
      {blocks.map((block) => {
        switch (block.__component) {
          case 'shared.rich-text':
            return block.body ? (
              <div
                key={block.id}
                className="prose prose-lg max-w-none text-garda-ink-soft"
                dangerouslySetInnerHTML={{ __html: block.body }}
              />
            ) : null

          case 'shared.media':
            return block.file ? (
              <figure key={block.id}>
                <MediaImage media={block.file} />
                {block.file.caption && (
                  <figcaption className="mt-3 text-center text-sm text-garda-ink-soft">
                    {block.file.caption}
                  </figcaption>
                )}
              </figure>
            ) : null

          case 'shared.quote':
            return (
              <blockquote
                key={block.id}
                className="rounded-[2rem] bg-garda-mint-soft p-8 text-garda-forest"
              >
                {block.body && (
                  <p className="text-2xl font-bold leading-snug">
                    {block.body}
                  </p>
                )}
                {block.title && (
                  <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.18em]">
                    {block.title}
                  </footer>
                )}
              </blockquote>
            )

          case 'shared.slider':
            return block.files?.length ? (
              <div
                key={block.id}
                className="grid gap-4 sm:grid-cols-2"
                aria-label="Article image gallery"
              >
                {block.files.map((file) => (
                  <MediaImage key={file.documentId} media={file} />
                ))}
              </div>
            ) : null
        }
      })}
    </div>
  )
}
