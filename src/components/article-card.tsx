import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'
import type { Locale } from '#/lib/i18n/locales'
import { getIntlLocale } from '#/lib/i18n/locales'
import { getMessages } from '#/lib/i18n/messages'
import { localizedPath } from '#/lib/i18n/routing'

import type { Article } from '#/lib/strapi/articles'

type ArticleCardProps = {
  article: Article
  locale?: Locale
}

function formatDate(date: string | null | undefined, locale: Locale) {
  if (!date) {
    return null
  }

  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function ArticleCard({ article, locale = 'id' }: ArticleCardProps) {
  const messages = getMessages(locale)
  const coverUrl = normalizeStrapiMediaUrl(article.cover?.url)
  const publishedDate = formatDate(article.publishedAt, locale)

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-garda-border bg-white shadow-[0_24px_60px_rgba(13,42,22,0.08)]">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={
            article.cover?.alternativeText ||
            article.cover?.name ||
            article.title
          }
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-garda-forest/70">
          {article.category?.name && <span>{article.category.name}</span>}
          {publishedDate && (
            <time dateTime={article.publishedAt ?? undefined}>
              {publishedDate}
            </time>
          )}
          {article.isFeatured && <span>{messages.common.featured}</span>}
        </div>
        <h2 className="text-2xl tracking-tight text-garda-ink">
          <a
            href={localizedPath(`/artikel/${article.slug}`, locale)}
            className="transition hover:text-garda-forest"
          >
            {article.title}
          </a>
        </h2>
        {article.description && (
          <p className="text-base leading-relaxed text-garda-ink-soft">
            {article.description}
          </p>
        )}
      </div>
    </article>
  )
}
