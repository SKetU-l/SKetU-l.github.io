import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Outfit } from 'next/font/google'

interface Project {
  category: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  tags?: string[];
}

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '700'] })

const projects: Project[] = [
  {
    category: 'Admin Panel',
    title: 'Custom Dashboard',
    description: 'Building a custom admin panel for a client to manage their products and orders.',
    image: '/images/dashboard.png',
    url: 'https://sketu-l.github.io/dashboard',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    category: 'Telegram Bots',
    title: 'Custom Telegram Bot',
    description: 'Creating a Custom bot for Telegram with mini webapp features (bot is down for now but webapp isnt).',
    image: '/images/image.svg',
    url: 'https://t.me/deez_nutswhen_bot',
    tags: ['React', 'Python', 'Telegram API', 'WebApp']
  },
  {
    category: 'DevOps',
    title: 'CI Pipeline',
    description: 'Setting up a CI pipeline In RisingTechOSS.',
    image: '/images/ci.png',
    url: 'https://github.com/RisingOSS-devices/RisingOS-Builder',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps']
  }
];

interface MyWorksProps {
  isDark: boolean;
  isActive: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export default function MyWorks({ isDark, isActive, handleMouseEnter, handleMouseLeave }: MyWorksProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setHoveredImage] = useState(false);

  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const NavigationButtons = ({ className = "" }) => (
    <div className={`flex gap-2 ${className}`}>
      <motion.button
        onClick={prevProject}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'
          } shadow-lg hover:shadow-xl transition-all select-none`}
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={nextProject}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'
          } shadow-lg hover:shadow-xl transition-all select-none`}
      >
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );

  return (
    <AnimatePresence>
      {isActive && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-10 ${isDark ? 'bg-white' : 'bg-black'} ${outfit.className}`}
        >
          <div className="h-full w-full flex flex-col">
            <div className="py-12 px-4">
              <div className={`w-full border-t-2 ${isDark ? 'border-black' : 'border-white'}`}></div>
            </div>
            <div className={`flex justify-between items-center ${isDark ? 'text-black' : 'text-white'}`}>
              <div className="hidden md:block">
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 overflow-y-auto select-none"
              >
                <div className="relative h-[300px] lg:h-full lg:w-1/2 group"
                  onMouseEnter={() => setHoveredImage(true)}
                  onMouseLeave={() => setHoveredImage(false)}
                >
                  <motion.div
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 overflow-hidden rounded-none select-none"
                  >
                    <a href={projects[activeIndex].url} target="_blank" rel="noopener noreferrer">
                      <motion.img
                        src={projects[activeIndex].image}
                        alt={projects[activeIndex].title}
                        className="w-full h-full object-cover select-none"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{ borderRadius: '80px', filter: 'hue-rotate(90deg)' }}
                      />
                      <motion.div
                        className={`absolute ${isDark ? 'from-white' : 'from-black'} opacity-20`}
                      />
                    </a>
                  </motion.div>
                </div>

                <div className={`hidden lg:block border w-px ${isDark ? 'bg-black border-black' : 'bg-white border-white'} mx-4`}></div>
                <div className={`flex flex-col justify-between p-4 sm:p-6 ${isDark ? 'text-black' : 'text-white'}`}>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      className="text-lg sm:text-xl mb-2 sm:mb-4 select-none"
                    >
                      {projects[activeIndex].category}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-6 select-none"
                    >
                      {projects[activeIndex].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      className="text-base sm:text-xl mb-4 sm:mb-8 select-none"
                    >
                      {projects[activeIndex].description}
                    </motion.p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-8 select-none">
                      {projects[activeIndex].tags?.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-none text-sm ${isDark ? 'bg-black text-white' : 'bg-white text-black'
                            } select-none`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <motion.a
                        href={projects[activeIndex].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-none ${isDark ? 'border-2 border-black text-black' : 'border-2 border-white text-white'
                        } transition-opacity text-sm sm:text-base select-none`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ backgroundColor: isDark ? 'black' : 'white', color: isDark ? 'white' : 'black', borderRadius: '30px' }}
                        transition={{ duration: 1.0 }}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 select-none" />
                        Visit Project
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center p-4">
              <div className={`w-full border-t-2 ${isDark ? 'border-black' : 'border-white'} mr-4`}></div>
              <NavigationButtons />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}