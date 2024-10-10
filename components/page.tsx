"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MyWorks from './MyWorks'
import CursorDot from './CursorDot'
import MainContent from './MainContent'
import Menu, { MenuProps } from './Menu'
import ContactMe from './ContactMe'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] })

const useTheme = () => {
  const [isDark, setIsDark] = useState(true)
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])
  return { isDark, toggleTheme }
}

const useDotSize = (initialSize: number = 20, enlargedSize: number = 35) => {
  const [dotSize, setDotSize] = useState(initialSize)
  const handleMouseEnter = useCallback(() => setDotSize(enlargedSize), [enlargedSize])
  const handleMouseLeave = useCallback(() => setDotSize(initialSize), [initialSize])
  return { dotSize, handleMouseEnter, handleMouseLeave }
}

export type Section = 'home' | 'works' | 'contact'

const Home: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const { dotSize, handleMouseEnter, handleMouseLeave } = useDotSize()
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [previousSection, setPreviousSection] = useState<Section | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const sections: Section[] = ['home', 'works', 'contact']

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    if (isScrolling) return
    const scrollThreshold = 100
    setScrollProgress(prev => {
      const newProgress = prev + Math.abs(e.deltaY)
      if (newProgress >= scrollThreshold) {
        const currentIndex = sections.indexOf(activeSection)
        let newIndex = currentIndex

        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
          newIndex = currentIndex + 1
        } else if (e.deltaY < 0 && currentIndex > 0) {
          newIndex = currentIndex - 1
        }
        if (newIndex !== currentIndex) {
          setIsScrolling(true)
          setPreviousSection(activeSection)
          setActiveSection(sections[newIndex])
          setTimeout(() => {
            setIsScrolling(false)
          }, 1000)
        }
        return 0
      }
      return newProgress
    })
  }, [activeSection, isScrolling])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const handleSectionChange: MenuProps['handleSectionChange'] = useCallback((section) => {
    if (section === 'home' || section === 'works' || section === 'contact') {
      setPreviousSection(activeSection)
      setActiveSection(section)
      setIsMenuOpen(false)
      setScrollProgress(0)
    }
  }, [activeSection])

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])

  const getThemeClasses = (isDark: boolean) =>
    isDark ? 'bg-black text-white' : 'bg-white text-black'

  const getInverseThemeClasses = (isDark: boolean) =>
    isDark ? 'bg-white text-black' : 'bg-black text-white'

  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex < sections.length - 1) {
      setPreviousSection(activeSection)
      setActiveSection(sections[currentIndex + 1])
    }
  }

  const handlePreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex > 0) {
      setPreviousSection(activeSection)
      setActiveSection(sections[currentIndex - 1])
    }
  }

  return (
    <div className={`h-screen overflow-hidden p-4 sm:p-6 md:p-8 transition-colors duration-300 ease-in-out ${getThemeClasses(isDark)}`}>
      {activeSection !== 'contact' && previousSection !== 'contact' && (
        <div className="absolute top-0 left-0 right-0 text-center p-4 font-bold text-2xl sm:text-3xl md:text-4xl">
          <div
            className={`inline-block px-6 py-4 hover:underline duration-300 cursor-pointer select-none ${getInverseThemeClasses(isDark)} ${outfit.className}`}
            onClick={toggleMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            SKETU
          </div>
        </div>
      )}
      <AnimatePresence>
        {isMenuOpen && (
          <Menu
            isDark={isDark}
            handleSectionChange={handleSectionChange}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            closeMenu={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      {(['home', 'works', 'contact'] as const).map((section) => (
        <motion.div
          key={section}
          className={`transition-all duration-500 ${activeSection === section ? 'h-screen' : 'h-0 overflow-hidden'
            } flex items-center justify-center`}
        >
          {section === 'home' && <MainContent />}
          {section === 'works' && (
            <MyWorks
              isDark={isDark}
              isActive={activeSection === 'works'}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )}
          {section === 'contact' && (
            <ContactMe
              isDark={isDark}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )}
        </motion.div>
      ))}
      {activeSection !== 'contact' && previousSection !== 'contact' && (
        <button
          onClick={toggleTheme}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 px-3 sm:px-3 md:px-6 py-2 sm:py-3 transition-colors select-none hover:underline duration-300 ease-in-out ${getInverseThemeClasses(isDark)} ${outfit.className}`}
          aria-label="Toggle theme"
        >
          Toggle Theme
        </button>
      )}
      <div className="hidden sm:block">
        <CursorDot dotSize={dotSize} />
      </div>
      <div className="block sm:hidden fixed top-1/2 right-4 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-2">
        <button
          onClick={handlePreviousSection}
          className={`px-3 py-2 transition-colors select-none hover:underline duration-300 ease-in-out ${getInverseThemeClasses(isDark)} ${outfit.className}`}
          aria-label="Previous section"
        >
          &uarr;
        </button>
        <button
          onClick={handleNextSection}
          className={`px-3 py-2 transition-colors select-none hover:underline duration-300 ease-in-out ${getInverseThemeClasses(isDark)} ${outfit.className}`}
          aria-label="Next section"
        >
          &darr;
        </button>
      </div>
    </div>
  )
}

export default Home
