
const row1 = [
  'HTML', 'CSS', 'SCSS', 'JavaScript', 'jQuery',
]

const row2 = [
  'React', 'Next.js', 'React Query', 'Styled-component', 'Tailwind', 'TypeScript',
]

const row3 = [
  'Figma', 'Zeplin', 'Photoshop', 'Illustrator', 'Adobe XD',
]

const row4 = [
  '웹 표준 (Web Satndards)', '웹 접근성 (Web Accessibility)', 'Cross-Browsing',
]

function MarqueeRow({ items, direction, repeat = 4 }: {
  items: string[]
  direction: 'left' | 'right'
  repeat?: number
}) {
  return (
    <div className="overflow-hidden w-[800px] mb-3"
        style={{
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
    }}>
      <div className={`flex gap-3 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {Array.from({ length: repeat }).map((_, ri) => (
          <div key={ri} className="flex gap-3 shrink-0">
            {items.map((item, i) => (
              <div key={i} className="shrink-0 bg-[#7B51A8] text-white text-md font-light px-6 py-2.5 rounded-full whitespace-nowrap">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


export default function Skills(){
    return (
        <section id="skills" className="h-full bg-gradient-to-b from-[#0A0824] to-[#46367E] overflow-hidden">
            <div 
            className='bg-center bg-no-repeat pt-26 pb-20 sm:py-[120px] flex flex-col items-center relative' 
            style={{backgroundImage:'url(/images/bg_opacity_purple.png)'}}
            >

              <h2 className="text-white text-[18vw] sm:text-[80px] font-extrabold">
                <span className='hidden md:inline'>살펴보고</span>
                <span className='md:hidden'>Skills</span>
              </h2>

              <span className="absolute z-1 w-[300px] h-[200px] hidden sm:block top-18 left-1/2 -translate-x-[130%]"
              style={{backgroundImage:'url(/images/img_conan.png)'}}></span>

              <div className="border-1 border-[#8F3BDD] rounded-[40px] w-[90%] sm:w-[500px] py-10 relative z-50 overflow-hidden mt-6">
                  <div className="absolute top-0 w-full h-full bg-black/50 backdrop-blur-sm inset-0 -z-10"></div>
                  <h3 className="text-[#F59BFF] text-[6vw] sm:text-3xl font-bold text-center">내 이름은 차민, 기술자죠.</h3>
                  <p className="text-[#BA96E0] text-[3.5vw] sm:text-xl font-light text-center mt-1">기술자 : 어떤 분야에 전문적 기술을 가진 사람</p>
              </div>

              <div className="mt-12">
                  <MarqueeRow items={row1} direction="left" />
                  <MarqueeRow items={row2} direction="right" />
                  <MarqueeRow items={row3} direction="left" />
                  <MarqueeRow items={row4} direction="right" />
              </div>
            </div>
        </section>
    )
    
};