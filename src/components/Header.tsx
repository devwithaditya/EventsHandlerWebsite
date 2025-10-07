import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Moon, Sun } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

interface User {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'student';
}

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  // Get users from localStorage or initialize with default admin
  const getUsers = (): User[] => {
    const stored = localStorage.getItem('users');
    if (stored) {
      return JSON.parse(stored);
    }
    const defaultUsers = [
      { email: 'adi@gmail.com', password: '12345', name: 'Admin', role: 'admin' as const }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    const foundUser = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    
    if (foundUser) {
      setUser(foundUser);
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error('Invalid email or password. Please sign up if you don\'t have an account.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (signupForm.password.length < 5) {
      toast.error('Password must be at least 5 characters long!');
      return;
    }

    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === signupForm.email)) {
      toast.error('User with this email already exists!');
      return;
    }

    // Create new user
    const newUser: User = {
      email: signupForm.email,
      password: signupForm.password,
      name: signupForm.name,
      role: 'student'
    };

    users.push(newUser);
    saveUsers(users);
    
    setUser(newUser);
    setIsSignupOpen(false);
    setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
    toast.success(`Welcome ${newUser.name}! Your account has been created successfully.`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdminOpen(false);
    toast.success('Logged out successfully!');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60' 
        : 'bg-white/95 border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-white/60'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold transition-colors duration-300`}>
            C
          </div>
          <div>
            <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              CEC Events
            </h1>
            <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Events Portal
            </p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('events')} 
            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Events
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className={`relative overflow-hidden transition-all duration-500 ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className={`absolute inset-0 transition-transform duration-500 ${isDarkMode ? 'rotate-0' : 'rotate-180'}`}>
              <Moon className={`h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isDarkMode ? 'opacity-100 text-yellow-400' : 'opacity-0'
              }`} />
            </div>
            <div className={`absolute inset-0 transition-transform duration-500 ${isDarkMode ? 'rotate-180' : 'rotate-0'}`}>
              <Sun className={`h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isDarkMode ? 'opacity-0' : 'opacity-100 text-yellow-500'
              }`} />
            </div>
          </Button>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome, {user.name}
              </span>
              
              {user.role === 'admin' && (
                <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
                      Admin Dashboard
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <DialogHeader>
                      <DialogTitle className={`text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                        Admin Dashboard
                      </DialogTitle>
                    </DialogHeader>
                    <AdminDashboard isDarkMode={isDarkMode} />
                  </DialogContent>
                </Dialog>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              {/* Login Dialog */}
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className={`transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <DialogHeader>
                    <DialogTitle className={`text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                      Login to CEC Events
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
                      Login
                    </Button>
                    <p className={`text-center text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginOpen(false);
                          setIsSignupOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign up here
                      </button>
                    </p>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Signup Dialog */}
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className={`transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <DialogHeader>
                    <DialogTitle className={`text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                      Create Your Account
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                        required
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        required
                        minLength={5}
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        required
                        className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
                      Create Account
                    </Button>
                    <p className={`text-center text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignupOpen(false);
                          setIsLoginOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Login here
                      </button>
                    </p>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}