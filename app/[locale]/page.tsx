import { Hero } from '@/components/sections/hero'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { HowItWorks } from '@/components/sections/how-it-works'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { TrustBadges } from '@/components/sections/trust-badges'
import { Stats } from '@/components/sections/stats'
import { LeadCapture } from '@/components/sections/lead-capture'
import { PropertyFinder } from '@/components/sections/property-finder'
import { PropertyQuiz } from '@/components/sections/property-quiz'
import { PurchaseProcess } from '@/components/sections/purchase-process'
import { FAQ } from '@/components/sections/faq'
import { ScrollReveal } from '@/components/scroll-reveal'
import { getFeaturedProjects } from '@/lib/projects'

export default async function HomePage() {
  // Use our own database projects
  const featuredProjects = await getFeaturedProjects(6)

  return (
    <>
      <Hero />
      <ScrollReveal>
        <Stats />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <FeaturedProjects projects={featuredProjects} />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <LeadCapture />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <PropertyFinder />
      </ScrollReveal>
      <ScrollReveal delay={250}>
        <PropertyQuiz />
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <PurchaseProcess />
      </ScrollReveal>
      <ScrollReveal delay={350}>
        <WhyChooseUs />
      </ScrollReveal>
      <ScrollReveal delay={400}>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal delay={450}>
        <FAQ />
      </ScrollReveal>
      <ScrollReveal delay={500}>
        <TrustBadges />
      </ScrollReveal>
    </>
  )
}
