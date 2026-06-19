'use client'

import { useState, useRef } from 'react'


const careers = [
  {
    period: '2025 - 2026',
    title: '프리랜서',
    tags: ['#한화생명금융서비스', '#보험it프로젝트', '#63빌딩', '#여의도', '#샛강'],
    color: '#D1A62C',
  },
  {
    period: '2020 - 2025',
    title: '연금 AI 스타트업',
    tags: ['#개인연금관리', '#스타트업', '#DB_DC', '#ISA', '#IRP', '#국민연금', '#마이데이터', '#테스트베드', '#교보생명', '#낙성대'],
    color: '#3CB44A',
  },
  {
    period: '2018 - 2019',
    title: '대기업 파견',
    tags: ['#정원e샵', '#청정원', '#유지보수', '#폐쇄망', '#명절이벤트', '#상시이벤트', '#웹진', '#뉴스레터', '#신설동'],
    color: '#263C96',
  },
  {
    period: '2018',
    title: '웹 에이전시 O2',
    tags: ['#대학교', '#대학원', '#학과_학부', '#세종사이버대학교', '#신안산대학교', '#중앙대학교', '#VSCode', '#Git', '#학동'],
    color: '#697215',
  },
  {
    period: '2017',
    title: '웹 에이전시 O1',
    tags: ['#에이전시','#카페24','#스마트카라','#G.U.M','#하모키친','#원하이텍','#서초'],
    color: '#3CB44A',
  },
  {
    period: '2014 - 2017',
    title: '퍼블리셔로 취업',
    tags: ['#프랜차이즈','#반응형홈페이지','#쇼핑몰','#파파이스','#네네치킨','#맘스터치','#하이브리드앱','#JSP','#ASP','#SVN','#구로'],
    color: '#263C96',
  },
  {
    period: '2014',
    title: '고도몰 수강',
    tags: ['#국비지원','#고도몰','#코딩수업','#삼성'],
    color: '#3CB44A',
  },
  {
    period: '2012 - 2013',
    title: '첫 회사 입사',
    tags: ['#디자인','#광고디자인','#패키지디자인','#카스','#인피니티','#산토리','#학동사거리',],
    color: '#697215',
  },
  {
    period: '1989 06 -',
    title: '태어남',
    tags: ['#Seoul, Republic of Korea','#Birth','#뱀띠','#한국인'],
    color: '#363533',
  },
]

// 열차 SVG

const colorPairs = [
  { accent: '#2C9EDE', dark: '#204EA3' },
  { accent: '#A50030', dark: '#4D1022' },
  { accent: '#697215', dark: '#B9C82A' },
  { accent: '#3CB44A', dark: '#152C17' },
]

function Train({ direction }: { direction: 'up' | 'down' }) {
  const [colorPair, setColorPair] = useState(
    colorPairs[Math.floor(Math.random() * colorPairs.length)]
  )

  const handleAnimationIteration = () => {
    setColorPair(colorPairs[Math.floor(Math.random() * colorPairs.length)])
  }
  return (

    <svg width="14" height="37" viewBox="0 0 14 37" fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`cursor-pointer ${direction === 'up' ? 'rotate-180' : ''}`}
      onAnimationIteration={handleAnimationIteration}
    >
        <path d="M13.5 2L13.5 35C13.5 35.8284 12.8284 36.5 12 36.5L7.99999 36.5C3.85786 36.5 0.499992 33.1421 0.499993 29L0.5 2C0.5 1.17157 1.17158 0.499999 2 0.499997L12 0.5C12.8284 0.5 13.5 1.17157 13.5 2Z" fill="white" stroke="#BCBCBC"/>
        <path d="M8.25 34C5.35051 34 3 31.6495 3 28.75C3 27.7835 3.7835 27 4.75 27L8 27C9.10457 27 10 27.8954 10 29L10 32.25C10 33.2165 9.2165 34 8.25 34Z" fill="#3F3F3F"/>
        <rect x="4" y="18" width="7" height="3" rx="1" transform="rotate(-90 4 18)" fill="#3F3F3F"/>
        <rect x="1" y="24" width="3" height="8" transform="rotate(-90 1 24)" fill={colorPair.accent}/>
        <rect x="11" y="36" width="35" height="0.999995" transform="rotate(-90 11 36)" fill={colorPair.accent}/>
        <rect x="1" y="8" width="3" height="8" transform="rotate(-90 1 8)" fill={colorPair.accent}/>
        <rect x="9" y="24" width="3" height="4" transform="rotate(-90 9 24)" fill={colorPair.dark}/>
        <rect x="9" y="8" width="3" height="4" transform="rotate(-90 9 8)" fill={colorPair.dark}/>
        <rect x="4" y="26" width="7" height="3" rx="1" transform="rotate(-90 4 26)" fill="#3F3F3F"/>
        <rect x="4" y="10" width="7" height="3" rx="1" transform="rotate(-90 4 10)" fill="#3F3F3F"/>
    </svg>

  )
}

export default function History(){
    const [modal, setModal] = useState(false)
    const [paused, setPaused] = useState(false)

    const handleTrainClick = () => {
        setPaused(true)
        setModal(true)
    }

    const handleClose = () => {
        setModal(false)
        setPaused(false)
    }
    
    return (
        <section id="history" className="h-full bg-gradient-to-b from-[#D3C0FF] to-[#A4DEF1] pt-15 pb-20 sm:py-[120px] flex flex-col items-center">
            <h2 className="text-[#5426C5] text-[18vw] sm:text-[80px] font-extrabold">저구요,</h2>

            <div className="bg-white rounded-4xl py-8 w-[90%] text-center mt-10 sm:w-[500px]">
                <p className="text-[#363533] text-3xl font-bold mt-5">생각하는 것보다<br/>가까이 있습니다</p>
            
                <div className='bg-[#A50030] rounded-full min-h-[20px] mx-4 sm:mx-10 my-16 flex items-center py-0.5 justify-between relative'>
                    <span className='pl-4 text-sm font-light hidden sm:block'>퍼블리셔</span>
                    <strong className='absolute left-1/2 -translate-x-1/2 bg-white border-3 border-[#A50030] text-lg text-black font-medium px-7 py-1.5 rounded-full'>
                    현재 운행중
                    </strong>
                    <span className='pr-4 text-sm font-light hidden sm:block'>프론트엔드</span>
                    
                </div>

                <div>

                    <div className="max-w-xl mx-auto relative">

                        <div className="absolute left-[112px] sm:left-[182px] top-0 bottom-0 w-[7px] bg-[#DDDDDD]" />

                        {/* 상행 */}
                        <div
                            className="absolute left-[129px] sm:left-[200px] z-10 cursor-pointer animate-train-up"
                            onClick={handleTrainClick}
                            style={{ animationPlayState: paused ? 'paused' : 'running' }}
                        >
                            <Train direction="up" />
                        </div>

                        <div
                            className="absolute left-[129px] sm:left-[200px] z-10 cursor-pointer animate-train-up-delayed"
                            onClick={handleTrainClick}
                            style={{ animationPlayState: paused ? 'paused' : 'running' }}
                        >
                            <Train direction="up" />
                        </div>

                        {/* 하행 */}
                        <div
                            className="absolute left-[88px] sm:left-[157px] z-10 cursor-pointer animate-train-down"
                            onClick={handleTrainClick}
                            style={{ animationPlayState: paused ? 'paused' : 'running' }}
                        >
                            <Train direction="down" />
                        </div>

                        <div
                            className="absolute left-[88px] sm:left-[157px] z-10 cursor-pointer animate-train-down-delayed"
                            onClick={handleTrainClick}
                            style={{ animationPlayState: paused ? 'paused' : 'running' }}
                        >
                            <Train direction="down" />
                        </div>

                        {careers.map((career, i) => (
                            <div key={i} className="flex gap-8 sm:gap-[34px] relative mt-5">
                      
                                <div className="w-19 sm:w-36 text-right text-md font-medium text-[#363533] pt-1 shrink-0">
                                    {career.period}
                                </div>

                                <div className="relative shrink-0 mt-3" style={{ width: '15px' }}>
                                    <div
                                        className={`absolute top-0 left-[4px] h-2/5 w-[7px]`}
                                        style={i === careers.length - 1 ? {} : { backgroundColor: career.color }}
                                    >
                                        <span className='absolute w-[5px] h-[5px] bg-white rounded-full outline-5 left-[1px] top-0'
                                        style={{ outlineColor: career.color }}
                                        ></span>
                                    </div>
                                    <div
                                        className={`absolute bottom-0 left-[4px] h-3/5 bg-[#2C9EDE] w-[7px] ${i === careers.length - 1 ? 'hidden' : ''}`}
                                    >
                                        <span className='absolute w-[7px] h-[7px] bg-white rounded-full outline-2 outline-black left-[0px] top-[-1px]'
                                        ></span>
                                        <span className='absolute w-[5px] h-[5px] bg-white rounded-full outline-5 outline-[#2C9EDE] left-[1px] bottom-0'
                                        ></span>
                                    </div>
                                </div>

                                
                                <div className={`flex-1 text-left pr-6 sm:pr-8 ${i === careers.length - 1 ? 'pb-4' : 'pb-14 sm:pb-24'}`}>
                                    <h3 className="text-xl font-semibold text-[#363533]">{career.title}</h3>
                                    <div className="flex flex-wrap gap-[4px] mt-2">
                                        {career.tags.map((tag, j) => (
                                        <span key={j} className="text-sm/4 font-medium text-[#363533] hover:text-[#1A91F3]">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* 알림창 */}
                        {modal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleClose}>
                                <div className="bg-[#515050] rounded-md px-5 py-3 shadow-xl text-center">
                                    <div className="bg-black rounded-md px-4 py-2">
                                        <p className="text-xl text-left font-medium text-[#FECE49]">
                                            <span className='text-[#2BE52B]'>차량클릭</span>으로 일부 전동열차가<br/>
                                            <span className='text-[#FE4949]'>지연운행</span> 중 입니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                </div>

            </div>
        </section>
    )
    
};