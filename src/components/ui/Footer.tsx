'use client'

import { ArrowUp } from 'lucide-react'

export default function Footer (){

    return(
    <section className="bg-black h-full relative py-12 sm:pt-26 sm:py-20 flex flex-col items-center">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group bg-white text-black w-[62px] h-[62px] rounded-full cursor-pointer flex items-center justify-center"
        ><ArrowUp size={32} className="group-hover:animate-bounce origin-[50%_50%]" />
        </button>
        <div className="w-[90%] sm:w-[50%] sm:ml-[50%] border-none sm:border-solid border-l-1 border-[#5C4DF2] break-keep flex items-center justify-start 
        px-4 py-8 my-10 sm:px-6 sm:py-20 sm:my-16">
            <p className="w-full text-sm font-light text-white text-center sm:text-left">끝까지 읽어주셔서 감사합니다.<br/>
            이 페이지는 개인 포트폴리오용으로 만들어진 것으로,<br/>
            React, TypeScript, Tailwind CSS를 기반으로 제작되었습니다.</p>
        </div>
        <small className="text-sm font-normal text-[#777777]">&copy; 2026 Chamin. All Rights Reserved.</small>
    </section>
    )
}