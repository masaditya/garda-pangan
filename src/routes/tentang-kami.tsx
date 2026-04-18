import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { AboutHeroSection } from '../components/about-hero-section'
import { AboutHistorySection } from '../components/about-history-section'
import { AboutVisionMissionSection } from '../components/about-vision-mission-section'
import { AboutTargetAudienceSection } from '../components/about-target-audience-section'
import { AboutLegalitySection } from '../components/about-legality-section'

export const fetchAboutData = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const res = await fetch('https://promising-freedom-82afaec97e.strapiapp.com/api/about?populate=*')
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    return null
  }
})

export const Route = createFileRoute('/tentang-kami')({
  loader: async () => await fetchAboutData(),
  component: TentangKami,
})

function TentangKami() {
  const payload = Route.useLoaderData()
  const data = payload?.data

  return (
    <main>
      <AboutHeroSection data={data} />
      <AboutHistorySection data={data} />
      <AboutVisionMissionSection data={data} />
      <AboutTargetAudienceSection />
      <AboutLegalitySection data={data} />
    </main>
  )
}
