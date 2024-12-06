import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

interface ScheduleTourProps {
  isOpen: boolean;
  onClose: () => void;
  buildingTitle: string;
}

const ScheduleTour: React.FC<ScheduleTourProps> = ({ isOpen, onClose, buildingTitle }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: 'in-person',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setStep(3); // Show success message
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '600px',
      width: '90%',
      padding: '0',
      border: 'none',
      background: 'transparent',
    },
  };

  const springProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 200, friction: 15 },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
    >
      <animated.div style={springProps}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-primary rounded-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">
                Schedule a Tour
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <p className="text-gray-300">
                    Schedule a tour of {buildingTitle}. Choose your preferred tour type:
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {['in-person', 'virtual'].map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({ ...formData, type });
                          setStep(2);
                        }}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          formData.type === type
                            ? 'border-secondary bg-secondary/20'
                            : 'border-gray-700 hover:border-secondary/50'
                        }`}
                      >
                        <div className="text-xl font-semibold mb-2 capitalize">
                          {type} Tour
                        </div>
                        <p className="text-sm text-gray-400">
                          {type === 'in-person'
                            ? 'Tour the property in person with our agent'
                            : 'Take a virtual tour from anywhere'}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Time</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-secondary outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
                    >
                      Schedule Tour
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Tour Scheduled!</h3>
                  <p className="text-gray-300 mb-6">
                    We'll send you a confirmation email with all the details.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </animated.div>
    </Modal>
  );
};

export default ScheduleTour;
