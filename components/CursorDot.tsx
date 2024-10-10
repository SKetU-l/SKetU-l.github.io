import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const useCursor = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return { cursorXSpring, cursorYSpring }
}

const CursorDot = ({ dotSize }: { dotSize: number }) => {
  const { cursorXSpring, cursorYSpring } = useCursor()

  return (
    <motion.div
      className="fixed rounded-full pointer-events-none mix-blend-difference"
      style={{
        backgroundColor: '#ffffff',
        x: cursorXSpring,
        y: cursorYSpring,
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        left: `-${dotSize / 5}px`,
        top: `-${dotSize / 5}px`,
        zIndex: 1000,
        transition: 'width 500ms, height 500ms'
      }}
    />
  )
}

export default CursorDot