import { useState, useRef, useEffect, ReactNode } from 'react'

const { motion, useViewportScroll, useTransform, useSpring, useReducedMotion } = require("framer-motion");

const rand = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  };

const ParallaxItem = ({ children, offset = 292 }) => {
  const prefersReducedMotion = useReducedMotion()
  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const ref = useRef(null)

  const { scrollY } = useViewportScroll()

  const initial = (elementTop - clientHeight)
  const final = (elementTop - (clientHeight)) + elementHeight

  

  const yRange = useTransform(scrollY, [initial, final], [elementHeight, 0])
  const y = useSpring(yRange, { stiffness: 400, damping: 90, mass: rand(1, 10) })

  useEffect(() => {
    const element = ref.current
    const onResize = () => {
      setElementTop(element.closest('div').getBoundingClientRect().top)
      setClientHeight(window.innerHeight)
      setElementHeight(element.offsetHeight)
      
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div ref={ref} style={{y}}>
      {children}
    </motion.div>
  )
}

export default ParallaxItem