import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const buildingData = [
  {
    title: "Luxury Sky Tower",
    description: "50-story luxury residential tower with panoramic views and world-class amenities. Experience the pinnacle of urban living with unparalleled luxury and comfort.",
    price: "$8.5M",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
    features: [
      "24/7 Concierge",
      "Infinity Pool",
      "Private Helipad",
      "Smart Home Integration",
      "Private Theater",
      "Wine Cellar"
    ],
    category: "residential"
  },
  {
    title: "The Glass House",
    description: "Modern architectural marvel with sustainable design and cutting-edge technology. A perfect blend of luxury and environmental consciousness.",
    price: "$12.2M",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1",
    features: [
      "Smart Home System",
      "Green Certification",
      "Private Garden",
      "Solar Panels",
      "EV Charging",
      "Rainwater Harvesting"
    ],
    category: "residential"
  },
  {
    title: "Ocean View Plaza",
    description: "Premium commercial space in prime location with state-of-the-art facilities and spectacular ocean views. The perfect setting for your business.",
    price: "$15.8M",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    features: [
      "Grade A Offices",
      "Retail Space",
      "Underground Parking",
      "Conference Center",
      "24/7 Security",
      "High-speed Elevators"
    ],
    category: "commercial"
  },
];

const Buildings = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuildings = buildingData.filter(building => {
    const matchesFilter = filter === 'all' || building.category === filter;
    const matchesSearch = building.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         building.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="buildings" className="py-20 px-6 bg-primary">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Featured Buildings
        </h2>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            {['all', 'residential', 'commercial'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category
                    ? 'bg-secondary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-secondary focus:outline-none"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuildings.map((building, index) => (
            <motion.div
              key={building.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="building-card group cursor-pointer"
              onClick={() => navigate(`/building/${index}`)}
            >
              <img
                src={building.image}
                alt={building.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-0 translate-y-[60%]">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {building.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{building.description}</p>
                <p className="text-3xl font-bold gradient-text mb-4">
                  {building.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-secondary/20 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/40 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Buildings;
