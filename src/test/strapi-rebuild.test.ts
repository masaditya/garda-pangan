import { describe, expect, test, vi } from 'vitest'

import { handler } from '../../netlify/functions/strapi-rebuild'

describe('strapi-rebuild function', () => {
  test('rejects requests without the shared secret', async () => {
    const response = await handler(
      new Request('https://example.com/.netlify/functions/strapi-rebuild', {
        method: 'POST',
      }),
      {
        buildHookUrl: 'https://api.netlify.com/build_hooks/example',
        secret: 'secret',
      },
    )

    expect(response.status).toBe(401)
  })

  test('ignores unrelated Strapi entry events', async () => {
    const fetcher = vi.fn<typeof fetch>()
    const response = await handler(
      new Request('https://example.com/.netlify/functions/strapi-rebuild', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer secret',
          'X-Strapi-Event': 'entry.update',
        },
        body: JSON.stringify({ event: 'entry.update', model: 'testimonial' }),
      }),
      {
        buildHookUrl: 'https://api.netlify.com/build_hooks/example',
        fetcher,
        secret: 'secret',
      },
    )

    expect(response.status).toBe(200)
    expect(fetcher).not.toHaveBeenCalled()
  })

  test('triggers Netlify build hook for article publish events', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null))
    const response = await handler(
      new Request('https://example.com/.netlify/functions/strapi-rebuild', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer secret',
          'X-Strapi-Event': 'entry.publish',
        },
        body: JSON.stringify({ event: 'entry.publish', model: 'article' }),
      }),
      {
        buildHookUrl: 'https://api.netlify.com/build_hooks/example',
        fetcher,
        secret: 'secret',
      },
    )

    expect(response.status).toBe(202)
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.netlify.com/build_hooks/example',
      expect.objectContaining({ method: 'POST' }),
    )
  })
})
