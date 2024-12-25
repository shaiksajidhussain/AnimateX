import React, { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ComponentCard = React.memo(({ title, subtitle, children }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, type: "tween" }}
      style={{
        background: 'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(0,255,255,0.05))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,255,255,0.1)',
        willChange: 'transform',
      }}
    >
      <div className="p-8 flex flex-col items-center justify-center min-h-[200px]">
        {children}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "tween" }}
        >
          <h3 className="text-[#3399FF] text-lg font-medium mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </motion.div>
      </div>
    </motion.div>
  );
});

const ComponentsShowcase = () => {
  return (
    <section className="py-20 px-4 bg-[#0A0A0A]">
      <motion.h2 
        className="text-4xl md:text-5xl text-center mb-16 text-white font-bold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, type: "tween" }}
      >
        Components
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ComponentCard title="<SplitText />" subtitle="Text Animations">
          <div className="overflow-hidden">
            <motion.div 
              className="text-4xl text-white font-bold flex"
              initial="hidden"
              whileHover="visible"
              viewport={{ once: true }}
            >
              {'hello'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { y: 0 },
                    visible: {
                      y: [-20, 0],
                      transition: {
                        duration: 0.4,
                        delay: i * 0.1,
                        type: "tween"
                      }
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </ComponentCard>

        <ComponentCard title="<BlurText />" subtitle="Text Animations">
          <motion.div 
            className="text-4xl text-white font-bold"
            whileHover={{ filter: 'blur(4px)' }}
            transition={{ duration: 0.2, type: "tween" }}
          >
            hello
          </motion.div>
        </ComponentCard>

        <ComponentCard title="<WaveText />" subtitle="Text Animations">
          <div className="flex">
            {'hello'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl text-white font-bold inline-block"
                whileHover={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05
                  }
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </ComponentCard>

        <ComponentCard title="<AnimatedContainer />" subtitle="Animations">
          <motion.div 
            className="w-16 h-16 flex items-center justify-center"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, type: "tween", ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#3399FF]">
              <path fill="currentColor" d="M7.4 15.4L6 14l6-6 6 6-1.4 1.4L12 10.8z"/>
            </svg>
          </motion.div>
        </ComponentCard>

        <ComponentCard title="<BlobCursor />" subtitle="Animations">
          <motion.div 
            className="w-16 h-16 bg-[#3399FF] rounded-full"
            initial={{ scale: 1, borderRadius: "50%" }}
            whileHover={{ 
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "30%", "50%"],
              transition: {
                duration: 1,
                repeat: Infinity
              }
            }}
            style={{ willChange: 'transform, border-radius' }}
          />
        </ComponentCard>

        <ComponentCard title="<FollowCursor />" subtitle="Animations">
          <motion.div 
            className="w-16 h-16 bg-[#9DFF1E] rounded-lg"
            initial={{ x: 0 }}
            whileHover={{ 
              x: [0, 10, -10, 0],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{ willChange: 'transform' }}
          />
        </ComponentCard>
      </div>

      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <motion.button
          className="px-6 py-3 bg-[#3399FF] text-white rounded-lg"
          whileHover={{ scale: 1.05, backgroundColor: '#9DFF1E' }}
          transition={{ duration: 0.2, type: "tween" }}
        >
          Browse more
        </motion.button>
      </motion.div>
    </section>
  );
};

export default React.memo(ComponentsShowcase); 