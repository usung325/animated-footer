import './App.css'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimate } from 'framer-motion'

function App() {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const springConfig = {
    stiffness: 600,
    damping: 50
  }

  const rotate = useTransform(scrollYProgress, [0.5, 1], [0, -5])
  const xOff = useTransform(scrollYProgress, [0.5, 1], [0, -100])
  const yOff = useTransform(scrollYProgress, [0.5, 1], [0, -600])

  const xSpring = useSpring(xOff, springConfig)
  const ySpring = useSpring(yOff, springConfig)
  const rotSpring = useSpring(rotate, springConfig)

  const handleLeave = (e: any) => {
    e.preventDefault()

    rotSpring.set(rotate.get())
    xSpring.set(xOff.get())
    ySpring.set(yOff.get())

    console.log(rotate.get())
  }
  const handleEnter = (e: any) => {
    e.preventDefault()

    rotSpring.set(5)
    xSpring.set(-100)
    ySpring.set(-800)
  }

  const handleLastPanel = () => {
    animate(scope.current, { x: 140, y: -380, rotate: -5 }, { type: 'spring', stiffness: 600, damping: 50 })
  }

  const handleLastPanelReset = () => {
    animate(scope.current, { x: 0, y: 0, rotate: 0 }, { type: 'spring', stiffness: 600, damping: 50 })
  }

  return (
    <>
      <div
        style={{ zIndex: 100 }}
        className="fixed flex justify-between text-xs px-4 top-0 left-0 w-full h-[40px] mt-1" >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[150px]" fill="black" viewBox="0 3 126 22"><path d="M126 14.14V7.86h-8.397V6.28H126V0h-15.128v7.86h-1.689V0h-6.708v7.86h-1.689L95.744 0h-6.709v7.86h-1.688V0h-6.709v7.86h-8.397V0H65.51v7.86H45.362V6.28h8.42V0H38.653v7.86h-1.711V0h-6.708v7.86H25.19V0h-6.709v7.86h-6.73V6.28h5.042V0H0v6.28h5.043v1.58H0v6.28h5.043V22h6.708v-7.86h6.731V22h6.709v-7.86h5.043V22h6.708v-7.86h1.711V22h15.129v-6.28h-8.42v-1.58H65.51V22h13.44v-6.28h-6.71v-1.58h8.397V22h6.709v-7.86h1.688V22h6.709v-7.86h1.688l5.043 7.86h6.708v-7.86h1.689V22H126v-6.28h-8.397v-1.58z"></path></svg>
        <div className="flex gap-5">
          <p> CLOSED (10–6PM)</p>
          <p> LONDON, ENGLAND</p>
        </div>
        <div className="flex gap-x-2 items-start text-2xl font-light">
          <div className="w-4 h-4 bg-red-500 rounded-full mt-1" />
          <p className="-mt-1"><span className="text-red-500">HOME </span>/ WORK / ENTERTAINMENT / ABOUT / FEED / PODCAST / CONTACT / SHOP</p>
        </div>
      </div>

      <div
        ref={ref}
        style={{ zIndex: 50 }}
        className="w-full h-[200vh] relative overflow-x-hidden">

        <motion.div
          style={{ rotate: rotSpring, x: xSpring, y: ySpring, zIndex: 40 }}
          className="w-full h-[200vh] bg-white top-0 flex flex-col gap-40 justify-end p-5" >
          <div className="flex text-[200px] justify-between w-full px-5 items-center">
            <div>
              <p>Let's Talk</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </div>
          <div className="flex w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1684 419"><path d="M1684 215.276v90.04H0v-90.04z"></path><path d="M1483.31 102h95.98v316.592h-95.98z"></path><path d="M1684 328.552v90.04h-200.684v-90.04zM1684 102v90.04h-200.684V102zM1177.93 102h95.98v316.592h-95.98z"></path><path d="M1177.93 102h95.98l186.14 316.592h-95.98z"></path><path d="M1364.07 102h95.98v316.592h-95.98zM1058.68 102h95.98v316.592h-95.98zM852.18 102h95.98v316.592h-95.98z"></path><path d="M1035.41 328.552v90.04H852.177v-90.04zM535.156 102h95.98v316.592h-95.98z"></path><path d="M735.842 328.552v90.04H535.158v-90.04zM735.842 102v90.04H535.158V102zM258.852 102h95.98v316.592h-95.98zM415.908 102h95.98v316.592h-95.98zM69.805 102h95.979v316.592h-95.98z"></path><path d="M235.586 102v90.04H.001V102zM1640.9 85.809c-8.17 0-15.54-1.825-22.1-5.473-6.43-3.794-11.53-8.902-15.33-15.323-3.65-6.567-5.47-13.937-5.47-22.109s1.82-15.542 5.47-22.109c3.8-6.567 8.9-11.674 15.33-15.323C1625.36 1.824 1632.73 0 1640.9 0c8.18 0 15.47 1.824 21.89 5.473q9.855 5.473 15.33 15.322c3.79 6.567 5.69 13.937 5.69 22.11 0 8.171-1.9 15.541-5.69 22.108q-5.475 9.632-15.33 15.323c-6.42 3.648-13.71 5.473-21.89 5.473m0-9.194q14.235 0 23.43-9.413c6.13-6.421 9.19-14.52 9.19-24.298s-3.06-17.804-9.19-24.079q-9.195-9.63-23.43-9.631c-9.48 0-17.29 3.21-23.42 9.631-6.13 6.275-9.19 14.302-9.19 24.08s3.06 17.876 9.19 24.297c6.13 6.275 13.94 9.413 23.42 9.413m-15.76-56.695h19.27c5.1 0 9.12 1.24 12.04 3.721 2.91 2.481 4.37 5.765 4.37 9.85 0 2.92-.94 5.473-2.84 7.662q-2.85 3.283-7.23 4.378l10.73 19.263h-11.6l-6.79-13.572q-1.965-3.502-5.25-3.502h-2.41v17.074h-10.29zm18.39 19.263c2.04 0 3.65-.438 4.82-1.313 1.31-1.022 1.97-2.408 1.97-4.16 0-1.605-.66-2.845-1.97-3.72-1.17-1.022-2.78-1.533-4.82-1.533h-8.32v10.726z"></path></svg>
          </div>
        </motion.div>

        <div
          ref={scope}
          style={{ zIndex: -20 }}
          className="w-full bg-[#ff391e] absolute top-0 h-full flex" >
          <div className="flex flex-col text-white justify-end text-2xl w-full">
            <div className="font-light p-5 flex flex-col gap-y-5">
              <div className="w-full flex justify-between text-sm font-thin">

                <div className="flex flex-col gap-5">
                  <div>
                    <p>/ REACH OUT</p>
                  </div>
                  <div className="w-[290px] text-3xl font-light">
                    <p>info@thelineanimation.com
                      / 44 (0)20 30020224</p>
                  </div>
                </div>
                <img className="aspect-auto w-96" src="https://www.datocms-assets.com/136821/1728381584-tshirtillustrationfinals_v05.png?fit=crop&amp;w=900" />
                <div className="flex gap-36">

                  <div className="flex flex-col gap-5">
                    <div>
                      <p>/ FIND US</p>
                    </div>
                    <div className="w-[275px] text-xl font-light">
                      <p>The Line Animation Studio Ltd
                        Studio 02 <br />
                        De Beauvoir Block, 92-96
                        De Beauvoir Road
                        London, N1 4EN</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <p>/ SOCIAL</p>
                    </div>
                    <div className=" text-xl font-light">
                      <ul>Youtube</ul>
                      <ul>Instagram</ul>
                      <ul>TikTok</ul>
                      <ul>X</ul>
                      <ul>Facebook</ul>
                      <ul>LinkedIn</ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <p>/ NAV</p>
                    </div>
                    <div className=" text-xl font-light">
                      <ul>Youtube</ul>
                      <ul>Instagram</ul>
                      <ul>TikTok</ul>
                      <ul>X</ul>
                      <ul>Facebook</ul>
                      <ul>LinkedIn</ul>
                    </div>
                  </div>

                </div>
              </div>
              <div className="fixed bottom-0 flex w-full  pr-10 pb-2 justify-between items-baseline">

                <form className="w-full max-w-md">
                  <div className="flex items-center border-b border-white py-2">
                    <input
                      className="bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight placeholder:text-white focus:outline-none text-7xl"
                      type="text"
                      placeholder="Enter email"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right text-white"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </form>

                <div
                  // onMouseEnter={(e) => handleEnter(e)}
                  // onMouseLeave={(e) => handleLeave(e)}
                  onClick={(e) => { handleLastPanel(), handleEnter(e) }}
                  className="hover:cursor-pointer"
                >
                  <p> © THE LINE ANIMATION STUDIO 2024 / Site Credits / Privacy / Up </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => { handleLastPanelReset(), handleLeave(e) }}
          style={{ zIndex: -30 }}
          className="fixed flex flex-col justify-end bottom-0 w-screen h-full bg-slate-200" >
          <div className="flex w-full justify-end px-20">
            <div>
              <svg className="w-40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 79 91"><path d="m7.233 44.216 32.196 32.52 32.196-32.662L79 51.205 39.43 91 0 51.348zM44.961 0v82.014H33.898V0z"></path></svg>
            </div>
          </div>

          <div className="w-full items-end flex gap-4 pb-2">
            <p
              className="text-[13vw] font-semibold leading-none -mb-[0.1em]">
              Credits
            </p>
            <p
              className="leading-tight flex-1">
              ● Site Design / Isaac Powell ● Site Development / Thomas Aufresne ● Creative Director / Bjorn-Erik Aschim ● Project Manager / Denise Cirone / Ella Johnston / Maca Gaset ● Content Team / Skye van der Walt / Anna Degenaar / Sophia Owen-Moulding / Katerina Grecova
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
