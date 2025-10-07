import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Trophy, Star } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  const [stats, setStats] = useState({
    events: 0,
    participants: 0,
    awards: 0,
    rating: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const targets = { events: 150, participants: 5000, awards: 25, rating: 4.8 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          events: Math.floor(targets.events * progress),
          participants: Math.floor(targets.participants * progress),
          awards: Math.floor(targets.awards * progress),
          rating: Math.round(targets.rating * progress * 10) / 10
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targets);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative py-20 overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Static background elements - no animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 transition-colors duration-300 ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 transition-colors duration-300 ${
          isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
        }`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Discover Amazing
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              College Events
            </span>
          </h1>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-colors  ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of students in exciting workshops, competitions, and cultural events. 
            Build skills, make connections, and create unforgettable memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Events
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={`px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Statistics - no animation on containers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <div className={`text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg'
            }`}>
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.events}+
              </div>
              <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Events Hosted
              </div>
            </div>

            <div className={`text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg'
            }`}>
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.participants.toLocaleString()}+
              </div>
              <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Participants
              </div>
            </div>

            <div className={`text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg'
            }`}>
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.awards}+
              </div>
              <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Awards Given
              </div>
            </div>

            <div className={`text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg'
            }`}>
              <Star className="w-8 h-8 mx-auto mb-2 text-pink-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.rating}
              </div>
              <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}