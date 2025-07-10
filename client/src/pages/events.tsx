import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GridCardCarousel, HorizontalCardCarousel } from '@/components/ui/carousel';
import { Calendar, MapPin, Users, Plus, Clock } from 'lucide-react';

// Mock data - replace with actual API calls
const mockEvents = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: '2024-03-15',
    location: 'Convention Center',
    attendees: 45,
    status: 'upcoming',
    description: 'Annual technology conference featuring the latest innovations.'
  },
  {
    id: 2,
    name: 'Business Networking Mixer',
    date: '2024-02-28',
    location: 'Downtown Hotel',
    attendees: 23,
    status: 'completed',
    description: 'Monthly networking event for local business professionals.'
  },
  {
    id: 3,
    name: 'Startup Pitch Night',
    date: '2024-04-10',
    location: 'Innovation Hub',
    attendees: 67,
    status: 'upcoming',
    description: 'Local startups present their ideas to investors and mentors.'
  },
  {
    id: 4,
    name: 'Industry Summit',
    date: '2024-01-20',
    location: 'Conference Hall',
    attendees: 89,
    status: 'completed',
    description: 'Annual summit bringing together industry leaders.'
  },
  {
    id: 5,
    name: 'Product Launch Event',
    date: '2024-05-05',
    location: 'Tech Campus',
    attendees: 156,
    status: 'upcoming',
    description: 'Exclusive launch event for our latest product release.'
  },
  {
    id: 6,
    name: 'AI Workshop Series',
    date: '2024-03-22',
    location: 'Learning Center',
    attendees: 34,
    status: 'upcoming',
    description: 'Hands-on workshop series covering AI fundamentals.'
  }
];

function EventCard({ event }: { event: typeof mockEvents[0] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'upcoming' 
      ? 'bg-lime-100 text-lime-700 border-lime-200' 
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
              {event.name}
            </CardTitle>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
          <div className="text-lime-600">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            {event.attendees} contacts
          </div>
        </div>

        <div className="pt-2">
          <Button 
            className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
            size="sm"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateEventCard() {
  return (
    <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center text-center py-12 px-6 min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Create New Event</h3>
        <p className="text-gray-600 text-sm">
          Start organizing your next networking event and begin building connections.
        </p>
        <Button 
          className="mt-4 bg-white hover:bg-gray-50 text-lime-600 border border-lime-200 shadow-sm"
          size="sm"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}

function EventStatsCard() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900">Event Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-lime-50 rounded-lg">
            <div className="text-2xl font-bold text-lime-600">6</div>
            <div className="text-xs text-gray-600">Total Events</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600">Upcoming</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">414</div>
            <div className="text-xs text-gray-600">Total Contacts</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">69</div>
            <div className="text-xs text-gray-600">Avg. per Event</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  // Separate upcoming and completed events
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming');
  const completedEvents = mockEvents.filter(event => event.status === 'completed');

  // Create card arrays for carousels
  const upcomingCards = [
    <CreateEventCard key="create" />,
    ...upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
  ];

  const completedCards = [
    <EventStatsCard key="stats" />,
    ...completedEvents.map(event => <EventCard key={event.id} event={event} />)
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Events
        </h1>
        <p className="text-lg text-gray-600">
          Manage your networking events and track connections
        </p>
      </div>

      {/* Upcoming Events Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={4000}>
            {upcomingCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={5000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          >
            {upcomingCards}
          </GridCardCarousel>
        </div>
      </div>

      {/* Completed Events Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Completed Events</h2>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={6000}>
            {completedCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={7000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          >
            {completedCards}
          </GridCardCarousel>
        </div>
      </div>

      {/* Mobile Create Button */}
      <div className="md:hidden text-center">
        <Button 
          className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200 w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>
      </div>
    </div>
  );
} 