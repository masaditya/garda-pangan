export type StrapiPagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type StrapiCollectionResponse<T> = {
  data: T[]
  meta: {
    pagination: StrapiPagination
  }
}

export type StrapiSingleResponse<T> = {
  data: T | null
  meta?: Record<string, unknown>
}

export type StrapiEntry = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  locale?: string
}

export type StrapiMediaFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes?: number
}

export type StrapiMedia = StrapiEntry & {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats?: {
    large?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    small?: StrapiMediaFormat
    thumbnail?: StrapiMediaFormat
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata?: unknown
}

export type StrapiQueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | StrapiQueryValue[]
  | { [key: string]: StrapiQueryValue }
