import React from 'react';
import { motion } from 'framer-motion';
import { Book, Award, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Book />, label: 'Diverse Genres', value: '50+' },
    { icon: <Award />, label: 'Best Sellers', value: '200+' },
    { icon: <Users />, label: 'Happy Readers', value: '15k+' },
    { icon: <ShieldCheck />, label: 'Secure Delivery', value: '100%' },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop" 
                alt="Library" 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">A Peaceful Place for <span className="text-primary-600">Book Lovers</span></h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At SapienBooks, we think every book is a path to a new story. We want to help you find books that make you happy and help you learn. We started in 2026 as a small shop and now we help readers everywhere find their next favorite book.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="bg-primary-50 p-3 rounded-xl text-primary-600">
                    {React.cloneElement(stat.icon, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
