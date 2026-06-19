'use client'

import { useState , useRef } from 'react'

const tabs = ['연락처', '카카오톡', '이메일']
const IMG_CONTACT_C = '/images/contact_call.png'
const IMG_CONTACT_Q = '/images/contact_qr.png'
const IMG_CONTACT_E = '/images/contact_email.png'

export default function Contact() {
  const [active, setActive] = useState(1)
  const [toast, setToast] = useState<string | null>(null)

  const touchStartX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return // 50px 미만은 무시
    if (diff > 0) {
      // 왼쪽으로 스와이프 → 다음
      setActive((prev) => (prev + 1) % 3)
    } else {
      // 오른쪽으로 스와이프 → 이전
      setActive((prev) => (prev + 2) % 3)
    }
  }

  const mouseStartX = useRef<number>(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    const diff = mouseStartX.current - e.clientX
    if (Math.abs(diff) < 50) return
    if (diff > 0) {
      setActive((prev) => (prev + 1) % 3)
    } else {
      setActive((prev) => (prev + 2) % 3)
    }
  }

  const showToast = (message:string) => {
    setToast(message)
    setTimeout( () => setToast(null),3000 )
  }

  const handleCopyContact = async () => {
    try{
      await navigator.clipboard.writeText('01071174595')
      showToast('연락처가 복사되었습니다')
    } catch (err){
      console.error('복사 실패:', err)
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jeongchamin@gmail.com')
      showToast('이메일이 복사되었습니다')
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }

  const handleQRGuide = () => {
    showToast('QR을 찍어주세요')
  }

  return (
    <section id="contact" className="pt-15 pb-20 sm:py-[120px] bg-gradient-to-b from-[#0095EC] to-[#64FB9D] overflow-hidden py-[120px] flex flex-col items-center">
      <h2 className="text-white text-[18vw] sm:text-[80px] font-extrabold">연락주세요</h2>
      <p className="text-3xl leading-9 text-center text-white/80 mb-12 mt-2">
        <strong>메시지</strong>를 보내거나,<br />
        <strong>QR</strong>을 찍거나,<br />
        <strong>이메일</strong>을 보내거나
      </p>

      <div className="bg-white rounded-4xl py-12 w-[90%] sm:w-[500px] text-center">

        {/* 탭 */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/20 backdrop-blur-sm rounded-full p-1 gap-[8px]">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-6 py-2 rounded-full text-md font-legular transition-all duration-300 cursor-pointer ${
                  active === i
                    ? 'bg-black text-white'
                    : 'bg-[#F0F0F0] text-[#777777]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 카드 슬라이더 */}
        <div className="relative flex justify-center items-center h-[340px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {[0, 1, 2].map((i) => {
              let offset = ((i - active) % 3 + 3) % 3
              if (offset === 2) offset = -1 // 2 → -1 (왼쪽)
              const isActive = offset === 0

            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`absolute w-[300px] cursor-pointer transition-all duration-500 ease-out ${active === i 
                  ? 'hover:scale-102' 
                  : ''}
                  `}
                style={{
                  transform: `translateX(${offset * 290}px) scale(${isActive ? 1 : 0.79})`,
                  filter: isActive ? 'none' : 'blur(3px)',
                  opacity: isActive ? 1 : 0.7,
                  zIndex: isActive ? 10 : 2,
                }}
              >
                {i === 0 && (
                  <div className="h-[376px] flex flex-col">
                    <div className="flex-1 bg-white border-1 border-[#C5C5C5] rounded-[40px] shadow-lg relative flex justify-center items-center">
                      <img 
                      src={IMG_CONTACT_C} 
                      className="absolute bottom-0 w-[328px] h-[328px] max-w-[328px]"
                      draggable={false}
                      />
                    </div>
                    <button className="bg-[#23302D] text-[#0FDFAF] text-xl font-light py-4 text-center rounded-full mt-4 cursor-pointer"
                    onClick={isActive ? handleCopyContact : undefined }
                    >
                      연락처 복사하기
                    </button>
                  </div>
                )}
                {i === 1 && (
                  <div className="h-[376px] flex flex-col">
                    <div className="flex-1 bg-white border-1 border-[#C5C5C5] rounded-[40px] shadow-lg flex justify-center items-center">
                      <img 
                      src={IMG_CONTACT_Q} 
                      className='w-[208px] h-[208px]'
                      draggable={false}/>
                    </div>
                    <button className="bg-[#403C30] text-[#FFC919] text-xl font-light py-4 text-center rounded-full mt-4 cursor-pointer"
                    onClick={isActive ? handleQRGuide : undefined}
                    >
                      카카오톡 QR로 연락하기
                    </button>
                  </div>
                )}
                {i === 2 && (
                  <div className="h-[376px] flex flex-col">
                    <div className="flex-1 bg-white border-1 border-[#C5C5C5] rounded-[40px] shadow-lg relative flex justify-center items-center">
                      <img 
                      src={IMG_CONTACT_E} 
                      className="absolute bottom-0 w-[342px] h-[339px] max-w-[342px]"
                      draggable={false}
                      />
                    </div>
                    
                    <button className="bg-[#31233F] text-[#DEBBFF] text-xl font-light py-4 text-center rounded-full mt-4 cursor-pointer"
                    onClick={isActive ? handleCopyEmail : undefined}
                    >
                      이메일 복사하기
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 토스트 */}
        {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#d54ae2] text-white px-6 py-3 rounded-full text-sm animate-fade-in-up z-50">
            {toast}
          </div>
        )}

      </div>




    </section>
  )
}