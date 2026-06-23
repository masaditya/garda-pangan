import type { Locale } from './locales'

export type Messages = {
  meta: {
    defaultTitle: string
    defaultDescription: string
    titleSuffix: string
  }
  nav: {
    home: string
    program: string
    donate: string
    volunteer: string
    news: string
    contact: string
  }
  footer: {
    home: string
    knowledge: string
    about: string
    partners: string
    beneficiaries: string
    aboutUs: string
    terms: string
    privacy: string
    cookies: string
    legal: string
    recalls: string
    copyright: string
  }
  common: {
    search: string
    previous: string
    next: string
    share: string
    admin: string
    contactUs: string
    featured: string
    learnMore: string
    readMore: string
    linkCopied: string
    imageCourtesy: string
  }
  volunteer: {
    titleLine1: string
    titleLine2: string
    description: string
    cta: string
    pageTitle: string
    pageDescription: string
  }
  support: {
    titleLine1: string
    titleLine2: string
    description: string
    embedPlaceholder: string
    pageTitle: string
    pageDescription: string
  }
  contact: {
    heroTitleLine1: string
    heroTitleLine2: string
    heroDescription: string
    illustrationLabel: string
    pageTitle: string
    pageDescription: string
    categories: Array<{
      title: string
      description: string
    }>
  }
  program: {
    heroTitle: string
    heroDescription: string
    moreLabel: string
    partnerCta: string
    pageTitle: string
    pageDescription: string
  }
  knowledge: {
    heroTitle: string
    heroDescription: string
    searchPlaceholder: string
    categoryFilterLabel: string
    filterAllLabel: string
    sortNewestLabel: string
    sortOldestLabel: string
    emptyListMessage: string
    pageDescription: string
  }
  event: {
    heroTitle: string
    heroDescription: string
    searchPlaceholder: string
    yearFilter: string
    allYears: string
    watermark: string
    defaultTag: string
    shareLabel: string
    emptyTitle: string
    emptyDescription: string
    pageDescription: string
  }
  merchandise: {
    heroTitle: string
    heroDescription: string
    filterTitle: string
    appliedCategoriesLabel: string
    categoryListLabel: string
    emptyCategories: string
    emptyProducts: string
    pageTitle: string
    pageDescription: string
  }
  penerima: {
    pageTitle: string
    pageDescription: string
    watchTestimonial: string
  }
  artikel: {
    heroTitle: string
    heroDescription: string
    heroSubtitle: string
    emptyState: string
    backToArticles: string
    pageTitle: string
    pageDescription: string
  }
  about: {
    pageTitle: string
    pageDescription: string
    targetAudienceTitle: string
  }
  mitra: {
    pageTitle: string
    pageDescription: string
  }
}

const id: Messages = {
  meta: {
    defaultTitle: 'Garda Pangan',
    defaultDescription:
      'Garda Pangan menyelamatkan surplus makanan dan menghubungkannya dengan masyarakat yang membutuhkan.',
    titleSuffix: 'Garda Pangan',
  },
  nav: {
    home: 'Beranda',
    program: 'Program',
    donate: 'Donasi',
    volunteer: 'Relawan',
    news: 'Berita',
    contact: 'Kontak',
  },
  footer: {
    home: 'Beranda',
    knowledge: 'Knowledge',
    about: 'About',
    partners: 'Mitra',
    beneficiaries: 'Penerima',
    aboutUs: 'Tentang Kami',
    terms: 'Terms',
    privacy: 'Privacy',
    cookies: 'Cookies',
    legal: 'Legal',
    recalls: 'Recalls',
    copyright: 'Copyright By gardapangan.org',
  },
  common: {
    search: 'Cari',
    previous: 'Sebelumnya',
    next: 'Selanjutnya',
    share: 'Bagikan',
    admin: 'Admin',
    contactUs: 'Hubungi Kami',
    featured: 'Unggulan',
    learnMore: 'Pelajari Selengkapnya',
    readMore: 'Selengkapnya',
    linkCopied: 'Tautan disalin ke clipboard!',
    imageCourtesy: 'Image courtesy of Garda Pangan',
  },
  volunteer: {
    titleLine1: 'Jadi Pahlawan',
    titleLine2: 'Pangan Nyata',
    description:
      'Dapatkan pengalaman berharga turun tangan langsung menjadi Food Heroes Garda Pangan untuk mengantarkan makanan kepada masyarakat pra-sejahtera di Surabaya.',
    cta: 'Daftar Sekarang',
    pageTitle: 'Jadi Relawan - Garda Pangan',
    pageDescription:
      'Bergabunglah menjadi Food Heroes Garda Pangan dan bantu kami menyelamatkan makanan untuk mereka yang membutuhkan.',
  },
  support: {
    titleLine1: 'Dukung',
    titleLine2: 'Kami',
    description:
      'Dukung gerakan kami dengan berdonasi dana operasional, atau menjadi donatur rutin',
    embedPlaceholder: '< embed code dari midtrans/ >',
    pageTitle: 'Dukung Kami - Garda Pangan',
    pageDescription:
      'Dukung gerakan Garda Pangan melalui donasi dana operasional atau menjadi donatur rutin.',
  },
  contact: {
    heroTitleLine1: 'Hubungi',
    heroTitleLine2: 'Kami',
    heroDescription:
      'Ada pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda. Pilih kategori yang sesuai dengan kebutuhan Anda di bawah ini.',
    illustrationLabel: 'Ilustrasi',
    pageTitle: 'Hubungi Kami - Garda Pangan',
    pageDescription:
      'Hubungi tim Garda Pangan untuk donasi, kolaborasi, kunjungan, dan kebutuhan lainnya.',
    categories: [
      {
        title: 'DUKUNG KAMI DENGAN DONASI DANA',
        description:
          'Dukung operasional kami agar kami bisa menyelamatkan makanan lebih banyak lagi untuk saudara kita yang membutuhkan.',
      },
      {
        title: 'BERGABUNG MENJADI KLIEN PENGOLAHAN SAMPAH ORGANIK',
        description:
          'Kami mengolah sampah organik dari bisnis kuliner Anda menjadi produk bernilai guna dan mencegahnya berakhir di TPA.',
      },
      {
        title: 'KUNJUNGAN',
        description:
          'Ingin melihat langsung bagaimana kami bekerja? Kami menerima kunjungan untuk edukasi dan berbagi pengalaman.',
      },
      {
        title: 'BOOK JADWAL FOOD RESCUE',
        description:
          'Punya makanan berlebih dari acara Anda? Hubungi kami untuk menjemput dan mendistribusikannya.',
      },
      {
        title: 'KOLABORASI CSR',
        description:
          'Wujudkan dampak sosial perusahaan Anda melalui program kolaborasi yang berkelanjutan bersama Garda Pangan.',
      },
      {
        title: 'PERMINTAAN SPEAKER/ JURI/NARASUMBER/ KULIAH TAMU',
        description:
          'Kami senang berbagi pengetahuan tentang isu food loss dan waste di berbagai forum edukatif.',
      },
      {
        title: 'PERMINTAAN LIPUTAN MEDIA',
        description:
          'Untuk keperluan peliputan, wawancara, atau informasi seputar isu ketahanan pangan dan food waste.',
      },
      {
        title: 'PERMINTAAN SKRIPSI/ TESIS/RISET',
        description:
          'Kami mendukung penelitian akademis yang sejalan dengan misi kami dalam mengurangi sampah makanan.',
      },
      {
        title: 'PERMOHONAN MAGANG',
        description:
          'Dapatkan pengalaman berharga dengan bergabung sebagai bagian dari tim Garda Pangan.',
      },
      {
        title: 'PERMINTAAN PERHITUNGAN SUSUT, SISA, DAN SAMPAH MAKANAN',
        description:
          'Kami membantu bisnis kuliner Anda menghitung dan menganalisis potensi kerugian dari sampah makanan.',
      },
      {
        title: 'PERMINTAAN KEBUTUHAN LAINNYA',
        description:
          'Punya ide kolaborasi lain atau pertanyaan umum? Silakan hubungi kami di sini.',
      },
    ],
  },
  program: {
    heroTitle: 'Program <br /> Kami',
    heroDescription:
      'Garda Pangan bermula dari pengalaman salah seorang founder, Dedhy Trunoyudho yang berlatar belakang pengusaha katering pernikahan.',
    moreLabel: 'Selengkapnya',
    partnerCta: 'Jadi Mitra',
    pageTitle: 'Program Kami - Garda Pangan',
    pageDescription:
      'Program-program Garda Pangan dalam menyelamatkan makanan berlebih.',
  },
  knowledge: {
    heroTitle: 'Knowledge & Insights',
    heroDescription: 'Wawasan dan cerita dari Garda Pangan',
    searchPlaceholder: 'Cari Knowledge & Insights',
    categoryFilterLabel: 'Kategori',
    filterAllLabel: 'Tampilkan Semua',
    sortNewestLabel: 'Terbaru',
    sortOldestLabel: 'Terlama',
    emptyListMessage: 'Tidak ada artikel yang cocok dengan filter Anda.',
    pageDescription: 'Knowledge and Insights from Garda Pangan',
  },
  event: {
    heroTitle: 'Event Kami',
    heroDescription:
      'Garda Pangan bermula dari pergerakan komunitas kecil yang berkembang jadi sesuatu yang memberikan manfaat lebih.',
    searchPlaceholder: 'Cari nama event',
    yearFilter: 'Filter Tahun',
    allYears: 'Semua Tahun',
    watermark: 'EVENTS',
    defaultTag: 'Event',
    shareLabel: 'Bagikan Event',
    emptyTitle: 'Tidak ada event ditemukan',
    emptyDescription:
      'Silakan coba kata kunci atau filter tahun yang berbeda.',
    pageDescription: 'Event dan kegiatan Garda Pangan',
  },
  merchandise: {
    heroTitle: 'Merchandise',
    heroDescription:
      'Yuk jadi bagian dari gaya hidup bebas sampah, sekaligus membantu kami mengirimkan semakin banyak makanan untuk masyarakat pra-sejahtera di kantong-kantong kemiskinan.',
    filterTitle: 'Opsi Filter',
    appliedCategoriesLabel: 'Kategori yang diterapkan',
    categoryListLabel: 'Daftar Kategori',
    emptyCategories: 'Belum ada',
    emptyProducts: 'Belum ada merchandise untuk kategori yang dipilih.',
    pageTitle: 'Merchandise | Garda Pangan',
    pageDescription:
      'Dukung gerakan Garda Pangan melalui merchandise resmi.',
  },
  penerima: {
    pageTitle: 'Penerima Bantuan - Garda Pangan',
    pageDescription:
      'Penerima manfaat utama dari distribusi makanan Garda Pangan.',
    watchTestimonial: 'Tonton Testimoni',
  },
  artikel: {
    heroTitle: 'Artikel',
    heroDescription: 'Cerita Penyelamatan Makanan',
    heroSubtitle: 'Baca kabar terbaru, panduan, dan cerita dampak dari Garda Pangan.',
    emptyState: 'Belum ada artikel yang dipublikasikan.',
    backToArticles: 'Kembali ke Artikel',
    pageTitle: 'Artikel - Garda Pangan',
    pageDescription: 'Cerita penyelamatan makanan dari Garda Pangan',
  },
  about: {
    pageTitle: 'Tentang Kami - Garda Pangan',
    pageDescription: 'Kenali visi, misi, dan perjalanan Garda Pangan.',
    targetAudienceTitle: 'Target Donatur/Penerima',
  },
  mitra: {
    pageTitle: 'Mitra - Garda Pangan',
    pageDescription:
      'Bergabung sebagai mitra Garda Pangan dalam menyelamatkan makanan.',
  },
}

const en: Messages = {
  meta: {
    defaultTitle: 'Garda Pangan',
    defaultDescription:
      'Garda Pangan rescues surplus food and connects it with communities in need.',
    titleSuffix: 'Garda Pangan',
  },
  nav: {
    home: 'Home',
    program: 'Programs',
    donate: 'Donate',
    volunteer: 'Volunteer',
    news: 'News',
    contact: 'Contact',
  },
  footer: {
    home: 'Home',
    knowledge: 'Knowledge',
    about: 'About',
    partners: 'Partners',
    beneficiaries: 'Beneficiaries',
    aboutUs: 'About Us',
    terms: 'Terms',
    privacy: 'Privacy',
    cookies: 'Cookies',
    legal: 'Legal',
    recalls: 'Recalls',
    copyright: 'Copyright By gardapangan.org',
  },
  common: {
    search: 'Search',
    previous: 'Previous',
    next: 'Next',
    share: 'Share',
    admin: 'Admin',
    contactUs: 'Contact Us',
    featured: 'Featured',
    learnMore: 'Learn More',
    readMore: 'Read More',
    linkCopied: 'Link copied to clipboard!',
    imageCourtesy: 'Image courtesy of Garda Pangan',
  },
  volunteer: {
    titleLine1: 'Become a Real',
    titleLine2: 'Food Hero',
    description:
      'Gain valuable hands-on experience as a Garda Pangan Food Hero delivering meals to underserved communities in Surabaya.',
    cta: 'Register Now',
    pageTitle: 'Volunteer - Garda Pangan',
    pageDescription:
      'Join Garda Pangan as a Food Hero and help us rescue food for those in need.',
  },
  support: {
    titleLine1: 'Support',
    titleLine2: 'Us',
    description:
      'Support our movement through operational donations or become a recurring donor.',
    embedPlaceholder: '< embed code from midtrans/ >',
    pageTitle: 'Support Us - Garda Pangan',
    pageDescription:
      'Support Garda Pangan through operational donations or recurring contributions.',
  },
  contact: {
    heroTitleLine1: 'Contact',
    heroTitleLine2: 'Us',
    heroDescription:
      'Have a question or want to collaborate? We would love to hear from you. Choose the category that fits your needs below.',
    illustrationLabel: 'Illustration',
    pageTitle: 'Contact Us - Garda Pangan',
    pageDescription:
      'Contact the Garda Pangan team for donations, collaborations, visits, and more.',
    categories: [
      {
        title: 'SUPPORT US WITH A DONATION',
        description:
          'Support our operations so we can rescue more food for people in need.',
      },
      {
        title: 'JOIN AS AN ORGANIC WASTE PROCESSING CLIENT',
        description:
          'We process organic waste from your food business into valuable products and keep it out of landfills.',
      },
      {
        title: 'VISITS',
        description:
          'Want to see how we work? We welcome visits for education and shared learning.',
      },
      {
        title: 'BOOK A FOOD RESCUE SCHEDULE',
        description:
          'Have surplus food from your event? Contact us to pick it up and distribute it.',
      },
      {
        title: 'CSR COLLABORATION',
        description:
          'Create your company’s social impact through sustainable collaboration programs with Garda Pangan.',
      },
      {
        title: 'SPEAKER / JUDGE / SPEAKER / GUEST LECTURE REQUEST',
        description:
          'We are happy to share knowledge about food loss and waste issues in various educational forums.',
      },
      {
        title: 'MEDIA COVERAGE REQUEST',
        description:
          'For coverage, interviews, or information about food security and food waste issues.',
      },
      {
        title: 'THESIS / RESEARCH REQUEST',
        description:
          'We support academic research aligned with our mission to reduce food waste.',
      },
      {
        title: 'INTERNSHIP APPLICATION',
        description:
          'Gain valuable experience by joining the Garda Pangan team.',
      },
      {
        title: 'FOOD LOSS, WASTE, AND SCRAP CALCULATION REQUEST',
        description:
          'We help your food business calculate and analyze potential losses from food waste.',
      },
      {
        title: 'OTHER REQUESTS',
        description:
          'Have another collaboration idea or general question? Contact us here.',
      },
    ],
  },
  program: {
    heroTitle: 'Our <br /> Programs',
    heroDescription:
      'Garda Pangan began from the experience of one founder, Dedhy Trunoyudho, who came from the wedding catering business.',
    moreLabel: 'Learn More',
    partnerCta: 'Become a Partner',
    pageTitle: 'Our Programs - Garda Pangan',
    pageDescription:
      'Garda Pangan programs for rescuing surplus food.',
  },
  knowledge: {
    heroTitle: 'Knowledge & Insights',
    heroDescription: 'Insights and stories from Garda Pangan',
    searchPlaceholder: 'Search Knowledge & Insights',
    categoryFilterLabel: 'Category',
    filterAllLabel: 'Show All',
    sortNewestLabel: 'Newest',
    sortOldestLabel: 'Oldest',
    emptyListMessage: 'No articles match your filters.',
    pageDescription: 'Knowledge and Insights from Garda Pangan',
  },
  event: {
    heroTitle: 'Our Events',
    heroDescription:
      'Garda Pangan started as a small community movement that grew into something with greater impact.',
    searchPlaceholder: 'Search event name',
    yearFilter: 'Filter Year',
    allYears: 'All Years',
    watermark: 'EVENTS',
    defaultTag: 'Event',
    shareLabel: 'Share Event',
    emptyTitle: 'No events found',
    emptyDescription: 'Try a different keyword or year filter.',
    pageDescription: 'Events and activities from Garda Pangan',
  },
  merchandise: {
    heroTitle: 'Merchandise',
    heroDescription:
      'Join a zero-waste lifestyle while helping us deliver more food to underserved communities in pockets of poverty.',
    filterTitle: 'Filter Options',
    appliedCategoriesLabel: 'Applied categories',
    categoryListLabel: 'Category list',
    emptyCategories: 'None yet',
    emptyProducts: 'No merchandise found for the selected categories.',
    pageTitle: 'Merchandise | Garda Pangan',
    pageDescription: 'Support the Garda Pangan movement through official merchandise.',
  },
  penerima: {
    pageTitle: 'Beneficiaries - Garda Pangan',
    pageDescription:
      'Primary beneficiaries of Garda Pangan food distribution.',
    watchTestimonial: 'Watch Testimonials',
  },
  artikel: {
    heroTitle: 'Articles',
    heroDescription: 'Food Rescue Stories',
    heroSubtitle: 'Read the latest news, guides, and impact stories from Garda Pangan.',
    emptyState: 'No published articles yet.',
    backToArticles: 'Back to Articles',
    pageTitle: 'Articles - Garda Pangan',
    pageDescription: 'Food rescue stories from Garda Pangan',
  },
  about: {
    pageTitle: 'About Us - Garda Pangan',
    pageDescription: 'Learn about Garda Pangan’s vision, mission, and journey.',
    targetAudienceTitle: 'Donor/Beneficiary Targets',
  },
  mitra: {
    pageTitle: 'Partners - Garda Pangan',
    pageDescription:
      'Join Garda Pangan as a partner in rescuing surplus food.',
  },
}

const messagesByLocale: Record<Locale, Messages> = { id, en }

export function getMessages(locale: Locale) {
  return messagesByLocale[locale]
}

export function getLangStaticPaths() {
  return [{ params: { lang: 'id' } }, { params: { lang: 'en' } }]
}
