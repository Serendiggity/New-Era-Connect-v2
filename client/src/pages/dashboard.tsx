import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HorizontalCardCarousel, GridCardCarousel } from '@/components/ui/carousel';
import { Users, Calendar, UserPlus, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';

// Mock data - replace with actual API calls
const mockStats = {
  totalContacts: 142,
  eventsAttended: 8,
  leadGroupsCreated: 5,
  avgCardAccuracy: 94.2,
};

const mockRecentActivity = [
  { id: 1, name: 'John Smith', company: 'Tech Corp', type: 'contact_added', time: '2 hours ago' },
  { id: 2, name: 'Sarah Johnson', company: 'StartupXYZ', type: 'contact_added', time: '4 hours ago' },
  { id: 3, name: 'Mike Chen', company: 'Design Studio', type: 'contact_added', time: '1 day ago' },
  { id: 4, name: 'Emma Wilson', company: 'Marketing Inc', type: 'contact_added', time: '2 days ago' },
  { id: 5, name: 'David Brown', company: 'Sales Solutions', type: 'contact_added', time: '3 days ago' },
];

function StatsCard({ title, value, icon: Icon, description, trend, color = 'lime' }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: number;
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
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          {trend && (
            <div className="flex items-center text-lime-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+{trend}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg font-bold text-gray-900 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-lime-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 text-sm">{activity.name}</p>
                <p className="text-xs text-gray-500">{activity.company}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  return (
    <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm text-sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Contact
        </Button>
        <Button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          Create Event
        </Button>
        <Button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm text-sm">
          <Users className="w-4 h-4 mr-2" />
          New Lead Group
        </Button>
      </CardContent>
    </Card>
  );
}

function WeeklyStatsCard() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg font-bold text-gray-900">This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cards Scanned</span>
            <span className="font-semibold text-gray-900">23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">New Contacts</span>
            <span className="font-semibold text-gray-900">18</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Events Created</span>
            <span className="font-semibold text-gray-900">2</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Emails Sent</span>
            <span className="font-semibold text-gray-900">12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const statsCards = [
    <StatsCard
      key="contacts"
      title="Total Contacts"
      value={mockStats.totalContacts}
      icon={Users}
      description="Active network connections"
      trend={12}
      color="lime"
    />,
    <StatsCard
      key="events"
      title="Events Attended"
      value={mockStats.eventsAttended}
      icon={Calendar}
      description="This year"
      trend={25}
      color="blue"
    />,
    <StatsCard
      key="leads"
      title="Lead Groups Created"
      value={mockStats.leadGroupsCreated}
      icon={UserPlus}
      description="Organized segments"
      trend={8}
      color="purple"
    />,
    <StatsCard
      key="accuracy"
      title="Avg. Card Accuracy"
      value={`${mockStats.avgCardAccuracy}%`}
      icon={TrendingUp}
      description="AI extraction quality"
      trend={3}
      color="orange"
    />
  ];

  const actionCards = [
    <QuickActionsCard key="actions" />,
    <WeeklyStatsCard key="weekly" />,
    <RecentActivityCard key="activity" />
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header - Mobile Friendly */}
      <div className="md:block hidden">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Good to see you! 👋
        </h1>
        <p className="text-lg text-gray-600">Here's what's happening with your network today</p>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Good to see you! 👋
        </h1>
        <p className="text-sm text-gray-600">Your network overview</p>
      </div>

      {/* Stats Cards Carousel */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">Network Statistics</h2>
        
        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={3000}>
            {statsCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={4000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
          >
            {statsCards}
          </GridCardCarousel>
        </div>
      </div>

      {/* Action Cards Carousel */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">Quick Access</h2>
        
        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={5000}>
            {actionCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={6000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          >
            {actionCards}
          </GridCardCarousel>
        </div>
      </div>
    </div>
  );
} 