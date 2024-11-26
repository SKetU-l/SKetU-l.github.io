import { useState, useEffect } from 'react'

export const useDynamicFontSize = (
    baseSize: number = 16,
    minSize: number = 24,
    maxSize: number = 80
) => {
    const [fontSize, setFontSize] = useState(baseSize)

    useEffect(() => {
        const calculateFontSize = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            const calculatedSize = Math.min(vw / 25, vh / 12)
            const clampedSize = Math.max(minSize, Math.min(calculatedSize, maxSize))
            setFontSize(clampedSize)
        }

        calculateFontSize()
        window.addEventListener('resize', calculateFontSize)

        return () => window.removeEventListener('resize', calculateFontSize)
    }, [baseSize, minSize, maxSize])
    return fontSize
}