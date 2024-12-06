import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { buildingData } from './Buildings';
import VirtualTour from './VirtualTour';
import ScheduleTour from './ScheduleTour';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-secondary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const BuildingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const building = buildingData.find((b, index) => index === Number(id));
  
  if (!building) {
    return <div>Building not found</div>;
  }

  const mockImages = [
    building.image,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  ];

  // Add this mock data for the virtual tour
  const tourImages = [
    {
      url: '/images/interior1.jpg',
      title: 'Living Room',
      description: 'Spacious living area with floor-to-ceiling windows',
    },
    {
      url: '/images/interior2.jpg',
      title: 'Kitchen',
      description: 'Modern kitchen with premium appliances',
    },
    {
      url: '/images/interior3.jpg',
      title: 'Master Bedroom',
      description: 'Large master suite with walk-in closet',
    },
    {
      url: '/images/interior4.jpg',
      title: 'Bathroom',
      description: 'Luxury bathroom with marble finishes',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white mb-8"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Buildings
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ImageGallery images={mockImages} />
          </div>

          <div className="space-y-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold gradient-text mb-4"
              >
                {building.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-secondary mb-6"
              >
                {building.price}
              </motion.p>
            </div>

            <div className="flex space-x-4 border-b border-gray-700">
              {['overview', 'features', 'location', 'virtual-tour'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-[200px]"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-300">{building.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glassmorphism p-4 rounded-lg">
                        <p className="text-gray-400">Built</p>
                        <p className="text-white">2022</p>
                      </div>
                      <div className="glassmorphism p-4 rounded-lg">
                        <p className="text-gray-400">Size</p>
                        <p className="text-white">15,000 sq ft</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-4">
                    {building.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'location' && (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Located in the heart of the city, with easy access to major transportation hubs,
                      shopping centers, and entertainment venues.
                    </p>
                    <div className="h-[200px] bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">Map View Coming Soon</p>
                    </div>
                  </div>
                )}

                {activeTab === 'virtual-tour' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6"
                  >
                    <VirtualTour images={tourImages} />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-4"
            >
              <button className="flex-1 bg-secondary text-white py-3 rounded-lg hover:bg-secondary/80 transition-colors">
                Schedule Viewing
              </button>
              <button className="flex-1 border border-secondary text-secondary py-3 rounded-lg hover:bg-secondary/10 transition-colors">
                Download Brochure
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsScheduleModalOpen(true)}
        className="fixed bottom-8 right-8 px-6 py-3 bg-secondary text-white rounded-full shadow-lg hover:bg-secondary/90 transition-colors"
      >
        Schedule a Tour
      </motion.button>

      <ScheduleTour
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        buildingTitle={building.title}
      />
    </motion.div>
  );
};

export default BuildingDetails;
