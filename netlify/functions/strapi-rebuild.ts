type HandlerOptions = {
  buildHookUrl?: string
  fetcher?: typeof fetch
  secret?: string
}

type StrapiWebhookPayload = {
  event?: string
  model?: string
}

const REBUILD_ENTRY_EVENTS = new Set([
  'entry.publish',
  'entry.update',
  'entry.delete',
  'entry.unpublish',
])

const REBUILD_MODELS = new Set([
  'article',
  'about',
  'mitra',
  'merchandise-page',
])
const REBUILD_MEDIA_EVENTS = new Set(['media.update', 'media.delete'])

function isAuthorized(request: Request, secret?: string) {
  if (!secret) {
    return false
  }

  return request.headers.get('Authorization') === `Bearer ${secret}`
}

function shouldTriggerRebuild(
  event: string | null,
  payload: StrapiWebhookPayload,
) {
  const webhookEvent = payload.event || event || ''

  if (REBUILD_MEDIA_EVENTS.has(webhookEvent)) {
    return true
  }

  if (!REBUILD_ENTRY_EVENTS.has(webhookEvent)) {
    return false
  }

  return REBUILD_MODELS.has(payload.model || '')
}

export async function handler(request: Request, options: HandlerOptions = {}) {
  if (request.method !== 'POST') {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }

  const secret = options.secret ?? Netlify.env.get('STRAPI_WEBHOOK_SECRET')
  if (!isAuthorized(request, secret)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const payload = (await request
    .json()
    .catch(() => ({}))) as StrapiWebhookPayload
  const strapiEvent = request.headers.get('X-Strapi-Event')

  if (!shouldTriggerRebuild(strapiEvent, payload)) {
    return Response.json({ message: 'Ignored Strapi event' }, { status: 200 })
  }

  const buildHookUrl =
    options.buildHookUrl ?? Netlify.env.get('NETLIFY_BUILD_HOOK_URL')

  if (!buildHookUrl) {
    return Response.json(
      { message: 'Build hook URL is not configured' },
      { status: 500 },
    )
  }

  const response = await (options.fetcher ?? fetch)(buildHookUrl, {
    method: 'POST',
    body: JSON.stringify({
      trigger: 'strapi-webhook',
      event: payload.event || strapiEvent,
      model: payload.model,
    }),
  })

  if (!response.ok) {
    return Response.json(
      { message: 'Failed to trigger Netlify build' },
      { status: 500 },
    )
  }

  return Response.json({ message: 'Build triggered' }, { status: 202 })
}

export default handler
