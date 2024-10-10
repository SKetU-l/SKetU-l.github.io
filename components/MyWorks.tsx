"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

interface Project {
  category: string
  title: string
  description: string
  image: string
  url: string
}

const projects: Project[] = [
  {
    category: 'Admin Panel',
    title: 'Custom Dashboard',
    description: 'Building a custom admin panel for a client to manage their products and orders.',
    image: '/images/dashboard.png',
    url: 'https://sketu-l.github.io/dashboard'
  },
  {
    category: 'Telegram Bots',
    title: 'Custom Telegram Bot',
    description: 'Creating a Custom bot for a Telegram with mini webapp features (bot is down for now but webapp isnt).',
    image: '/images/image.svg',
    url: 'https://t.me/deez_nutswhen_bot'
  },
  {
    category: 'DevOps',
    title: 'CI Pipeline',
    description: 'Setting up a CI pipeline In RisingTechOSS.',
    image: '/images/ci.png',
    url: 'https://github.com/RisingOSS-devices/RisingOS-Builder'
  }
]

interface MyWorksProps {
  isDark: boolean
  isActive: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

export default function MyWorks({ isDark, isActive, handleMouseEnter, handleMouseLeave }: MyWorksProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCursorEnlarged, setIsCursorEnlarged] = useState(false)

  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const handleCardMouseEnter = () => {
    setIsCursorEnlarged(true)
    handleMouseEnter()
  }

  const handleCardMouseLeave = () => {
    setIsCursorEnlarged(false)
    handleMouseLeave()
  }

  const handleCardClick = (index: number) => {
    window.location.href = projects[index].url
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.section
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.6 }}
          className={`fixed inset-0 z-10 flex flex-col ${isDark ? 'bg-white text-black' : 'bg-black text-white'
            } ${isCursorEnlarged ? 'cursor-enlarged' : ''} ${poppins.className}`}
          aria-hidden={!isActive}
        >
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-30 pointer-events-none space-y-4">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center space-x-4">
                {Array.from({ length: 12 }).map((_, colIndex) => (
                  <p key={colIndex} className="text-4xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap m-4 text-center animate-pulse">
                    • Explore My Craft •
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-16 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-7xl"
              >
                <div
                  className={`p-6 md:p-12 lg:p-16 rounded-[20px] md:rounded-[50px] shadow-lg ${isDark ? 'bg-black text-white' : 'bg-white text-black'} lg:p-24 hover:shadow-2xl transition-shadow duration-300 hover:shadow-3xl`}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleCardClick(activeIndex)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
                    <div className="space-y-6 md:space-y-8 lg:space-y-10">
                      <p className="text-xl md:text-2xl lg:text-3xl font-medium opacity-100 select-none">
                        {projects[activeIndex].category}
                      </p>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight select-none">
                        {projects[activeIndex].title}
                      </h2>
                      <p className="text-sm md:text-base lg:text-lg opacity-75 select-none">
                        {projects[activeIndex].description}
                      </p>
                    </div>
                    <div className="relative group">
                      <img
                        src={projects[activeIndex].image}
                        alt={projects[activeIndex].title}
                        className="w-full h-full object-cover rounded-xl md:rounded-2xl lg:rounded-3xl group-hover:filter group-hover:brightness-100 group-hover:hue-rotate-90 duration-300 select-none"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 md:hidden"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <footer className="p-6 md:p-12 lg:p-16 flex justify-end space-x-4 md:space-x-6 lg:space-x-8 z-10">
            <button
              onClick={prevProject}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className={`p-2 md:p-3 lg:p-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} rounded-full shadow-lg hover:opacity-75 transition-opacity`}
            >
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </button>
            <button
              onClick={nextProject}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className={`p-2 md:p-3 lg:p-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} rounded-full shadow-lg hover:opacity-75 transition-opacity`}
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </button>
          </footer>
        </motion.section>
      )}
    </AnimatePresence>
  )
}