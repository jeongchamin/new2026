'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft , MoveHorizontal } from 'lucide-react'

const works = [
  // {
  //   minTitle: 'stock · PERSONAL',
  //   title : '주식',
  //   duration: '2026.05 ~ 2023.06',
  //   role: 'UI Development (100%)',
  //   tech: 'VSCode, Nextjs, Tailwind, TypeScript, Git',
  //   link: '#',},
  {
    minTitle: 'forecast · PERSONAL',
    title : '오늘의날씨',
    duration: '2026.06',
    role: 'UI Development (100%)',
    tech: 'Next.js, Tailwind CSS, TypeScript, GitHub',
    link: 'https://whather.vercel.app',
  },
  {
    minTitle: 'Wealthguide',
    title : '웰스가이드',
    duration: '2020.09 ~ 2025.05 ',
    role: 'UI Development (구축 / 운영·유지보수 100%)',
    tech: 'VS Code, HTML5, CSS3, JavaScript',
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const hasDragged = useRef(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheelNative = (e: WheelEvent) => {
      const delta = e.deltaY
      
      // 오른쪽으로 갈 공간이 있거나, 왼쪽으로 갈 공간이 있는지 확인
      const canScrollLeft = container.scrollLeft > 0
      const canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth - 1 // 1px 여유 가심

      // 가로 영역 내부에서 움직일 수 있는 상태라면 전체 페이지 세로 스크롤을 강력하게 막음
      if ((delta > 0 && canScrollRight) || (delta < 0 && canScrollLeft)) {
        e.preventDefault() // 브라우저 세로 스크롤 차단
        container.scrollLeft += delta // 가로 스크롤 이동
      }
    }

    // passive: false를 주어야 e.preventDefault()가 브라우저에서 즉시 작동합니다.
    container.addEventListener('wheel', handleWheelNative, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheelNative)
    }
  }, [])


  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    const walk = x - startX.current
    if (Math.abs(walk) > 5) hasDragged.current = true // 5px 이상 움직이면 드래그로 판단
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => { isDragging.current = false }

  return (
    <section id="works" className=" bg-white pt-15 pb-20 sm:py-[120px] ">
      <h2 className="text-black text-[18vw] sm:text-[80px] font-extrabold text-center">
        <span className='hidden md:inline'>저에요.</span>
        <span className='md:hidden'>Works</span>
      </h2>

      <div className='relative'>
        {showHint && (
          <div className="flex justify-center mt-14 sm:mt-20 pr-8 sm:justify-end">
            <div className="flex items-center gap-6 ">

              <div className="relative flex items-center justify-center">
                <span className="text-[#333333] text-sm font-bold animate-swipe-arrow"><MoveHorizontal size={23}/></span>
              </div>

              <p className="text-[#333333] text-xs font-medium">Swipe left or right</p>
            
            </div>
          </div>
        )}

        <div className="flex gap-4 overflow-x-auto px-16 sm:px-100 pt-8 sm:pt-14 scrollbar-hide cursor-grab active:cursor-grabbing"
          ref={scrollRef}
          // onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
        
            {works.map((work, i) => (
              <a key={i}
              className='group relative shrink-0 rounded-[40px] h-[500px] w-[360px] overflow-hidden cursor-pointer transition-transform duration-700 hover:-translate-y-10'
              href={work.link}
              onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}>

              <div className="absolute inset-0 bg-[#F3F3F3]"/>

              <div className="absolute inset-0 bg-[hsla(173,77%,83%,1)] 
              bg-[radial-gradient(circle_at_7%_81%,hsla(104.5588235294118,91%,91%,1)_16%,transparent_53%),radial-gradient(circle_at_11%_29%,hsla(213,97%,75%,1)_8%,transparent_74%),radial-gradient(circle_at_21%_14%,hsla(149,93%,64%,1)_14.288924492243542%,transparent_68%),radial-gradient(circle_at_90%_50%,hsla(118,94%,89%,1)_2%,transparent_85%),radial-gradient(circle_at_5%_1%,hsla(250,76%,61%,1)_7%,transparent_84%)] bg-blend-normal 
              opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-gradient-slow"/>

              <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div>
                  <p className='text-[#333333] text-[32px] font-bold group-hover:text-white transition-all duration-300'>{work.title}</p>
                  <p className='text-[#999999] text-md group-hover:text-white transition-all duration-300'>{work.minTitle}</p>
                </div>
                <div>
                  <div>
                    <span className='text-[#AAAAAA] block text-sm group-hover:text-[#4bb8a6] transition-all duration-300'>Duration</span>
                    <strong className='text-[#555555] font-medium'>{work.duration}</strong>
                  </div>
                  <div className='mt-6'>
                    <span className='text-[#AAAAAA] block text-sm group-hover:text-[#4bb8a6] transition-all duration-300'>Role</span>
                    <strong className='text-[#555555] font-medium'>{work.role}</strong>
                  </div>
                  <div className='mt-6'>
                    <span className='text-[#AAAAAA] block text-sm group-hover:text-[#4bb8a6] transition-all duration-300'>Tech Stack</span>
                    <strong className='text-[#555555] font-medium'>{work.tech}</strong>
                  </div>
                </div>
              </div>

              </a>
            ))}

        </div>

        <div className="absolute z-50 right-0 top-0 h-full w-30 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
        

      </div>
      
    </section>
  )
}