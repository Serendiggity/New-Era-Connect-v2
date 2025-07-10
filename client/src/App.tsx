import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    </QueryClientProvider>
  );
}

export default App; 