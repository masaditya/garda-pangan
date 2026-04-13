import ChangeAgentSection from './ChangeAgentSection'
import SupportersSection from './SupportersSection'

export default function HomePage() {
  return (
    <main className="mx-auto w-[min(100%,calc(100%-0.5rem))] overflow-clip bg-[#fffefc] pt-6 pb-16 md:w-[min(1440px,calc(100%-1rem))] md:pt-[clamp(2rem,4vw,3rem)] md:pb-[clamp(4rem,6vw,5rem)]">
      <ChangeAgentSection />
      <SupportersSection />
    </main>
  )
}
