import React from 'react'
import { Poppins } from 'next/font/google'
import { useDynamicFontSize } from '@/hooks/DynamicFont'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

const MainContent = () => {
  const fontSize = useDynamicFontSize(16, 24, 80)

  return (
    <main
      className={`${poppins.className} font-bold leading-tight flex flex-col space-y-2 select-none w-full`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <h1>HELLO, I'M DEBASISH [SKetU]</h1>
      <h2>A SELF-TAUGHT SOFTWARE ENTHUSIAST</h2>
      <h2>EXPLORING PYTHON & FULL-STACK DEVELOPMENT</h2>
      <h2>FASCINATED BY DEVOPS & LINUX</h2>
      <h2>DRIVEN BY A PASSION FOR KNOWLEDGE AND GROWTH</h2>
    </main>
  )
}

export default MainContent