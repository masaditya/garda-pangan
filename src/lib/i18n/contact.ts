

const illustrationUrls = [
  '/illustrations/donation.svg',
  '/illustrations/organic.svg',
  '/illustrations/visit.svg',
  '/illustrations/rescue.svg',
  '/illustrations/csr.svg',
  '/illustrations/speaker.svg',
  '/illustrations/media.svg',
  '/illustrations/research.svg',
  '/illustrations/intern.svg',
  '/illustrations/audit.svg',
  '/illustrations/other.svg',
]

export type ContactCategory = {
  id: string
  title: string
  description: string
  buttonLabel: string
  buttonLink: string
  illustrationUrl: string
  thumbnail?: { url: string } | null
}

export function buildContactCategories(messages: {
  common: { contactUs: string }
  contact: { categories: Array<{ title: string; description: string; thumbnail?: { url: string } }> }
}): ContactCategory[] {
  return messages.contact.categories.map((category, index) => ({
    id: String(index + 1),
    title: category.title,
    description: category.description,
    buttonLabel: messages.common.contactUs,
    buttonLink: '#',
    illustrationUrl: illustrationUrls[index] ?? '/illustrations/other.svg',
    thumbnail: category.thumbnail,
  }))
}
