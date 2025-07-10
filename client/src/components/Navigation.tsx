import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Grid3X3, 
  CalendarDays, 
  Users2, 
  ScanLine, 
  Send, 
  UserPlus,
  Settings2,
  LogOut,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Grid3X3, label: 'Dashboard' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
  { path: '/scan', icon: ScanLine, label: 'Scan Cards' },
  { path: '/contacts', icon: Users2, label: 'Contacts' },
  { path: '/emails', icon: Send, label: 'Emails' },
];

// AI Orb Component
function AIOrb({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="flex items-center space-x-3 flex-shrink-0">
      <button 
        className="group relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl flex-shrink-0"
        title="AI Assistant"
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-500 animate-pulse opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-yellow-500 to-emerald-600 animate-spin opacity-70" style={{animationDuration: '8s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-700 via-teal-500 to-amber-600 animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
        
        {/* Orb surface with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 backdrop-blur-sm"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white/90 group-hover:text-white transition-colors" />
        </div>
        
        {/* Hover effect ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-500 via-amber-500 to-yellow-500 opacity-0 group-hover:opacity-40 transition-opacity blur-sm"></div>
      </button>
      
      {isExpanded && (
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-sm">Ask AI</span>
          <span className="text-gray-500 text-xs">Assistant</span>
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        {/* Top Row */}
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 flex-shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-gray-800 truncate">
                <span className="text-emerald-800">NewEra</span>
                <span className="text-lime-500 text-xs ml-1 uppercase tracking-wide">Connect</span>
              </h1>
              <p className="text-xs text-gray-500 truncate">Business Network Engagement</p>
            </div>
          </div>
          <div className="ml-3">
            <AIOrb isExpanded={false} />
          </div>
        </div>
        
        {/* Action Buttons Row */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 justify-center">
            <Button size="sm" variant="outline" className="w-56 text-xs justify-center">
              <CalendarDays className="w-3 h-3 mr-1" />
              Events
            </Button>
            <Button size="sm" className="w-56 bg-lime-500 hover:bg-lime-600 text-white text-xs justify-center">
              <UserPlus className="w-3 h-3 mr-1" />
              Scan Card
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`
        hidden md:block fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300
        ${isExpanded ? 'w-56' : 'w-20'}
      `}>
        <div className="flex flex-col h-full">
          {/* Desktop Header with Logo and Toggle */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AIOrb isExpanded={isExpanded} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8 flex-shrink-0 rounded-xl"
              >
                {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Desktop Search Bar (only when expanded) */}
          {isExpanded && (
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-lime-500 focus:bg-white rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Desktop Overview Section */}
          {isExpanded && (
            <div className="px-4 pt-6 pb-2">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Overview</span>
            </div>
          )}
          
          {/* Desktop Navigation */}
          <nav className={`flex-1 ${isExpanded ? 'px-4' : 'px-3 pt-6'}`}>
            <div className="space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center transition-all duration-200 rounded-xl
                      ${isExpanded 
                        ? 'px-3 py-2.5 space-x-3' 
                        : 'justify-center w-14 h-12 mx-auto'
                      }
                      ${isActive 
                        ? 'bg-amber-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Add New Section (when expanded) */}
          {isExpanded && (
            <div className="px-4 py-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-3" />
                <span className="text-sm">Add New</span>
              </Button>
            </div>
          )}
          
          {/* Desktop Bottom Actions */}
          <div className={`${isExpanded ? 'p-4' : 'p-3'} border-t border-gray-200`}>
            <div className={`${isExpanded ? 'space-y-1' : 'space-y-2'}`}>
              <Button
                variant="ghost"
                className={`
                  transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-xl
                  ${isExpanded 
                    ? 'w-full justify-start px-3 py-2' 
                    : 'w-14 h-12 mx-auto'
                  }
                `}
              >
                <Settings2 className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="ml-3 font-medium text-sm">Settings</span>}
              </Button>
              <Button
                variant="ghost"
                className={`
                  transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-xl
                  ${isExpanded 
                    ? 'w-full justify-start px-3 py-2' 
                    : 'w-14 h-12 mx-auto'
                  }
                `}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="ml-3 font-medium text-sm">Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        md:hidden fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300 w-64
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-4 border-b border-gray-200 mt-24">
            <AIOrb isExpanded={true} />
          </div>

          {/* Mobile Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-lime-500 focus:bg-white rounded-xl"
              />
            </div>
          </div>

          {/* Mobile Overview Section */}
          <div className="px-4 pt-6 pb-2">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Overview</span>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center px-3 py-3 space-x-3 transition-all duration-200 rounded-xl
                      ${isActive 
                        ? 'bg-amber-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Add New Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-3" />
              <span className="text-sm">Add New</span>
            </Button>
          </div>
          
          {/* Mobile Bottom Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-xl"
              >
                <Settings2 className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3 font-medium text-sm">Settings</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-xl"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3 font-medium text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? '' : (isExpanded ? 'ml-56' : 'ml-20')
      }`}>
        {/* Desktop Top Header */}
        <header className="hidden md:block bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-baseline">
                <span className="font-playfair text-2xl text-emerald-800">NewEra</span>
                <span className="font-garamond text-xs ml-2 uppercase tracking-wide opacity-80 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">Connect</span>
              </h1>
              <p className="text-xs text-gray-500">Business Network Engagement System</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                View Events
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200 rounded-xl"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Scan Card
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-32 md:pt-[90px] px-4 md:px-8 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200
                  ${isActive 
                    ? 'text-amber-600' 
                    : 'text-gray-400 hover:text-gray-600'
                  }
                `}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 