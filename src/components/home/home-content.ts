export type ActionItem = {
  title: string
  description: string
  ctaLabel?: string
}

export type SupporterItem = {
  name: string
  logoSrc: string
  alt: string
}

export const actionItems: ActionItem[] = [
  {
    title: 'Donasi Makanan',
    description: 'Methodical Data Collection and Meaningful Organization',
  },
  {
    title: 'Donasi Tunai',
    description: 'Methodical Data Collection and Meaningful Organization',
  },
  {
    title: 'Usul Penerima',
    description: 'Methodical Data Collection and Meaningful Organization',
    ctaLabel: 'MULAI',
  },
  {
    title: 'Jadi Relawan',
    description: 'Methodical Data Collection and Meaningful Organization',
  },
]

const supporterBase = {
  name: 'Badan Pangan Nasional',
  logoSrc: '/brands/badan-pangan-nasional.svg',
  alt: 'Badan Pangan Nasional',
}

export const supporterItems: SupporterItem[] = Array.from(
  { length: 16 },
  () => ({
    ...supporterBase,
  }),
)
