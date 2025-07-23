import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaChartLine, FaRobot, FaShieldAlt, FaQuestionCircle, FaArrowRight, FaRegNewspaper, FaRegBell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Documentation', href: '#docs' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Security', href: '#security' },
      { name: 'Compliance', href: '#compliance' }
    ]
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:contact@stockgorithm.com', label: 'Email' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Add your newsletter subscription logic here
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                <FaRegNewspaper className="text-indigo-400" />
                Stay Ahead of the Market
              </h3>
              <p className="text-gray-300 max-w-md">
                Get exclusive market insights, trading strategies, and real-time updates delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <FaRegBell className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <FaArrowRight />
                </motion.button>
              </div>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2 text-center sm:text-left"
                >
                  Thanks for subscribing! 🎉
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stockgorithm
              </span>
            </motion.div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Empowering investors with AI-driven market insights and automated trading strategies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-xl" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <motion.div 
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <FaRobot className="text-indigo-500" />
              <span className="text-sm">AI-Powered Analysis</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <FaShieldAlt className="text-indigo-500" />
              <span className="text-sm">Secure Trading</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <FaQuestionCircle className="text-indigo-500" />
              <span className="text-sm">24/7 Support</span>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Stockgorithm. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                Made with <span className="text-red-500">❤️</span> for smart investors
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
