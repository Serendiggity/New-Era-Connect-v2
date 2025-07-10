import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Event } from '@new-era-connect/shared/schema';
import { eventsService } from '@/services/events';
import EventFormModal from '@/components/EventFormModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GridCardCarousel, HorizontalCardCarousel } from '@/components/ui/carousel';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Calendar, MapPin, Users, Plus, Clock, Trash2, Edit } from 'lucide-react';

function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const deleteMutation = useMutation({
    mutationFn: () => eventsService.deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setShowDeleteDialog(false);
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  // Determine if event is upcoming based on start date or created date
  const eventDate = event.startDate || event.createdAt;
  const isUpcoming = new Date(eventDate) >= new Date();

  return (
    <>
      <Card 
        className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
                {event.name}
              </CardTitle>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${
                isUpcoming 
                  ? 'bg-lime-100 text-lime-700 border-lime-200' 
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {isUpcoming ? 'Upcoming' : 'Completed'}
              </span>
            </div>
            <div className="text-lime-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {event.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              {formatDate(event.startDate)}
              {event.endDate && event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
            </div>
            {event.location && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {event.location}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              0 contacts {/* TODO: Add contact count when available */}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
              size="sm"
              onClick={handleCardClick}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="p-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{event.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EventFormModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        event={event}
      />
    </>
  );
}

function CreateEventCard({ onClick }: { onClick: () => void }) {
  return (
    <Card 
      className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer"
      onClick={onClick}
    >
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

function EventStatsCard({ events }: { events: Event[] }) {
  const upcomingCount = events.filter(event => {
    const eventDate = event.startDate || event.createdAt;
    return new Date(eventDate) >= new Date();
  }).length;

  const completedCount = events.length - upcomingCount;

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900">Event Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-lime-50 rounded-lg">
            <div className="text-2xl font-bold text-lime-600">{events.length}</div>
            <div className="text-xs text-gray-600">Total Events</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{upcomingCount}</div>
            <div className="text-xs text-gray-600">Upcoming</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-600">Total Contacts</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-xs text-gray-600">Avg. per Event</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch events data
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: eventsService.getEvents,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading events: {error.message}</div>
      </div>
    );
  }

  // Separate upcoming and completed events
  const upcomingEvents = events.filter(event => {
    const eventDate = event.startDate || event.createdAt;
    return new Date(eventDate) >= new Date();
  });

  const completedEvents = events.filter(event => {
    const eventDate = event.startDate || event.createdAt;
    return new Date(eventDate) < new Date();
  });

  // Create card arrays for carousels
  const upcomingCards = [
    <CreateEventCard key="create" onClick={() => setShowCreateModal(true)} />,
    ...upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
  ];

  const completedCards = [
    <EventStatsCard key="stats" events={events} />,
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
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        {upcomingCards.length > 1 ? (
          <>
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
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCards}
          </div>
        )}
      </div>

      {/* Completed Events Section */}
      {completedCards.length > 1 && (
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
      )}

      {/* Mobile Create Button */}
      <div className="md:hidden text-center">
        <Button 
          className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200 w-full"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Create Event Modal */}
      <EventFormModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
} 