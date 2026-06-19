
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city') || 'Seoul'

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=kr`
  )

  if (!res.ok) {
    return NextResponse.json({ error: '날씨 데이터를 가져오지 못했어요' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}