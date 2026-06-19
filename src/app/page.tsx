import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import History from '@/components/sections/History'
import Works from '@/components/sections/Works'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <History />
      <Works />
      <Skills />
      <Contact />
    </main>
  )
}
