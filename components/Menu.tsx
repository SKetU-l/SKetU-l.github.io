import React from 'react'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'

export type Section = 'home' | 'works' | 'contact'

export interface MenuProps {
    isDark: boolean
    handleSectionChange: (section: Section) => void
    handleMouseEnter: () => void
    handleMouseLeave: () => void
    closeMenu: () => void
}

const outfit = Outfit({ subsets: ['latin'] })

const Menu: React.FC<MenuProps> = ({
    isDark,
    handleSectionChange,
    handleMouseEnter,
    handleMouseLeave,
    closeMenu,
}) => {
    const sections: Section[] = ['home', 'works', 'contact']

    return (
        <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 right-0 bottom-0 z-10 ${isDark ? 'bg-white text-black' : 'bg-black text-white'
                } shadow-lg ${outfit.className}`}
        >
            <div
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-8 py-4 text-xl md:text-2xl lg:text-3xl font-bold hover:underline duration-300 cursor-pointer ${isDark ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                onClick={closeMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                close
            </div>
            <ul className="flex flex-col items-center justify-center h-full space-y-4">
                {sections.map((section) => (
                    <li
                        key={section}
                        className="py-4 px-8 text-2xl md:text-3xl lg:text-4xl font-bold hover:underline cursor-pointer"
                        onClick={() => handleSectionChange(section)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

export default Menu