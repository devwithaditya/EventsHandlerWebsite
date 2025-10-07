import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, DollarSign, Users } from 'lucide-react';
import EventRegistration from './EventRegistration';



interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  description: string;
  image: string;
  maxParticipants: number;
  currentParticipants: number;
  spots: number;
  registered: number;
}

interface EventsSectionProps {
  isDarkMode: boolean;
}

export default function EventsSection({ isDarkMode }: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        // Initialize with default events if none exist
        const defaultEvents: Event[] = [
          {
            id: '1',
            title: 'AI & Machine Learning Workshop',
            date: '2024-11-15',
            time: '10:00 AM - 4:00 PM',
            location: 'Tech Lab, Building A',
            price: '₹500',
            category: 'workshop',
            description: 'Learn the fundamentals of AI and ML with hands-on projects and expert guidance.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
            maxParticipants: 50,
            currentParticipants: 23,
            spots: 50,
            registered: 30,
          },
          {
            id: '2',
            title: 'Annual Cultural Festival',
            date: '2024-11-20',
            time: '6:00 PM - 11:00 PM',
            location: 'Main Auditorium',
            price: 'Free',
            category: 'cultural',
            description: 'Celebrate diversity with music, dance, and cultural performances from around the world.',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
            maxParticipants: 500,
            currentParticipants: 234,
            spots: 50,
            registered: 30,
          },
          {
            id: '3',
            title: 'Startup Pitch Competition',
            date: '2024-11-25',
            time: '2:00 PM - 6:00 PM',
            location: 'Innovation Hub',
            price: '₹200',
            category: 'competition',
            description: 'Present your innovative ideas to industry experts and win exciting prizes.',
            image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
            maxParticipants: 30,
            currentParticipants: 18,
            spots: 50,
            registered: 30,
          },
          {
            id: '4',
            title: 'Photography Workshop',
            date: '2024-12-05',
            time: '11:00 AM - 3:00 PM',
            location: 'Art Studio',
            price: '₹300',
            category: 'workshop',
            description: 'Master the art of photography with professional techniques and equipment.',
            image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
            maxParticipants: 25,
            currentParticipants: 12,
            spots: 50,
            registered: 30,
          },
          {
            id: '5',
            title: 'Career Fair 2024',
            date: '2024-12-10',
            time: '10:00 AM - 4:00 PM',
            location: 'Campus Grounds',
            price: 'Free',
            category: 'career',
            description: 'Connect with top companies and explore internship and job opportunities.',
            image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
            maxParticipants: 1000,
            currentParticipants: 456,
            spots: 50,
            registered: 30,
          }
        ];
        setEvents(defaultEvents);
        localStorage.setItem('events', JSON.stringify(defaultEvents));
      }
    };

    loadEvents();

    // Listen for events updates from AdminDashboard
    const handleEventsUpdate = (event: CustomEvent) => {
      setEvents(event.detail);
    };

    window.addEventListener('eventsUpdated', handleEventsUpdate as EventListener);

    return () => {
      window.removeEventListener('eventsUpdated', handleEventsUpdate as EventListener);
    };
  }, []);

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSuccess = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, currentParticipants: event.currentParticipants + 1 }
        : event
    ));
    // Update localStorage
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, currentParticipants: event.currentParticipants + 1 }
        : event
    );
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      competition: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      career: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category as keyof typeof colors] || colors.workshop;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="events" className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Upcoming Events
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join exciting workshops, competitions, and cultural events designed to enhance your skills and expand your network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-2xl'
            }`}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className={`transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/90 text-gray-900'
                  }`}>
                    {event.price}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className={`text-sm line-clamp-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className={`flex items-center text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {formatDate(event.date)}
                  </div>
                  <div className={`flex items-center text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <Clock className="w-4 h-4 mr-2 text-green-600" />
                    {event.time}
                  </div>
                  <div className={`flex items-center text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4 mr-2 text-red-600" />
                    {event.location}
                  </div>
                  <div className={`flex items-center text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <Users className="w-4 h-4 mr-2 text-purple-600" />
                    {event.currentParticipants} / {event.maxParticipants} registered
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => handleRegister(event)}
                    disabled={event.currentParticipants >= event.maxParticipants}
                    className={`w-full transition-all duration-300 ${
                      event.currentParticipants >= event.maxParticipants
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                    }`}
                  >
                    {event.currentParticipants >= event.maxParticipants ? 'Event Full' : 'Register Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No events available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistration
          event={selectedEvent}
          isOpen={isRegistrationOpen}
          onClose={() => {
            setIsRegistrationOpen(false);
            setSelectedEvent(null);
          }}
          onSuccess={handleRegistrationSuccess}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  );
}