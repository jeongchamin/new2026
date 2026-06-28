'use client'

import { useEffect, useState } from 'react'
import { WeatherData } from '@/types/weather'



function getWeatherDescription(id: number): string {
    if (id >= 200 && id < 300) return '천둥번개'
    if (id >= 300 && id < 400) return '이슬비'
    if (id >= 500 && id < 600) return '비'
    if (id >= 600 && id < 700) return '눈'
    if (id >= 700 && id < 800) return '안개'
    if (id === 800) return '맑음'
    if (id === 801) return '구름 조금'
    if (id === 802) return '구름 많음'
    if (id >= 803) return '흐림'
    return '날씨 정보 없음'
}

function updatedTime(dt: number) {
    return new Date(dt * 1000).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
    })
}


export default function Hero(){
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/weather?city=Seoul')
        .then(res => res.json())
        .then(data => {
            setWeather(data)
            setLoading(false)
        })
    }, [])

    return (
        <section id="hero" className="bg-[#D6FC39] sm:bg-[url('/images/img_usagi.png')] bg-no-repeat bg-right-bottom bg-[length:300px_300px] h-full text-center pt-[80px] pb-20 sm:pb-[120px] relative">
            {loading || !weather ? (
                <div className="animate-pulse">날씨 불러오는 중...</div>
            ) : (
                <>
                    <h1 className="mt-8 sm:mt-[120px] flex flex-col">
                        <span className="text-black text-[18vw] leading-[19vw] font-extrabold sm:text-[120px]/[128px]">오늘의<br/>날씨는</span>
                        <span className="text-black text-[18vw] leading-[18vw] sm:text-[120px]/[128px] font-bold mt-10">[<strong>{getWeatherDescription(weather.weather[0].id)}</strong>]</span>
                    </h1>

                    <div className="mt-16">
                        <p className="text-black text-lg font-bold">안녕하세요! 인사하기 딱 좋은 날이네요.</p>
                        <p className="text-black text-md font-normal">
                        기온 {Math.round(weather.main.temp)}°C (체감 {Math.round(weather.main.feels_like)}°C)</p>
                        <p className="text-[#7e961d] text-xs font-normal">- {updatedTime(weather.dt)} 기준 -</p>
                    </div>

                    <button 
                    className="bg-black rounded-full text-white text-lg font-normal px-9 py-4 cursor-pointer mt-14 hover:opacity-90"
                    onClick={ () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
                    >기분이가 좋으니까 연락하기
                    </button>
                </>
            )}

        </section>
    )
};
