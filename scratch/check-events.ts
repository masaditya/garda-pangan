import { fetchAllStrapiPages } from '../src/lib/strapi/client'

async function check() {
  const events = await fetchAllStrapiPages<any>('events', { populate: '*' })
  console.log("Events from 'events':", events.map(e => e.slug))
  
  const events2 = await fetchAllStrapiPages<any>('api/events', { populate: '*' })
  console.log("Events from 'api/events':", events2.map(e => e.slug))
}

check().catch(console.error)
