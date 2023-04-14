import React from 'react'

const { motion } = require("framer-motion");

const myAnimation = {
  initial: {
    opacity: 1,
    top: "0"
  },
  animate: {
    opacity: 1,
    top: "0"
  },
  exit: {
    opacity: 1,
    top: "0"
  },
  transition: {
    duration: 0.25
  }
}
const PageFade = ({children}) => {
    return (
        <motion.div
        className="relative min-h-screen"
        initial="initial"
        animate="animate"
        exit="exit"
        transition={myAnimation.transition}
        variants={myAnimation}>
        {children}
        </motion.div>
    )
}

export default PageFade
