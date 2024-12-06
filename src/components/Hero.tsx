import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slider */}
      {backgroundImages.map((img, index) => (
        <motion.div
          key={img}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentBg ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover <span className="gradient-text">Extraordinary</span> Spaces
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Luxury buildings that redefine architectural excellence
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#buildings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Explore Properties
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-20 left-0 right-0"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '15+', text: 'Years Experience' },
                { number: '200+', text: 'Properties' },
                { number: '50+', text: 'Awards' },
                { number: '1000+', text: 'Happy Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center glassmorphism rounded-lg p-4"
                >
                  <motion.span
                    className="block text-3xl font-bold gradient-text mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-gray-300 text-sm">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 right-8 flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <div className="flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentBg(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentBg === index ? 'w-8 bg-secondary' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
