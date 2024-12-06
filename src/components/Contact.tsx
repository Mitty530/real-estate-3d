import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [messages, setMessages] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input Changed:', name, value);
    setFormData({ ...formData, [name]: value });
  };

  const saveMessageToFile = (message) => {
    // Simulate saving to a text file by logging the message
    console.log('Simulating saving to file:', JSON.stringify(message));
    // In a real application, you would send the message to a server to save it to a file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    saveMessageToFile(formData);
    setConfirmationMessage('Your message has been sent.');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Get in Touch
          </h2>

          {confirmationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-500 text-white text-center py-3 px-6 rounded-lg shadow-lg mb-6"
            >
              {confirmationMessage}
            </motion.div>
          )}

          <div className="flex items-center space-x-6 mb-12">
            <img
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHNwZWNpYWxpc3R8ZW58MHx8fHwxNjE5NTYwNjY2&ixlib=rb-1.2.1&q=80&w=400"
              alt="Specialist"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">John Doe</h3>
              <p className="text-gray-300">Real Estate Specialist</p>
              <p className="text-gray-300">With over 10 years of experience, John is here to help you find your dream property.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">
                Contact Information
              </h3>
              <p className="text-gray-300">
                Ready to find your dream property? Contact us today and let our experts guide you through the process.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">contact@luxurybuildings.com</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white focus:border-secondary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white focus:border-secondary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white focus:border-secondary outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white focus:border-secondary outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/80 transition-colors"
              >
                Send Message
              </button>
            </motion.div>
          </form>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Sent Messages</h3>
            <ul className="space-y-4">
              {messages.map((msg, index) => (
                <li key={index} className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-300"><strong>Name:</strong> {msg.firstName} {msg.lastName}</p>
                  <p className="text-gray-300"><strong>Email:</strong> {msg.email}</p>
                  <p className="text-gray-300"><strong>Message:</strong> {msg.message}</p>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
