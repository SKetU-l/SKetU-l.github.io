"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'

export interface ContactMeProps {
  isDark: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '700'] })

const ContactMe: React.FC<ContactMeProps> = ({
  isDark,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const aboutTexts = [
    "Developer",
    "Coder",
    "Builder",
    "Learner",
    "Investor",
    "Entrepreneur",
    "Designer",
    "Innovator",
    "Freelancer",
    "Consultant",
  ]

  const contactLinks = [
    { name: 'Email', href: 'mailto:SKeTU-l@proton.me' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/SKetU' },
    { name: 'GitHub', href: 'https://github.com/SKetU-l' },
    { name: 'Telegram', href: 'https://t.me/SKetUl' },
    { name: 'Instagram', href: 'https://instagram.com/SKetU.l' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % aboutTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${outfit.className}`}>
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 relative whitespace-nowrap text-center select-none">
          <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-white to-gray-500' : 'bg-gradient-to-r from-black to-gray-700'}`}>
            Hello,
          </span>
          <br />
          <motion.span
            key={currentTextIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {aboutTexts[currentTextIndex]}
          </motion.span>
          <span className={`absolute -bottom-1 left-0 w-full h-1 ${isDark ? 'bg-white' : 'bg-black'}`} />
        </h1>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 select-none">
          {contactLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
            <div className={`py-3 px-4 border-2 ${isDark ? 'border-white' : 'border-black'} text-center transition-transform duration-300 ${isDark ? 'group-hover:bg-white group-hover:text-black' : 'group-hover:bg-black group-hover:text-white'} font-medium font-bold`}>
                {link.name}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          className="mt-12 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-center select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I'm passionate about crafting unique digital experiences. Let's team up and create something extraordinary together!
        </motion.p>

        <motion.div
          className="mt-12 text-center text-sm select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          &copy; {currentYear} SKeTU. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactMe