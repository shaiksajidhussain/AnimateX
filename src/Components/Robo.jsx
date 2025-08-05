import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './Loader'

const Robo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading time for the iframe
    const timer = setTimeout(() => {
      setIframeLoaded(true)
    }, 3000) // 3 seconds to simulate loading

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (iframeLoaded) {
      // Add a small delay before hiding the loader
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [iframeLoaded])

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <Loader key="loader" setLoading={setIsLoading} />
        ) : (
          <motion.div 
            key="robo-content"
            style={{width:"100%", height:"100%", position: "fixed" , top: 0, left: 0 , zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Original iframe with pointer-events-auto to ensure interaction */}
            <iframe 
              src='https://my.spline.design/nexbotrobotcharacterconcept-bd1651e9afe2846c7c8e174953fad288/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              style={{ position: 'absolute', pointerEvents: 'auto' }}
            />

            {/* Text overlay with pointer-events-none except for hover targets */}
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ pointerEvents: 'none' }}
            >
              <div style={{ pointerEvents: 'auto' }}>
                <motion.h1 
                  className="text-4xl md:text-6xl font-black mb-4 cursor-pointer"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{
                    color: '#fff',
                    fontFamily: 'Parkinsans, serif',
                    letterSpacing: '0.1em',
                    lineHeight: '1',
                    fontWeight: 900,
                  }}
                >
                  <motion.div
                    className="relative inline-block"
                    whileHover={{
                      scale: 1.05,
                      color: '#4FFBDF',
               
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    Next{' '}
                  </motion.div>
                  <motion.div
                    className="relative inline-block"
                    whileHover={{
                      scale: 1.05,
                      color: '#4FFBDF',
              
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    Generation
                  </motion.div>
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-3xl cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: [
                      '0 0 25px rgba(79,251,223,0.9)',
                      '0 0 35px rgba(79,251,223,0.7)',
                      '0 0 45px rgba(79,251,223,0.5)',
                    ],
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  style={{
                    color: '#4FFBDF',
                    fontFamily: 'Parkinsans, serif',
                    letterSpacing: '0.15em',
                    fontWeight: 500,
                    marginTop: '0.5rem',
                  }}
                >
                  Animation Framework
                </motion.p>

                <motion.div
                  className="text-sm md:text-base mt-6 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    opacity: 1,
                    color: '#4FFBDF',
                    textShadow: [
                      '0 0 20px rgba(79,251,223,0.8)',
                      '0 0 30px rgba(79,251,223,0.6)',
                    ],
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  style={{
                    color: '#fff',
                    fontFamily: 'Parkinsans, serif',
                    letterSpacing: '0.2em',
                    fontWeight: 400,
                    padding: '0.5rem 1rem',
                  }}
                >
                  Powered by Shaik Sajid Hussain 
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                position: 'absolute',
                bottom: 20,
                right: 2,
                width: '250px',
                height: '65px',
                background: '#000',
         
                zIndex: 1000
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Robo