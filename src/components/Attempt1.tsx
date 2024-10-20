import './App.css'
import { useEffect, useState, useRef } from 'react'
import { motion, useAnimate, useScroll, useTransform, AnimatePresence, useAnimationFrame } from 'framer-motion'


export default function Attempt1() {

    const [scope, animate] = useAnimate()
    const [scroll, animateScroll] = useAnimate()
    const [isHover, setIsHover] = useState(false)
    const [rot, setRot] = useState(0)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })

    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
    const xOff = useTransform(scrollYProgress, [0, 1], [0, -100])
    const yOff = useTransform(scrollYProgress, [0, 1], [0, -500])

    useEffect(() => {
        if (isHover) {
            animate(scope.current, { y: '-10vh', x: 0, rotate: '-3deg' }, { duration: 0.8, type: 'spring', bounce: 0.25 })

        }
        else {
            animate(scope.current, { y: '0vh', x: 0, rotate: '0deg' }, { duration: 0.8, type: 'spring', bounce: 0 })
        }

    }, [isHover])

    useAnimationFrame(() => {
        animateScroll(scope.current, { y: yOff.get(), x: xOff.get(), rotate: `${rotate.get()}deg` })
    })

    // , transition:{ duration: 0.6, type: 'spring', bounce: 0.25 }

    return (
        <div ref={ref} className="h-[200vh] relative">
            {/* {isHover ? (
            <motion.div
              layoutId="redDiv"
              key="red"
              initial={{ x: x, y: y, rotate: rot }}
              exit={{ x: x, y: y, rotate: rot }}
              animate={{ x: -250, y: -750, rotate: '2deg' }}
              transition={{ duration: 0.9, type: 'spring', bounce: 0 }}
              className="w-full h-screen sticky top-0 bg-red-600 z-30">
            </motion.div>
          ) : (
            <motion.div
              layoutId="redDiv"
              key="red"
              initial={{ x: -250, y: -750, rotate: '2deg' }}
              animate={{ x: x, y: y, rotate: rot }}
              exit={{ x: -250, y: -750, rotate: '2deg' }}
              transition={{ duration: 0.9, type: 'spring', bounce: 0 }}
              style={!isHover ? { rotate: rot, x: x, y: y } : undefined}
              className="w-full h-screen sticky top-0 bg-red-600 z-30">
            </motion.div>
          )} */}
            {/* ////////////////////////////////////////////////////////////////////// */}
            {/* <motion.div
            layout
            key="red"
            style={{ rotate: rotate, x: xOff, y: yOff }}
            initial={{ rotate: `${rotate}`, x: `${xOff}`, y: `${yOff}` }}
            animate={isHover ? { x: 200, y: -700 } : undefined}
            exit={{ rotate: `${rotate}`, x: `${xOff}`, y: `${yOff}` }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className="w-full h-screen sticky top-0 bg-red-600 z-30">
          </motion.div> */}
            {/* ////////////////////////////////////////////////////////////////////// */}
            <motion.div
                style={{ rotate: rotate, x: xOff, y: yOff }}
                className="w-full h-screen sticky top-0 bg-red-600 z-30">
            </motion.div>
            <div
                ref={scope}
                className="card relative content-end w-full h-screen bg-slate-100 z-10">
                <p className="text-[350px] font-bold line-through"> THE LINE</p>
            </div>
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="absolute w-full h-[20vh] z-40 bottom-0">
            </div>
            {/* <div className="w-full h-screen bg-red-600 absolute top-0 left-0 -z-10"></div> */}
        </div>
    )
}