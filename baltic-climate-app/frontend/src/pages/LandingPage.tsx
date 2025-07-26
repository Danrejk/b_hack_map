import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Users, 
  TrendingUp, 
  Shield, 
  Waves, 
  Thermometer, 
  TreePine, 
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Globe,
  BarChart3,
  Target
} from 'lucide-react';

// Success Stories Data
// Success Stories Data
const successStories = [
  {
    id: 1,
    title: "Green Kayak: One Paddle at a Time",
    description:
        "Founded in Denmark and now active in multiple Baltic cities (Copenhagen, Helsinki, Stockholm, Gdańsk), Green Kayak empowers volunteers to rent kayaks for free by collecting rubbish as they paddle. By removing over 150,000kg of waste, the initiative fosters outdoor activity while raising awareness and stewardship of the Baltic waters.",
    location: "Copenhagen, Denmark & Baltic cities",
    impact: "150,000kg+ waste removed",
    image: "/story1.jpeg",
    countryEmoji: "🇩🇰",
    stats: {
      reduction: "150,000kg+ waste",
      timeframe: "2017–2025",
      participants: "Thousands of volunteers"
    },
    projectLink: "https://www.greenkayak.org/about-us/",
  },
  {
    id: 2,
    title: "MyForest: Latvia’s Urban Green Crown",
    description:
        "Citizens across Latvia, especially in Riga, reclaim climate action by collectively purchasing and reforesting land, creating new carbon sinks and habitats. Riga's urban forests, constituting 60,000+ hectares, are FSC certified and managed for recreation, biodiversity - providing clean air and easy nature access to over a million people.",
    location: "Riga, Latvia",
    impact: "60,000+ hectares of urban forest",
    image: "/story2.jpeg",
    countryEmoji: "🇱🇻",
    stats: {
      reduction: "FSC-certified lands",
      timeframe: "2015–2025",
      participants: "1M+ residents"
    },
    projectLink: "https://fsc.org/en/newscentre/general-news/urban-forest-of-the-baltic-states-largest-capital-now-certified"
  },
  {
    id: 3,
    title: "Let’s Do It World: From Estonia to the Globe",
    description:
        "Starting in Estonia in 2008, Let’s Do It World saw 50,000 volunteers remove 10,000 tons of illegal waste in a single day. It evolved into World Cleanup Day, mobilizing tens of millions in nearly 200 countries yearly. The movement reduces illegal dumping and drives civic engagement from the Baltic to the world.",
    location: "Tallinn, Estonia & Worldwide",
    impact: "50,000+ Estonians, now global",
    image: "/story3.jpeg",
    countryEmoji: "🇪🇪",
    stats: {
      reduction: "10,000 tons waste",
      timeframe: "2008–2025",
      participants: "Millions globally"
    },
    projectLink: "https://letsdoitworld.org/"
  }
];


const LandingPage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-28 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-cyan-100 rounded-full opacity-15"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-64 h-64 bg-teal-100 rounded-full opacity-25"
            animate={{
              y: [0, -25, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg">
                <Waves className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Baltic Sea
              <span className="block text-5xl md:text-7xl mt-2">Climate Solutions</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Empowering policymakers and communities with <span className="text-blue-600 font-semibold">real-time climate data</span>, 
              <span className="text-cyan-600 font-semibold"> interactive visualizations</span>, and 
              <span className="text-teal-600 font-semibold"> proven success stories</span> to protect our shared maritime heritage.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link
                to="/map"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Globe className="h-6 w-6" />
                <span>Explore Interactive Map</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/call-to-action"
                className="group bg-white hover:bg-gray-50 text-blue-600 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Target className="h-6 w-6" />
                <span>Join Climate Action</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Award className="h-10 w-10 text-yellow-400 mr-3" />
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                Success Stories
              </h2>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover how Baltic Sea nations are leading the fight against climate change with 
              innovative solutions and measurable results that inspire global action.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <a
                  href={successStories[currentStory].projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                  style={{ textDecoration: 'none' }}
              >
                <motion.div
                    key={currentStory}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl cursor-pointer transition-transform hover:scale-105"
                >

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Story Content */}
                  <div className="text-white">
                    <div className="flex items-center mb-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                          <span className="mr-3" style={{ fontSize: '3rem', lineHeight: 1 }}>{successStories[currentStory].countryEmoji}</span>
                          {successStories[currentStory].title}
                        </h3>


                        <p className="text-blue-200 text-lg">{successStories[currentStory].location}</p>
                      </div>
                    </div>
                    
                    <p className="text-xl leading-relaxed mb-8 text-blue-50">
                      {successStories[currentStory].description}
                    </p>
                    
                    <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                      <h4 className="text-yellow-400 font-semibold text-lg mb-4">Key Impact Metrics</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {successStories[currentStory].stats.reduction}
                          </div>
                          <div className="text-blue-200 text-sm">Impact</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {successStories[currentStory].stats.timeframe}
                          </div>
                          <div className="text-blue-200 text-sm">Timeline</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {successStories[currentStory].stats.participants}
                          </div>
                          <div className="text-blue-200 text-sm">Participants</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="flex items-center justify-center">
                    <img
                        src={successStories[currentStory].image}
                        alt={successStories[currentStory].title}
                        className="rounded-3xl shadow-2xl w-full object-cover object-center"
                        style={{ maxWidth: '480px', height: '28rem' }}
                    />


                  </div>
                </div>
                </motion.div>
              </a>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center mt-8 space-x-6">
              <button
                onClick={prevStory}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStory 
                        ? 'bg-yellow-400 scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  />
                ))}
              </div>

              <button
                onClick={nextStory}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-blue-200 hover:text-white text-sm flex items-center justify-center space-x-2 mx-auto transition-colors"
              >
                <Play className={`h-4 w-4 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`} />
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent mb-8">
              Comprehensive Climate Intelligence
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Advanced tools and real-time data to understand, visualize, and act on climate challenges 
              across the Baltic Sea region with unprecedented accuracy and insight.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1: Interactive Maps */}
            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interactive Climate Maps</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-center">
                Explore dynamic visualizations of temperature changes, sea level rise, flooding risks, 
                and coastal erosion with our advanced mapping technology powered by real-time satellite data.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">Real-time</div>
                    <div className="text-sm text-gray-600">Data Updates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">9 Countries</div>
                    <div className="text-sm text-gray-600">Coverage</div>
                  </div>
                </div>
              </div>
              <Link
                to="/map"
                className="group/link bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <span>Explore Maps</span>
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Feature 2: Community Action */}
            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100 hover:border-green-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Community Action Hub</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-center">
                Connect with local initiatives, organize climate actions, and collaborate with governments, 
                NGOs, and citizens across the Baltic region to create meaningful environmental impact.
              </p>
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">500+</div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">50K+</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                </div>
              </div>
              <Link
                to="/call-to-action"
                className="group/link bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <span>Join Actions</span>
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Feature 3: Data Analytics */}
            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-purple-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Advanced Analytics</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-center">
                Access comprehensive environmental data, predictive modeling, and scientific research 
                to understand climate patterns and make informed policy decisions with confidence.
              </p>
              <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">AI-Powered</div>
                    <div className="text-sm text-gray-600">Predictions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">Monitoring</div>
                  </div>
                </div>
              </div>
              <Link
                to="/register"
                className="group/link bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <span>View Analytics</span>
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), 
                               radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), 
                 radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`,
                `radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), 
                 radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`,
                `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), 
                 radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Thermometer className="h-10 w-10 text-red-400 mr-3" />
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                Climate Emergency Data
              </h2>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Critical environmental indicators reveal the urgent need for immediate, 
              coordinated action to protect this vital marine ecosystem and the millions who depend on it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-red-400 mb-3">+2.1°C</div>
              <div className="text-blue-200 font-medium text-lg mb-2">Temperature Rise</div>
              <div className="text-blue-300 text-sm">Since pre-industrial levels</div>
            </motion.div>

            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-blue-400 mb-3">30%</div>
              <div className="text-blue-200 font-medium text-lg mb-2">Sea Ice Loss</div>
              <div className="text-blue-300 text-sm">In the past 40 years</div>
            </motion.div>

            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-5xl font-bold text-cyan-400 mb-3">25cm</div>
              <div className="text-blue-200 font-medium text-lg mb-2">Sea Level Rise</div>
              <div className="text-blue-300 text-sm">Projected by 2100</div>
            </motion.div>

            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-5xl font-bold text-yellow-400 mb-3">85M</div>
              <div className="text-blue-200 font-medium text-lg mb-2">People At Risk</div>
              <div className="text-blue-300 text-sm">Across Baltic region</div>
            </motion.div>
          </div>

          {/* Additional Impact Metrics */}
          <motion.div 
            className="mt-16 grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center text-white">
              <TreePine className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold mb-2">40%</div>
              <div className="text-blue-200">Coastal Forests Lost</div>
            </div>
            <div className="text-center text-white">
              <Waves className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold mb-2">15%</div>
              <div className="text-blue-200">Marine Species Decline</div>
            </div>
            <div className="text-center text-white">
              <Shield className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <div className="text-3xl font-bold mb-2">€12B</div>
              <div className="text-blue-200">Annual Climate Damage</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full opacity-15"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-3xl inline-block mb-8 shadow-2xl">
              <Shield className="h-16 w-16 text-white" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
              Join the Baltic
              <span className="block">Climate Alliance</span>
            </h2>
            
            <p className="text-2xl mb-12 text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Be part of a growing movement of <span className="text-blue-600 font-bold">policymakers</span>, 
              <span className="text-cyan-600 font-bold"> scientists</span>, and 
              <span className="text-teal-600 font-bold"> activists</span> working together to implement 
              data-driven climate solutions across the Baltic Sea region.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                <Users className="h-7 w-7" />
                <span>Join Our Community</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/map"
                className="group bg-white hover:bg-gray-50 text-blue-600 px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center space-x-3 border-2 border-blue-200 hover:border-blue-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
              >
                <Globe className="h-7 w-7" />
                <span>Start Exploring</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">9 Countries</div>
                <div className="text-gray-600">Collaborative Partnership</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+ Institutions</div>
                <div className="text-gray-600">Research & Policy Partners</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">Real-time Data</div>
                <div className="text-gray-600">Continuous Monitoring</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
