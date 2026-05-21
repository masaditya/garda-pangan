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

function isRetryableStrapiStatus(status: number) {
  return status === 502 || status === 503 || status === 504
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function strapiFetch<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchOptions = {},
) {
  const apiToken = getStrapiApiToken()
  const headers = new Headers()
  const requestUrl = buildStrapiUrl(path, query).toString()
  const maxAttempts = 3

  if (apiToken) {
    headers.set('Authorization', `Bearer ${apiToken}`)
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await (options.fetcher ?? fetch)(requestUrl, {
      headers,
    })

    if (response.ok) {
      return (await response.json()) as T
    }

    let details = ''

    try {
      const errorBody = await response.text()
      if (errorBody) {
        details = `: ${errorBody.slice(0, 240)}`
      }
    } catch {
      // Ignore parse errors for the error body.
    }

    const shouldRetry =
      isRetryableStrapiStatus(response.status) && attempt < maxAttempts

    if (!shouldRetry) {
      throw new Error(
        `Strapi request failed: ${response.status} ${response.statusText} (${requestUrl})${details}`,
      )
    }

    await wait(500 * attempt)
  }

  throw new Error(`Strapi request failed after retries (${requestUrl})`)
}

export async function fetchStrapiSingle<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchOptions = {},
) {
  return strapiFetch<StrapiSingleResponse<T>>(path, query, options)
}

export async function fetchStrapiSingleSafe<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchOptions = {},
) {
  try {
    return await fetchStrapiSingle<T>(path, query, options)
  } catch (error) {
    console.warn(`Strapi fetch skipped for ${path}:`, error)
    return { data: null } satisfies StrapiSingleResponse<T>
  }
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

export async function fetchAllStrapiPagesSafe<T>(
  path: string,
  query: Record<string, StrapiQueryValue> = {},
  options: FetchAllPagesOptions = {},
) {
  try {
    return await fetchAllStrapiPages<T>(path, query, options)
  } catch (error) {
    console.warn(`Strapi fetch skipped for ${path}:`, error)
    return []
  }
}
