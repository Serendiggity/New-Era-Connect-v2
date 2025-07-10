import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventById, deleteEvent } from '../services/events';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Info, Pencil, Trash2 } from 'lucide-react';
import type { Event } from '../../../shared/schema';
import EventFormModal from '@/components/EventFormModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: event, isLoading, isError, error } = useQuery<Event, Error>({
    queryKey: ['event', id],
    queryFn: () => getEventById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(parseInt(id!, 10)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading event details...</div>;
  }

  if (isError) {
    return <div className="text-center p-10 text-red-600">Error: {error.message}</div>;
  }

  if (!event) {
    return <div className="text-center p-10">Event not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 break-words">
            {event.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 text-base">
            <div className="flex items-start space-x-3">
              <Calendar className="w-6 h-6 text-lime-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Date</p>
                <p className="text-gray-600">
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-lime-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600">{event.location || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-lime-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Description</p>
                <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Event
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the event
                  and all associated contacts and data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                  {deleteMutation.isPending ? 'Deleting...' : 'Continue'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={() => setIsEditModalOpen(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
        </CardFooter>
      </Card>

      {event && (
        <EventFormModal 
          open={isEditModalOpen} 
          onOpenChange={setIsEditModalOpen} 
          event={event} 
        />
      )}
    </div>
  );
};

export default EventDetailPage; 