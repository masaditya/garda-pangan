import { createFileRoute } from '@tanstack/react-router'
import { VolunteerHeroSection } from '../components/volunteer-hero-section'

export const Route = createFileRoute('/relawan')({
  component: RelawanPage,
})

function RelawanPage() {
  return (
    <main>
      <VolunteerHeroSection />
    </main>
  )
}
