import { createFileRoute } from '@tanstack/react-router'
import { AgentChangeSection } from '../components/agent-change-section'
import { DidYouKnowSection } from '../components/did-you-know-section'
import { FeaturedBySection } from '../components/featured-by-section'
import { HeroSection } from '../components/hero-section'
import { ImpactSection } from '../components/impact-section'
import { SupportersCollaboratorsSection } from '../components/supporters-collaborators-section'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="garda-main">
      <HeroSection />
      <DidYouKnowSection />
      <ImpactSection />
      <FeaturedBySection />
      <AgentChangeSection />
      <SupportersCollaboratorsSection />
    </main>
  )
}
