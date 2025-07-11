import React, { useState, useEffect } from 'react';
import FunctionCard from './components/FunctionCard';
import { functions } from './data/functions';
import './App.css';
import { FaPhoneAlt, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const DESCRIPTION = "Through creativity, innovation and quality, we empower lives and adding value by our diverse range of organizations, providing excellence in cosmetics, medical products, general essentials, and IT solutions.";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleDescWords, setVisibleDescWords] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [descriptionComplete, setDescriptionComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const words = DESCRIPTION.split(' ').filter(word => word.trim() !== '');
    setVisibleDescWords([]);
    setDescriptionComplete(false);
    setIsInitialized(true);
    
    // Start the word animation after a short delay
    const startDelay = setTimeout(() => {
      // Use a more reliable approach with Promise-based delays
      const animateWordsSequentially = async () => {
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => {
            setTimeout(() => {
              setVisibleDescWords(prev => [...prev, i]);
              resolve();
            }, window.innerWidth <= 768 ? 80 : 100);
          });
        }
        setDescriptionComplete(true);
      };
      
      animateWordsSequentially();
      
      // Fallback: ensure all words are visible after 5 seconds
      const fallback = setTimeout(() => {
        setVisibleDescWords(words.map((_, i) => i));
        setDescriptionComplete(true);
      }, 5000);
      
      return () => clearTimeout(fallback);
    }, 600); // Reduced initial delay for mobile
    
    return () => clearTimeout(startDelay);
  }, []);

  // Cards animation effect - now waits for description to complete
  useEffect(() => {
    if (!isInitialized) return;
    if (descriptionComplete) {
      setVisibleCards([]);
      const timer = setTimeout(() => {
        setTimeout(() => {
          setVisibleCards([0]);
        }, 0);
        for (let i = 1; i < functions.length; i++) {
          setTimeout(() => {
            setVisibleCards(prev => [...prev, i]);
          }, i * 200);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [descriptionComplete, isInitialized]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };



  return (
    <div className={`min-h-screen transition-colors duration-300 metallic-silver-bg ${isDarkMode ? 'dark' : ''}`} style={{background: 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 15%, #808080 30%, #696969 45%, #808080 60%, #a8a8a8 75%, #c0c0c0 100%)'}}>
      {/* Header */}
      <header className="navbar-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dvybb2xnc/image/upload/v1751977454/PMI_Circile_Gray_wiu9mh.png" 
                alt="PMI Logo" 
                className="h-6 sm:h-8 w-auto"
              />
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-extrabold text-white tracking-wide navbar-functions-animate" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
                Functions
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative group">
                <a href="tel:13676757" className="hover:brightness-125" title="Call">
                  <FaPhoneAlt className="w-5 h-5" style={{color: '#22c55e'}} />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  13676757
                </div>
              </div>
              <div className="relative group">
                <a href="https://wa.me/13676757" target="_blank" rel="noopener noreferrer" className="hover:brightness-125" title="WhatsApp">
                  <FaWhatsapp className="w-5 h-5" style={{color: '#25D366'}} />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  WhatsApp: 13676757
                </div>
              </div>
              <div className="relative group">
                <a href="https://www.instagram.com/pmi.me/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="hover:brightness-125" title="Instagram">
                  <FaInstagram className="w-5 h-5" style={{color: '#E1306C'}} />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  @pmi.me
                </div>
              </div>
              <div className="relative group">
                <a href="mailto:pmiteam@pmi-me.net" className="hover:brightness-125" title="Email">
                  <FaEnvelope className="w-5 h-5" style={{color: '#3b82f6'}} />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  pmiteam@pmi-me.net
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ml-2"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section - Functions Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2 sm:gap-4">
              <img 
                src="https://res.cloudinary.com/dvybb2xnc/image/upload/v1751977454/PMI_Circile_Gray_wiu9mh.png" 
                alt="PMI Logo" 
                className="h-12 sm:h-16 w-auto"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide navbar-functions-animate text-center sm:text-left" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
                PMI Functions
              </h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl mb-4 px-4 sm:px-0">
              <span id="desc-blue">
                {DESCRIPTION.split(' ').filter(word => word.trim() !== '').map((word, idx) => (
                  <span
                    key={idx}
                    className={`desc-word${!visibleDescWords.includes(idx) ? ' hidden-word' : ''}${visibleDescWords.includes(idx) ? ' word-animate' : ''}`}
                  >
                    {word}
                  </span>
                )).reduce((prev, curr, idx) => prev === null ? [curr] : [...prev, ' ', curr], null)}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {functions.map((pmFunction, index) => (
              <div
                key={pmFunction.id}
                className={`h-full transition-opacity duration-200 ${
                  visibleCards.includes(index) 
                    ? 'card-animate-in' 
                    : 'opacity-0'
                }`}
              >
                <FunctionCard 
                  function={pmFunction} 
                  isDetailView={false}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section - Function Description */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
              Function Description
            </h2>
          </div>
          <div className="space-y-8">
            {functions.map((pmFunction) => (
              <FunctionCard 
                key={`detail-${pmFunction.id}`} 
                function={pmFunction} 
                isDetailView={true}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="navbar-gradient border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <span className='text-white'>© 2021 All rights reserved.</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              <span className='text-white'>This is a showcase website for PMI functions and methodologies.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
