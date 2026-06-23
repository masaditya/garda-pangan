import type { Locale } from './locales'
import { localizedPath } from './routing'
import type { Messages } from './messages'
import type { NavItem } from '#/lib/nav-active'

export function getHeaderNavItems(locale: Locale, messages: Messages): NavItem[] {
  return [
    { href: localizedPath('/', locale), label: messages.nav.home },
    { href: localizedPath('/program', locale), label: messages.nav.program },
    { href: localizedPath('/support', locale), label: messages.nav.donate },
    { href: localizedPath('/relawan', locale), label: messages.nav.volunteer },
    {
      href: localizedPath('/knowledge', locale),
      label: messages.nav.news,
      matchPaths: [
        localizedPath('/knowledge', locale),
        localizedPath('/artikel', locale),
      ],
    },
    { href: localizedPath('/kontak', locale), label: messages.nav.contact },
  ]
}

export function getFooterNavItems(locale: Locale, messages: Messages): NavItem[] {
  return [
    { href: localizedPath('/', locale), label: messages.footer.home },
    {
      href: localizedPath('/knowledge', locale),
      label: messages.footer.knowledge,
      matchPaths: [
        localizedPath('/knowledge', locale),
        localizedPath('/artikel', locale),
      ],
    },
    {
      href: localizedPath('/tentang-kami', locale),
      label: messages.footer.about,
    },
    { href: localizedPath('/mitra', locale), label: messages.footer.partners },
    {
      href: localizedPath('/penerima', locale),
      label: messages.footer.beneficiaries,
    },
  ]
}

export function getFooterSecondaryLinks(locale: Locale, messages: Messages) {
  return [
    {
      label: messages.footer.aboutUs,
      href: localizedPath('/tentang-kami', locale),
    },
    { label: messages.footer.terms, href: '#' },
    { label: messages.footer.privacy, href: '#' },
    { label: messages.footer.cookies, href: '#' },
    { label: messages.footer.legal, href: '#' },
    { label: messages.footer.recalls, href: '#' },
  ]
}
