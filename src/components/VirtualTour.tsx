import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lottie from 'lottie-react';
import animationData from '../animations/sample-animation.json';

interface VirtualTourProps {
  images: {
    url: string;
    title: string;
    description: string;
  }[];
}

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

const VirtualTour: React.FC<VirtualTourProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <Lottie animationData={animationData} className="w-32 h-32 mx-auto mb-4" />

      <Canvas className="h-[500px]">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>

      <motion.div
        className={`relative ${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-black'
            : 'h-[500px] rounded-xl overflow-hidden'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Info Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {images[currentIndex].title}
              </h3>
              <p className="text-gray-300">
                {images[currentIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Fullscreen Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
        >
          {isFullscreen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </motion.button>
      </motion.div>

      {/* Thumbnail Navigation */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={image.url}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-secondary/20" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VirtualTour;
