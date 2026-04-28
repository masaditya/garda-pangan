import { getStrapiApiToken, getStrapiBaseUrl } from './config'

import type {
  StrapiCollectionResponse,
  StrapiQueryValue,
  StrapiSingleResponse,
} from './types'

type Fetcher = typeof fetch

type FetchOptions = {
  fetcher?: Fetcher
}

type FetchAllPagesOptions = FetchOptions & {
  pageSize?: number
}

function appendQueryParam(
  params: URLSearchParams,
  key: string,
  value: StrapiQueryValue,
) {
  if (value === undefined || value === null) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendQueryParam(params, `${key}[${index}]`, item)
    })
    return
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([childKey, childValue]) => {
      appendQueryParam(params, `${key}[${childKey}]`, childValue)
    })
    return
  }

  params.append(key, String(value))
}

export function buildStrapiUrl(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(normalizedPath, getStrapiBaseUrl())

  Object.entries(query).forEach(([key, value]) => {
    appendQueryParam(url.searchParams, key, value)
  })

  return url
}

export function normalizeStrapiMediaUrl(url: string | null | undefined) {
  if (!url) {
    return null
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return new URL(url, getStrapiBaseUrl()).toString()
}

export async function strapiFetch<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchOptions = {},
) {
  const apiToken = getStrapiApiToken()
  const headers = new Headers()

  if (apiToken) {
    headers.set('Authorization', `Bearer ${apiToken}`)
  }

  const response = await (options.fetcher ?? fetch)(
    buildStrapiUrl(path, query),
    {
      headers,
    },
  )

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status} ${response.statusText}`,
    )
  }

  return (await response.json()) as T
}

export async function fetchStrapiSingle<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchOptions = {},
) {
  return strapiFetch<StrapiSingleResponse<T>>(path, query, options)
}

export async function fetchAllStrapiPages<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchAllPagesOptions = {},
) {
  const pageSize = options.pageSize ?? 100
  const results: T[] = []
  let page = 1
  let pageCount = 1

  do {
    const response = await strapiFetch<StrapiCollectionResponse<T>>(
      path,
      {
        ...query,
        pagination: {
          page,
          pageSize,
        },
      },
      options,
    )

    results.push(...response.data)
    pageCount = response.meta.pagination.pageCount
    page += 1
  } while (page <= pageCount)

  return results
}
