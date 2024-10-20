import './App.css'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'


export default function Attempt2() {
    const [isHover, setIsHover] = useState(false)
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })


    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
    const xOff = useTransform(scrollYProgress, [0, 1], [0, -100])
    const yOff = useTransform(scrollYProgress, [0, 1], [0, -300])

    const handleLeave = (e: any) => {
        e.preventDefault()
        setIsHover(false)
        console.log(rotate.get())
    }
    const handleEnter = (e: any) => {
        e.preventDefault()
        setIsHover(true)
    }
    return (
        <div
            ref={ref}
            className="w-full h-[200vh] relative">
            <motion.div
                layoutId="sliderDiv"
                key="slider"
                animate={isHover ? { rotate: 5, x: -100, y: -600 } : { rotate: +rotate, x: +xOff, y: +yOff }}
                style={{ rotate: rotate, x: xOff, y: yOff }}
                className="w-full h-screen bg-teal-500/50 sticky top-0" />

            <div className="w-full h-screen bg-blue-500 " />
            <div
                onMouseEnter={(e) => handleEnter(e)}
                onMouseLeave={(e) => handleLeave(e)}
                className="absolute bottom-0 w-full h-[20vh] z-30" />
        </div>
    )
}