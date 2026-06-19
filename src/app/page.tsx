import { CursorGlow } from "@/components/ui/CursorGlow"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { CurrentActivity } from "@/components/sections/CurrentActivity"
import { Timeline } from "@/components/sections/Timeline"
import { EdmoExperience } from "@/components/sections/EdmoExperience"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Personal } from "@/components/sections/Personal"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CursorGlow />
        <Hero />
        <About />
        <CurrentActivity />
        <Timeline />
        <EdmoExperience />
        <Projects />
        <Certifications />
        <Personal />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
