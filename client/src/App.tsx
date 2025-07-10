import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Navigation from './components/Navigation';
import Dashboard from './pages/dashboard';
import EventsPage from './pages/events';
import EventDetailPage from './pages/event-detail-page';
import ContactsPage from './pages/contacts';
import ScanPage from './pages/scan';
import EmailsPage from './pages/emails';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignedOut>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to New Era Connect
            </h1>
            <p className="text-gray-600 mb-8">
              Please sign in to access your networking dashboard
            </p>
            <SignInButton mode="modal">
              <button className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <Router>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Dashboard />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="events/:id" element={<EventDetailPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="scan" element={<ScanPage />} />
              <Route path="emails" element={<EmailsPage />} />
            </Route>
          </Routes>
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </Router>
      </SignedIn>
    </QueryClientProvider>
  );
}

export default App; 