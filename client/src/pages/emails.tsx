import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GridCardCarousel, HorizontalCardCarousel } from '@/components/ui/carousel';
import { 
  Mail, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  CheckCircle,
  Globe,
  Users,
  FileText,
  Sparkles
} from 'lucide-react';

// Mock data
const mockTemplates = [
  {
    id: 1,
    name: 'Welcome Introduction',
    subject: 'Great meeting you at {event_name}!',
    body: 'Hi {contact_name},\n\nIt was wonderful meeting you at {event_name}. I enjoyed our conversation about {topic}...',
    usageCount: 23,
    lastUsed: '2024-01-15'
  },
  {
    id: 2,
    name: 'Follow-up Meeting',
    subject: 'Following up on our conversation',
    body: 'Hello {contact_name},\n\nI wanted to follow up on our discussion about {topic}. Would you be available for a quick call...',
    usageCount: 15,
    lastUsed: '2024-01-12'
  },
  {
    id: 3,
    name: 'Partnership Proposal',
    subject: 'Exploring partnership opportunities',
    body: 'Dear {contact_name},\n\nAfter our meeting at {event_name}, I believe there could be great synergy between our companies...',
    usageCount: 8,
    lastUsed: '2024-01-10'
  },
  {
    id: 4,
    name: 'Thank You Note',
    subject: 'Thank you for your time',
    body: 'Hi {contact_name},\n\nThank you for taking the time to speak with me at {event_name}. Your insights about {topic} were incredibly valuable...',
    usageCount: 31,
    lastUsed: '2024-01-18'
  }
];

const mockDrafts = [
  {
    id: 1,
    contactName: 'John Smith',
    subject: 'Great meeting you at Tech Conference 2024!',
    preview: 'Hi John, It was wonderful meeting you at Tech Conference 2024. I enjoyed our conversation about AI innovations...',
    status: 'draft',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    contactName: 'Sarah Johnson',
    subject: 'Following up on our conversation',
    preview: 'Hello Sarah, I wanted to follow up on our discussion about digital transformation. Would you be available...',
    status: 'ready',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    contactName: 'Mike Chen',
    subject: 'Exploring partnership opportunities',
    preview: 'Dear Mike, After our meeting at the networking event, I believe there could be great synergy...',
    status: 'sent',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    contactName: 'Emma Wilson',
    subject: 'Thank you for your time',
    preview: 'Hi Emma, Thank you for taking the time to speak with me about marketing strategies...',
    status: 'draft',
    createdAt: '2024-01-12'
  }
];

function TemplateCard({ template }: { template: typeof mockTemplates[0] }) {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
              {template.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{template.subject}</p>
          </div>
          <FileText className="w-5 h-5 text-lime-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{template.body}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Used {template.usageCount} times</span>
          <span>Last: {new Date(template.lastUsed).toLocaleDateString()}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DraftCard({ draft }: { draft: typeof mockDrafts[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ready': return 'bg-lime-100 text-lime-700 border-lime-200';
      case 'sent': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
              {draft.contactName}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{draft.subject}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(draft.status)}`}>
              {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
            </span>
          </div>
          <MessageSquare className="w-5 h-5 text-lime-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{draft.preview}</p>
        
        <div className="text-xs text-gray-500">
          Created: {new Date(draft.createdAt).toLocaleDateString()}
        </div>

        <div className="pt-2">
          {draft.status === 'sent' ? (
            <Button disabled className="w-full" size="sm">
              <CheckCircle className="w-3 h-3 mr-2" />
              Sent
            </Button>
          ) : (
            <Button 
              className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
              size="sm"
            >
              <Send className="w-3 h-3 mr-2" />
              {draft.status === 'ready' ? 'Send Email' : 'Review & Send'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CreateTemplateCard() {
  return (
    <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center text-center py-12 px-6 min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Create Template</h3>
        <p className="text-gray-600 text-sm">
          Build reusable email templates with AI assistance for consistent messaging.
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

function GmailConnectionCard() {
  const [isConnected] = useState(false);

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-lime-600" />
          Gmail Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`text-sm font-medium ${isConnected ? 'text-lime-600' : 'text-orange-600'}`}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        
        {!isConnected && (
          <p className="text-sm text-gray-600">
            Connect your Gmail account to send emails directly from the platform.
          </p>
        )}

        <Button 
          className={`w-full ${isConnected 
            ? 'bg-gray-100 text-gray-600 border border-gray-200' 
            : 'bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200'
          }`}
          size="sm"
        >
          {isConnected ? 'Disconnect' : 'Connect Gmail'}
        </Button>
      </CardContent>
    </Card>
  );
}

function EmailStatsCard() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-lime-600" />
          Email Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-lime-50 rounded-lg">
            <div className="text-xl font-bold text-lime-600">77</div>
            <div className="text-xs text-gray-600">Sent</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">85%</div>
            <div className="text-xs text-gray-600">Open Rate</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">23</div>
            <div className="text-xs text-gray-600">Replies</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">12</div>
            <div className="text-xs text-gray-600">Templates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EmailsPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'drafts'>('templates');

  const templateCards = [
    <CreateTemplateCard key="create" />,
    ...mockTemplates.map(template => <TemplateCard key={template.id} template={template} />)
  ];

  const draftCards = [
    <EmailStatsCard key="stats" />,
    ...mockDrafts.map(draft => <DraftCard key={draft.id} draft={draft} />)
  ];

  const connectionCards = [
    <GmailConnectionCard key="gmail" />
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Email Management
        </h1>
        <p className="text-lg text-gray-600">
          Create templates, generate personalized drafts, and manage your email campaigns
        </p>
      </div>

      {/* Connection Status Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Connection Status</h2>
        
        <HorizontalCardCarousel autoRotateInterval={8000}>
          {connectionCards}
        </HorizontalCardCarousel>
      </div>

      {/* Draft Generation Section */}
      <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Generate New Drafts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">1. Choose a Lead Group</label>
               <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white">
                 <option value="">Select lead group</option>
                 <option value="tech-contacts">Tech Contacts</option>
                 <option value="marketing-leads">Marketing Leads</option>
                 <option value="potential-partners">Potential Partners</option>
               </select>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">2. Choose an Email Template</label>
               <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white">
                 <option value="">Select template</option>
                 <option value="welcome">Welcome Introduction</option>
                 <option value="followup">Follow-up Meeting</option>
                 <option value="partnership">Partnership Proposal</option>
                 <option value="thankyou">Thank You Note</option>
               </select>
             </div>

            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Drafts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

             {/* Templates & Drafts Tabs */}
       <div className="space-y-6">
         {/* Tab Navigation */}
         <div className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
           <button
             onClick={() => setActiveTab('templates')}
             className={`flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-all ${
               activeTab === 'templates'
                 ? 'bg-white text-gray-900 shadow-sm'
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             <FileText className="w-4 h-4 mr-2" />
             Email Templates
           </button>
           <button
             onClick={() => setActiveTab('drafts')}
             className={`flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-all ${
               activeTab === 'drafts'
                 ? 'bg-white text-gray-900 shadow-sm'
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             <MessageSquare className="w-4 h-4 mr-2" />
             Generated Drafts
           </button>
         </div>

         {/* Templates Tab Content */}
         {activeTab === 'templates' && (
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-lg font-semibold text-gray-800">Email Templates</h3>
               <div className="hidden md:block">
                 <Button 
                   className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200"
                   size="sm"
                 >
                   <Plus className="w-4 h-4 mr-2" />
                   New Template
                 </Button>
               </div>
             </div>

             {/* Mobile: Horizontal Carousel */}
             <div className="md:hidden">
               <HorizontalCardCarousel autoRotateInterval={4000}>
                 {templateCards}
               </HorizontalCardCarousel>
             </div>

             {/* Desktop: Grid Carousel */}
             <div className="hidden md:block">
               <GridCardCarousel 
                 autoRotateInterval={5000}
                 itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
               >
                 {templateCards}
               </GridCardCarousel>
             </div>
           </div>
         )}

         {/* Drafts Tab Content */}
         {activeTab === 'drafts' && (
           <div className="space-y-4">
             <h3 className="text-lg font-semibold text-gray-800">Generated Drafts</h3>

             {/* Mobile: Horizontal Carousel */}
             <div className="md:hidden">
               <HorizontalCardCarousel autoRotateInterval={6000}>
                 {draftCards}
               </HorizontalCardCarousel>
             </div>

             {/* Desktop: Grid Carousel */}
             <div className="hidden md:block">
               <GridCardCarousel 
                 autoRotateInterval={7000}
                 itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
               >
                 {draftCards}
               </GridCardCarousel>
             </div>
           </div>
         )}
       </div>
    </div>
  );
} 