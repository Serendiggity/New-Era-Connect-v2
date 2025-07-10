import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HorizontalCardCarousel, GridCardCarousel } from '@/components/ui/carousel';
import { 
  Search, 
  Download, 
  Trash2, 
  Users, 
  Building, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  Filter
} from 'lucide-react';

// Mock data
const mockContacts = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    company: 'Tech Corp',
    title: 'Senior Developer',
    event: 'Tech Conference 2024',
    addedDate: '2024-01-15',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@startupxyz.com',
    company: 'StartupXYZ',
    title: 'Product Manager',
    event: 'Startup Pitch Night',
    addedDate: '2024-01-14',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX'
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@designstudio.com',
    company: 'Design Studio',
    title: 'Creative Director',
    event: 'Design Summit',
    addedDate: '2024-01-13',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY'
  }
];

function ContactInsightCard({ title, value, description, icon: Icon, color = 'lime' }: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  color?: 'lime' | 'blue' | 'purple' | 'orange';
}) {
  const colorClasses = {
    lime: 'bg-lime-50 text-lime-600 border-lime-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

function ContactTable() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const toggleContact = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) 
        ? prev.filter(contactId => contactId !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedContacts(prev => 
      prev.length === mockContacts.length ? [] : mockContacts.map(c => c.id)
    );
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">Contact Directory</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={selectedContacts.length === 0}
              className="text-gray-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export ({selectedContacts.length})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={selectedContacts.length === 0}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedContacts.length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === mockContacts.length}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => toggleContact(contact.id)}
                      className="rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-white font-medium text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{contact.company}</td>
                  <td className="py-3 px-4 text-gray-600">{contact.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-medium">
                      {contact.event}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const insightCards = [
    <ContactInsightCard
      key="total"
      title="Total Contacts"
      value={mockContacts.length}
      description="Active connections"
      icon={Users}
      color="lime"
    />,
    <ContactInsightCard
      key="companies"
      title="Companies"
      value="18"
      description="Different organizations"
      icon={Building}
      color="blue"
    />,
    <ContactInsightCard
      key="events"
      title="Events"
      value="6"
      description="Networking sources"
      icon={Calendar}
      color="purple"
    />,
    <ContactInsightCard
      key="growth"
      title="This Month"
      value="+12"
      description="New connections"
      icon={TrendingUp}
      color="orange"
    />
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Contacts
        </h1>
        <p className="text-lg text-gray-600">
          Manage and organize your professional network
        </p>
      </div>

      {/* Search Bar */}
      <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts with natural language (e.g., 'tech contacts from last week')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Contact Insights</h2>
        
        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={3000}>
            {insightCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={4000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
          >
            {insightCards}
          </GridCardCarousel>
        </div>
      </div>

      {/* Contact Table */}
      <ContactTable />
    </div>
  );
} 