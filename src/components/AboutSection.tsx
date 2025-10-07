import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Users, Trophy, Calendar } from 'lucide-react';

interface AboutSectionProps {
  isDarkMode: boolean;
}

export default function AboutSection({ isDarkMode }: AboutSectionProps) {
  const features = [
    {
      icon: Calendar,
      title: "Event Discovery",
      description: "Find and explore a wide variety of college events, from workshops to cultural festivals."
    },
    {
      icon: Users,
      title: "Easy Registration",
      description: "Simple and quick registration process for all events with instant confirmation."
    },
    {
      icon: Lightbulb,
      title: "Skill Development",
      description: "Participate in workshops and competitions to enhance your skills and knowledge."
    },
    {
      icon: Trophy,
      title: "Recognition",
      description: "Earn certificates and recognition for your participation and achievements."
    }
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose EventHub?
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your gateway to amazing college experiences and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className={`text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10' 
                : 'bg-white border-gray-200 hover:shadow-2xl'
            }`}>
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={`text-xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`rounded-2xl p-8 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Join Our Community
            </h3>
            <p className={`text-lg mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              EventHub is more than just an event platform - it's a community of passionate students, 
              innovative thinkers, and future leaders. Connect with like-minded peers, discover new 
              interests, and build lasting relationships that will shape your college experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  5000+
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Active Students
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Events Monthly
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}