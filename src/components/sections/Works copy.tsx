'use client'

import { useState, useRef, useEffect } from 'react'

const works = [
  // {
  //   minTitle: 'stock · PERSONAL',
  //   title : '주식',
  //   duration: '2026.05 ~ 2023.06',
  //   role: 'UI Development (100%)',
  //   tech: 'VSCode, Nextjs, Tailwind, TypeScript, Git',
  //   link: '#',
  // },{
  //   minTitle: 'forecast · PERSONAL',
  //   title : '날씨',
  //   duration: '2026.05 ~ 2023.06',
  //   role: 'UI Development (100%)',
  //   tech: 'VSCode, React, Styled-component, TypeScript, Git',
  //   link: '#',
  // },
  {
    minTitle: 'Wealthguide',
    title : '웰스가이드',
    duration: '2026.01~2023.03 / 3개월',
    role: 'UI Development (50%)',
    tech: 'VS Code, HTML5, CSS3, JavaScript, Git',
    link: 'https://wealthguide.co.kr',
  },{
    minTitle: 'Jeongwon E-shop.',
    title : '정원e샵',
    duration: '2018.12 ~ 2019.12',
    role: 'UI Development (운영·유지보수 100%)',
    tech: 'VS Code, HTML5, CSS3, JavaScript',
    link: 'https://www.jungoneshop.com/',
  },{
    minTitle: 'Shin Ansan Univ.',
    title : '신안산대학교',
    duration: '2018.06 ~ 2018.12',
    role: 'UI Development (50%)',
    tech: 'VS Code, HTML, CSS, JavaScript',
    link: 'https://www.sau.ac.kr',
  },{
    minTitle: 'Sejong Cyber Univ.',
    title : '세종사이버대학교',
    duration: '2018.06 ~ 2018.12',
    role: 'UI Development (50%)',
    tech: 'VS Code, HTML, CSS, JavaScript',
    link: 'https://home.sjcu.ac.kr/ko/index.do',
  },{
    minTitle: 'Sunstar G.U.M',
    title : 'G.U.M',
    duration: '2017.10 ~ 2017.11',
    role: 'UI Development (80%)',
    tech: 'Cafe24, HTML, CSS, JS',
    link: 'https://sunstargumshop.co.kr',
  },{
    minTitle: 'Hamo',
    title : '하모키친',
    duration: '2017.09 ~ 2017.10',
    role: 'UI Development (100%)',
    tech: 'VS Code, HTML, CSS, JavaScript',
    link: 'http://hamo-kitchen.com',
  },{
    minTitle: 'POPEYES',
    title : '파파이스',
    duration: '2015.06 ~ 2017.06',
    role: 'UI Development (운영·유지보수 100%)' ,
    tech: 'VS Code, HTML5, CSS3, JavaScript',
    link: 'https://www.popeyes.co.kr',
  },{
    minTitle: 'NENE CHICKEN',
    title : '네네치킨 2017',
    duration: '2015.01 ~ 2017.06',
    role: 'UI Development (구축 / 운영·유지보수 100%)',
    tech: 'EditPlus, Eclipse, SVN, HTML, CSS, JavaScript',
    link: 'https://nenechicken.com',
  },
]

export default function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [autoIndex, setAutoIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() 
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 자동 순환: hover도 없고 active도 없을 때만
  useEffect(() => {
    if (hoveredIndex !== null || activeIndex !== null) return

    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % works.length)
    }, 800)

    return () => clearInterval(interval)
  }, [hoveredIndex, activeIndex])

  const getWidth = (i: number): React.CSSProperties => {
    const isMd = window.innerWidth >= 768  // md 기준

    const sizes = isMd
      ? { focus: 520, near1: 460, near2: 400, far: 420 }
      : { focus: 280, near1: 240, near2: 200, far: 210 }

    if (activeIndex !== null) {
      if (i === activeIndex) return { width: sizes.focus }
      const diff = Math.abs(i - activeIndex)
      if (diff === 1) return { width: sizes.near1 }
      if (diff === 2) return { width: sizes.near2 }
      return { width: sizes.far }
    }

    const targetIndex = hoveredIndex !== null ? hoveredIndex : autoIndex
    const diff = Math.abs(i - targetIndex)
    if (diff === 0) return { width: sizes.focus }
    if (diff === 1) return { width: sizes.near1 }
    if (diff === 2) return { width: sizes.near2 }
    return { width: sizes.far }
  }

  const getBg = (i: number) => {
    if (i % 2 === 0) return 'bg-[#FCEDD8]'
    return 'bg-[#F5F4F9]'
  }

  return (
    <section id="works" className="px-8 bg-gradient-to-b from-[#AF2B16] to-[#E16529] pt-15 pb-20 sm:py-[120px]">
      <h2 className="text-white text-[18vw] sm:text-[80px] font-extrabold text-center">저에요.</h2>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveIndex(null)}
        />
      )}

        <div className="flex flex-col items-center relative z-20 mt-10">
        {works.map((work, i) => (
              <div
                key={i}
                className="py-1"
                onMouseEnter={() => { if (activeIndex === null) setHoveredIndex(i) }}
                onMouseLeave={() => { if (activeIndex === null) setHoveredIndex(null) }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (activeIndex !== null) {
                    setActiveIndex(null)
                    return
                  }
                  setActiveIndex(i)
                }}
              >
                <div style={getWidth(i)} className={` ${getBg(i)} rounded-2xl cursor-pointer transition-all duration-300 ease-out overflow-hidden border-t-1 border-[#D4A88A]`}
                >
                    {/* 기본 타이틀 */}
                    <div className="px-6 py-5 text-center text-sm sm:text-lg font-medium text-[#3B1A0A]">
                      {work.minTitle}
                    </div>

                    {/* 펼쳐지는 내용 */}
                    <div
                    className={`transition-all duration-300 ease-out overflow-hidden ${
                        activeIndex === i ? 'max-h-140 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    >
                      <div className={`px-10 pt-6 pb-10 border-t-1 ${
                          i % 2 === 0 ? 'bg-[#F7CAA9] border-[#D4A88A]' : 'bg-white border-[#D4D4D4]'
                      }`}>
                          <div className={`flex items-center justify-between pb-4 border-b-1 ${
                                i % 2 === 0 ? 'border-[#D4A88A]' : 'border-[#D4D4D4]'
                            }`}>
                            <h3 className={`text-3xl font-bold ${
                                i % 2 === 0 ? 'text-[#421200]' : 'text-black'
                            }`}>
                              {work.title}
                            </h3>
                            <a href={work.link} target='_blank' 
                            className={`text-[#3B1A0A] w-12 h-12 rounded-full hover:opacity-60 ${
                                i % 2 === 0 ? 'bg-white' : 'bg-[#E06429]'
                            }`}>
                              🔗
                            </a>
                          </div>
                          <div className="mt-8">
                            <p className={`text-sm font-medium ${
                                i % 2 === 0 ? 'text-[#AE754E]' : 'text-[#999999]'
                            }`}>
                              Duration
                            </p>
                            <p className={`text-lg font-medium mt-1 ${
                                i % 2 === 0 ? 'text-[#3B1A0A]' : 'text-black'
                            }`}>
                              {work.duration}
                            </p>
                          </div>
                          <div className="mt-6">
                            <p className={`text-sm font-medium ${
                                i % 2 === 0 ? 'text-[#AE754E]' : 'text-[#999999]'
                            }`}>
                              Role
                            </p>
                            <p className={`text-lg font-medium mt-1 ${
                                i % 2 === 0 ? 'text-[#3B1A0A]' : 'text-black'
                            }`}>
                              {work.role}
                            </p>
                          </div>
                          <div className="mt-6">
                            <p className={`text-sm font-medium ${
                                i % 2 === 0 ? 'text-[#AE754E]' : 'text-[#999999]'
                            }`}>
                              Tech Stack
                            </p>
                            <p className={`text-lg font-medium mt-1 ${
                                i % 2 === 0 ? 'text-[#3B1A0A]' : 'text-black'
                            }`}>
                              {work.tech}
                            </p>
                          </div>
                      </div>
                    </div>
                </div>
            </div>

        ))}
      </div>
    </section>
  )
}