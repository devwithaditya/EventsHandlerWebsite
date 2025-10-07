import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { toast } from 'sonner';


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

interface EventRegistrationProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSuccess: (eventId: string) => void;
}

export default function EventRegistration({ event, isOpen, onClose, isDarkMode }: EventRegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    year: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.studentId) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate registration
    toast.success(`Successfully registered for ${event.title}! Check your email for confirmation.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      year: '',
      department: ''
    });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      Competition: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Career: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            Event Registration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Info Card */}
          <Card className={`transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {event.title}
                </h3>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </div>
              
              <p className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {event.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  {event.time}
                </div>
                
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  {event.location}
                </div>
                
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Users className="w-4 h-4 mr-2 text-orange-600" />
                  {event.spots - event.registered} spots remaining
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {event.price}
                  </span>
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Registration Fee
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="email" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="studentId" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Student ID *
                </Label>
                <Input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Academic Year
                </Label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div>
                <Label htmlFor="department" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className={`flex-1 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
              >
                Register Now
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}