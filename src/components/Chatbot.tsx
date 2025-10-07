import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isDarkMode: boolean;
}

export default function Chatbot({ isDarkMode }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your CEC Events assistant. I can help you find information about our events. Try asking me about 'AI workshop', 'cultural fest', 'robotics challenge', or 'startup competition'!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const events = [
    {
      keywords: ['ai', 'machine learning', 'ml', 'artificial intelligence', 'workshop'],
      title: 'AI & Machine Learning Workshop',
      date: 'November 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Tech Lab, Building A',
      price: '₹500',
      description: 'Learn the fundamentals of AI and ML with hands-on projects and expert guidance.'
    },
    {
      keywords: ['cultural', 'festival', 'music', 'dance', 'performance'],
      title: 'Annual Cultural Festival',
      date: 'November 20, 2024',
      time: '6:00 PM - 11:00 PM',
      location: 'Main Auditorium',
      price: 'Free',
      description: 'Celebrate diversity with music, dance, and cultural performances from around the world.'
    },
    {
      keywords: ['startup', 'pitch', 'competition', 'business', 'entrepreneur'],
      title: 'Startup Pitch Competition',
      date: 'November 25, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Innovation Hub',
      price: '₹200',
      description: 'Present your innovative ideas to industry experts and win exciting prizes.'
    },
    {
      keywords: ['robotics', 'robot', 'challenge', 'programming', 'engineering'],
      title: 'Robotics Challenge',
      date: 'December 1, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Engineering Lab',
      price: '₹800',
      description: 'Build and program robots to compete in exciting challenges and obstacles.'
    },
    {
      keywords: ['photography', 'photo', 'camera', 'art', 'creative'],
      title: 'Photography Workshop',
      date: 'December 5, 2024',
      time: '11:00 AM - 3:00 PM',
      location: 'Art Studio',
      price: '₹300',
      description: 'Master the art of photography with professional techniques and equipment.'
    },
    {
      keywords: ['career', 'job', 'internship', 'fair', 'company'],
      title: 'Career Fair 2024',
      date: 'December 10, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Campus Grounds',
      price: 'Free',
      description: 'Connect with top companies and explore internship and job opportunities.'
    }
  ];

  const findEventByKeywords = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return events.find(event => 
      event.keywords.some(keyword => lowerQuery.includes(keyword))
    );
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for event-specific queries
    const matchedEvent = findEventByKeywords(userMessage);
    
    if (matchedEvent) {
      return `🎉 **${matchedEvent.title}**

📅 **Date:** ${matchedEvent.date}
⏰ **Time:** ${matchedEvent.time}
📍 **Location:** ${matchedEvent.location}
💰 **Price:** ${matchedEvent.price}

📝 **About:** ${matchedEvent.description}

Would you like to register for this event? Click "Register Now" on the event card in the Events section!`;
    }

    // General queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Welcome to CEC Events! I can help you find information about our upcoming events. What are you interested in?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you with information about our events! Try asking me about:\n\n• AI workshop\n• Cultural festival\n• Robotics challenge\n• Startup competition\n• Photography workshop\n• Career fair\n\nJust mention any of these topics and I'll give you all the details!";
    }
    
    if (lowerMessage.includes('events') || lowerMessage.includes('what')) {
      return "We have amazing events coming up! Here are some highlights:\n\n🤖 AI & Machine Learning Workshop\n🎭 Annual Cultural Festival\n🚀 Startup Pitch Competition\n🤖 Robotics Challenge\n📸 Photography Workshop\n💼 Career Fair 2024\n\nAsk me about any specific event for detailed information!";
    }
    
    if (lowerMessage.includes('register') || lowerMessage.includes('registration')) {
      return "To register for any event:\n\n1. Scroll to the Events section\n2. Find the event you're interested in\n3. Click the 'Register Now' button\n4. Fill out the registration form\n\nYou'll need to be logged in to register. If you don't have an account, click 'Sign Up' in the header!";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return "Our event prices vary:\n\n💰 **Paid Events:**\n• AI Workshop: ₹500\n• Robotics Challenge: ₹800\n• Photography Workshop: ₹300\n• Startup Competition: ₹200\n\n🆓 **Free Events:**\n• Cultural Festival\n• Career Fair\n\nAsk about a specific event for exact pricing!";
    }
    
    // Default response for unrecognized queries
    return "I'm not sure about that specific question, but I'm here to help with event information! 🤔\n\nTry asking me about:\n• Specific events (AI, cultural, robotics, etc.)\n• Event dates and times\n• Registration process\n• Event prices\n\nWhat would you like to know about our events?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-24 right-6 z-40 w-96 h-[500px] shadow-2xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <CardHeader className={`pb-3 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200'
          }`}>
            <CardTitle className={`text-lg font-semibold flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Bot className="w-5 h-5 mr-2 text-blue-600" />
              CEC Events Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.isBot ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[280px] p-3 rounded-lg transition-colors duration-300 ${
                        message.isBot
                          ? isDarkMode
                            ? 'bg-gray-800 text-gray-200 border border-gray-700'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line break-words">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.isBot 
                          ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          : 'text-blue-100'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {!message.isBot && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}>
                        <User className={`w-4 h-4 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className={`p-4 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about events..."
                  className={`flex-1 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}