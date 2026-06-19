'use client'

import { useCallback, useEffect, useState } from 'react'

const navItems = [
  { label: '안녕하세요!', target: 'hero' },
  { label: '접니다.', target: 'about' },
  { label: '저구요,', target: 'history' },
  { label: '저에요.', target: 'works' },
  { label: '살펴보고', target: 'skills' },
  { label: '연락주세요.', target: 'contact' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero')

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {

    const sections = navItems
    .map(({ target }) => document.getElementById(target))
    .filter((el): el is HTMLElement => el !== null)

    console.log('found sections:', sections.map(s => s.id)) 

    
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1
      let current = navItems[0].target // 기본값: hero

      for (const { target } of navItems) {
        const el = document.getElementById(target)
        if (!el) continue

        const top = el.getBoundingClientRect().top
        if (top <= threshold) {
          current = target
        }
      }

      setActiveSection(current)
    }

    handleScroll() // 초기 진입 시 1회 실행
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  
  return (
    <header className="hidden sm:flex fixed top-0 left-0 right-0 z-50 h-[80px] items-center justify-evenly">

      <div className="absolute inset-0 bg-white/26 backdrop-blur-sm -z-10"></div>

      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => scrollTo(item.target)}
            className={`text-lg transition-all text-black font-bold cursor-pointer ${
              activeSection === item.target
                ? 'opacity-100'
                : 'opacity-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}