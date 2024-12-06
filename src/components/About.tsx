import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-parallax';

const stats = [
  { number: '15+', text: 'Years of Excellence' },
  { number: '200+', text: 'Premium Properties' },
  { number: '1000+', text: 'Happy Clients' },
  { number: '50+', text: 'Awards Won' },
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative">
      <Parallax
        blur={0}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
        bgImageAlt="Luxury Building"
        strength={200}
      >
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="absolute inset-0 bg-black/70" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Building Dreams Since 2008
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                We specialize in creating extraordinary living spaces that combine luxury, 
                innovation, and sustainability. Our commitment to excellence has made us 
                the leading name in premium real estate.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300">{stat.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['Innovation', 'Sustainability', 'Excellence'].map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glassmorphism p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{value}</h3>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default About;
