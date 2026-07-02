'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import SparkleText from '@/components/SparkleText'

const N = 4
const TOTAL = N * N
const GAP = 8

const IMAGE_URL = '/images/profile.jpg'
const PF_IMAGE_URL = '/images/profile_opacity50.jpg'
const WIN_IMAGE_URL = '/images/img_complete.png'

function isSolvable(arr: number[]) {
  const a = arr.filter(x => x !== 0)
  let inv = 0
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] > a[j]) inv++
  const blankRow = Math.floor(arr.indexOf(0) / N)
  const blankFromBottom = N - blankRow
  if (N % 2 === 1) return inv % 2 === 0
  if (blankFromBottom % 2 === 0) return inv % 2 === 1
  return inv % 2 === 0
}

function isSolved(arr: number[]) {
  for (let i = 0; i < TOTAL - 1; i++) if (arr[i] !== i + 1) return false
  return arr[TOTAL - 1] === 0
}

function shuffle(): number[] {
  let arr: number[]
  do {
    arr = Array.from({ length: TOTAL }, (_, i) => i).sort(() => Math.random() - 0.5)
  } while (!isSolvable(arr) || isSolved(arr))
  return arr
}

function getNeighbors(idx: number) {
  const r = Math.floor(idx / N), c = idx % N
  const ns: number[] = []
  if (r > 0) ns.push(idx - N)
  if (r < N - 1) ns.push(idx + N)
  if (c > 0) ns.push(idx - 1)
  if (c < N - 1) ns.push(idx + 1)
  return ns
}

export default function About() {
  const [tiles, setTiles] = useState<number[]>([])
  const [preview, setPreview] = useState(false)
  const [won, setWon] = useState(false)
  const [boardSize, setBoardSize] = useState(392)
  const boardRef = useRef<HTMLDivElement>(null)

  const tileSize = Math.floor((boardSize - GAP * (N - 1)) / N)

  const initGame = useCallback((arr: number[]) => {
    setTiles(arr)
    setWon(false)
  }, [])

  useEffect(() => {
    initGame(shuffle())
  }, [initGame])

  useEffect(() => {
    const update = () => {
      if (boardRef.current) {
        setBoardSize(boardRef.current.offsetWidth)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleTileClick = (idx: number) => {
    if (won) return
    const emptyIdx = tiles.indexOf(0)
    if (!getNeighbors(emptyIdx).includes(idx)) return
    const next = [...tiles]
    ;[next[emptyIdx], next[idx]] = [next[idx], next[emptyIdx]]
    setTiles(next)
    if (isSolved(next)) {
      setWon(true)
    }
  }

  const handleWinClose = () => {
    setWon(false)
    setTimeout(() => {
      initGame(shuffle())
    }, 6000)
  }

  return (
    <section id="about" className="h-full bg-gradient-to-b from-[#5055FA] to-[#1F488C] pt-15 pb-20 sm:py-[120px] flex flex-col items-center">
      <h2 className="text-white text-[18vw] sm:text-[80px] font-extrabold">
        <span className='hidden md:inline'>접니다.</span>
        <span className='md:hidden'>Profile</span>
      </h2>

      <div className="bg-white rounded-4xl py-10 w-[90%] sm:w-[500px] text-center mt-8">
        <p className="text-black text-3xl font-bold mt-5">처음뵙겠습니다<br />자주뵙고싶네요</p>

        {/* 슬라이드 보드 */}
        <div className="flex justify-center mt-10 px-6">
          <div
            ref={boardRef}
            className="relative w-full max-w-[392px]"
            style={{ height: boardSize }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${N}, ${tileSize}px)`,
                gridTemplateRows: `repeat(${N}, ${tileSize}px)`,
                gap: GAP,
                backgroundImage: `url(${PF_IMAGE_URL})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${boardSize}px ${boardSize}px`,
              }}
            >
              {tiles.map((val, idx) => {
                return val === 0 ? (
                  <div
                    key={idx}
                    className="rounded-md bg-[#434455]"
                    style={{ width: tileSize, height: tileSize }}
                  />
                ) : (
                  (() => {
                    const col = (val - 1) % N
                    const row = Math.floor((val - 1) / N)
                    return (
                      <div
                        key={idx}
                        className="rounded-md overflow-hidden cursor-pointer relative hover:scale-[0.97] active:scale-[0.94] transition-transform"
                        style={{
                          width: tileSize,
                          height: tileSize,
                          backgroundImage: `url(${IMAGE_URL})`,
                          backgroundSize: `${boardSize}px ${boardSize}px`,
                          backgroundPosition: `-${col * (tileSize + GAP)}px -${row * (tileSize + GAP)}px`,
                          backgroundRepeat: 'no-repeat',
                        }}
                        onClick={() => handleTileClick(idx)}
                      >
                        <span className="absolute top-1 left-1 text-xs font-medium text-[#5f5f68] z-10">
                          {val}
                        </span>
                      </div>
                    )
                  })()
                )
              })}
            </div>

            {/* 완성본 오버레이 */}
            {preview && (
              <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                <img src={IMAGE_URL} alt="완성본" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="mx-auto mt-8 px-6 sm:px-14 w-full">
          <div className="flex items-center gap-2">
            <button
              className="shrink-0 bg-[#0FDFAF] text-black text-md/1 font-bold w-[98px] text-center py-[6px] rounded-full cursor-pointer hover:opacity-90"
              onMouseDown={() => setPreview(true)}
              onMouseUp={() => setPreview(false)}
              onMouseLeave={() => setPreview(false)}
              onTouchStart={() => setPreview(true)}
              onTouchEnd={() => setPreview(false)}
            >
              Original
            </button>
            <p className="text-black text-sm relative text-left break-keep">
              이럴 시간이 없다. 빠르게 얼굴을 확인한다.
              <span className="text-[#6D6C76] text-xs block mt-1">
                (꾸욱~ 길게 누르고 있으면 원본을 확인하실 수 있습니다)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <button
              className="shrink-0 bg-black text-[#0FDFAF] text-md/1 font-bold w-[98px] text-center py-[6px] rounded-full cursor-pointer hover:opacity-90"
              onClick={() => initGame(shuffle())}
            >
              REMIX
            </button>
            <p className="text-black text-md text-left break-keep">앗.. 다... 다시 섞어라! 당장!!!!</p>
          </div>
        </div>
      </div>

      {won && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={handleWinClose}
        >
          <div className="w-[400px] text-center select-none">
              <SparkleText autoPlay>
                <img src={WIN_IMAGE_URL} alt="완성하셨습니다" className='w-[320px] h-[320px]'/>
              </SparkleText>
          </div>
        </div>
      )}
    </section>
  )
}