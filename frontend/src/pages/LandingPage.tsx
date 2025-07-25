import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, TrendingUp, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extralight text-black mb-8 tracking-tight">
              Protecting the
              <span className="block font-light">Baltic Sea</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Visualize climate risks, track environmental changes, and join collective action 
              to preserve the Baltic Sea ecosystem for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/map"
                className="bg-black hover:bg-gray-900 text-white px-8 py-4 text-base font-light transition-colors flex items-center justify-center space-x-2 border border-black"
              >
                <MapPin className="h-4 w-4" />
                <span>Explore Climate Map</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/call-to-action"
                className="bg-white hover:bg-gray-50 text-black px-8 py-4 text-base font-light transition-colors flex items-center justify-center space-x-2 border border-black"
              >
                <Users className="h-4 w-4" />
                <span>Take Action</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Understanding Climate Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Our platform combines real-time data, visualization tools, and community action 
              to address climate challenges in the Baltic Sea region.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Interactive Maps */}
            <div className="bg-white border border-gray-200 p-12 text-center">
              <div className="border border-gray-300 w-16 h-16 flex items-center justify-center mx-auto mb-8">
                <MapPin className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-light text-black mb-6">Interactive Climate Maps</h3>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                Explore real-time climate data, temperature changes, and environmental 
                indicators across the Baltic Sea region with our interactive mapping tools.
              </p>
              <Link
                to="/map"
                className="text-black hover:text-gray-600 font-light flex items-center justify-center space-x-1 transition-colors"
              >
                <span>View Maps</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Feature 2: Community Action */}
            <div className="bg-white border border-gray-200 p-12 text-center">
              <div className="border border-gray-300 w-16 h-16 flex items-center justify-center mx-auto mb-8">
                <Users className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-light text-black mb-6">Community Action</h3>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                Join local initiatives, organize climate actions, and connect with others 
                who are passionate about protecting the Baltic Sea ecosystem.
              </p>
              <Link
                to="/call-to-action"
                className="text-black hover:text-gray-600 font-light flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Get Involved</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Feature 3: Data Insights */}
            <div className="bg-white border border-gray-200 p-12 text-center">
              <div className="border border-gray-300 w-16 h-16 flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-light text-black mb-6">Data-Driven Insights</h3>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                Access comprehensive environmental data, trend analysis, and scientific 
                research to understand climate patterns and their impact.
              </p>
              <Link
                to="/register"
                className="text-black hover:text-gray-600 font-light flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              The Baltic Sea at Risk
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Critical environmental indicators show the urgent need for action 
              to protect this vital ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-extralight text-white mb-3">+2.1°C</div>
              <div className="text-gray-400 font-light">Temperature Increase</div>
            </div>
            <div>
              <div className="text-4xl font-extralight text-white mb-3">30%</div>
              <div className="text-gray-400 font-light">Sea Ice Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-extralight text-white mb-3">15cm</div>
              <div className="text-gray-400 font-light">Sea Level Rise</div>
            </div>
            <div>
              <div className="text-4xl font-extralight text-white mb-3">85M</div>
              <div className="text-gray-400 font-light">People Affected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-12 w-12 mx-auto mb-8 text-black" />
          <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
            Be Part of the Solution
          </h2>
          <p className="text-lg mb-12 text-gray-600 font-light leading-relaxed">
            Join thousands of individuals and organizations working together to protect 
            the Baltic Sea. Every action counts in our fight against climate change.
          </p>
          <Link
            to="/register"
            className="bg-black hover:bg-gray-900 text-white px-8 py-4 text-base font-light transition-colors inline-flex items-center space-x-2 border border-black"
          >
            <span>Join Our Community</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
