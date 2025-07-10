import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HorizontalCardCarousel, GridCardCarousel } from '@/components/ui/carousel';
import { 
  Camera, 
  Upload, 
  FileImage, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Calendar
} from 'lucide-react';

// Mock data for recent scans
const mockRecentScans = [
  {
    id: 1,
    fileName: 'business_card_001.jpg',
    contactName: 'John Smith',
    company: 'Tech Corp',
    status: 'completed',
    accuracy: 94,
    scannedAt: '2024-01-15T14:30:00Z',
    eventName: 'Tech Conference 2024'
  },
  {
    id: 2,
    fileName: 'business_card_002.jpg',
    contactName: 'Sarah Johnson',
    company: 'StartupXYZ',
    status: 'processing',
    accuracy: null,
    scannedAt: '2024-01-15T14:25:00Z',
    eventName: 'Networking Mixer'
  },
  {
    id: 3,
    fileName: 'business_card_003.jpg',
    contactName: 'Mike Chen',
    company: 'Design Studio',
    status: 'completed',
    accuracy: 98,
    scannedAt: '2024-01-15T14:20:00Z',
    eventName: 'Design Summit'
  },
  {
    id: 4,
    fileName: 'business_card_004.jpg',
    contactName: 'Emma Wilson',
    company: 'Marketing Inc',
    status: 'failed',
    accuracy: null,
    scannedAt: '2024-01-15T14:15:00Z',
    eventName: 'Business Expo'
  }
];

function RecentScanCard({ scan }: { scan: typeof mockRecentScans[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-lime-100 text-lime-700 border-lime-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900">
              {scan.contactName || 'Processing...'}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{scan.company || 'Unknown Company'}</p>
            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(scan.status)}`}>
              {getStatusIcon(scan.status)}
              <span>{scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}</span>
            </span>
          </div>
          <FileImage className="w-5 h-5 text-lime-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1 text-sm text-gray-600">
          <div>File: {scan.fileName}</div>
          <div>Event: {scan.eventName}</div>
          <div>Scanned: {new Date(scan.scannedAt).toLocaleString()}</div>
          {scan.accuracy && (
            <div>Accuracy: {scan.accuracy}%</div>
          )}
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            disabled={scan.status === 'processing'}
          >
            {scan.status === 'completed' ? 'View Contact' : 
             scan.status === 'processing' ? 'Processing...' : 
             'Retry Scan'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ScanningTipsCard() {
  const tips = [
    {
      icon: Camera,
      title: "Good Lighting",
      description: "Ensure the card is well-lit and all text is clearly visible.",
      color: "text-lime-600"
    },
    {
      icon: FileImage,
      title: "Straight Angle",
      description: "Hold your phone directly above the card for best results.",
      color: "text-blue-600"
    },
    {
      icon: Sparkles,
      title: "High Quality",
      description: "Use your device's highest camera setting for clearest text recognition.",
      color: "text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Clean Surface",
      description: "Place the card on a clean, flat surface with good contrast.",
      color: "text-orange-600"
    }
  ];

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900">Scanning Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <tip.icon className={`w-5 h-5 ${tip.color}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{tip.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ScanStatsCard() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-100 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-lime-600" />
          Scan Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-lime-50 rounded-lg">
            <div className="text-xl font-bold text-lime-600">127</div>
            <div className="text-xs text-gray-600">Total Scans</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">95%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">23</div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">97%</div>
            <div className="text-xs text-gray-600">Avg. Accuracy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ScanPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const events = [
    { id: '1', name: 'WebSummit 2024' },
    { id: '2', name: 'Tech Conference NYC' },
    { id: '3', name: 'Startup Pitch Night' },
    { id: '4', name: 'Developer Meetup' }
  ];

  const recentScanCards = [
    <ScanStatsCard key="stats" />,
    ...mockRecentScans.map(scan => <RecentScanCard key={scan.id} scan={scan} />)
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const canSubmit = selectedEvent && file;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Scan Business Card
        </h1>
        <p className="text-lg text-gray-600">
          Upload a business card image and let AI extract contact information
        </p>
      </div>

      {/* Main Scan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Card */}
        <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg shadow-lime-100">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-lime-600" />
              Upload Business Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Event (Required)
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white"
              >
                <option value="">Choose an event...</option>
                <option value="tech-conf-2024">Tech Conference 2024</option>
                <option value="networking-mixer">Networking Mixer</option>
                <option value="startup-pitch">Startup Pitch Night</option>
                <option value="business-expo">Business Expo</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Card Image
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-lime-500 bg-lime-50'
                    : file
                    ? 'border-lime-300 bg-lime-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-12 h-12 text-lime-600 mx-auto" />
                    <p className="text-lg font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">Click to change or drag a new file</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-lg font-medium text-gray-900">Drop your business card here</p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                    <p className="text-xs text-gray-400">Supports JPG, PNG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              disabled={!canSubmit}
              className={`w-full ${
                canSubmit
                  ? 'bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white shadow-lg shadow-lime-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {canSubmit ? 'Scan Business Card' : 'Select Event & Upload Image'}
            </Button>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="space-y-4">
          <ScanningTipsCard />
        </div>
      </div>

      {/* Recent Scans Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Scans</h2>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden">
          <HorizontalCardCarousel autoRotateInterval={5000}>
            {recentScanCards}
          </HorizontalCardCarousel>
        </div>

        {/* Desktop: Grid Carousel */}
        <div className="hidden md:block">
          <GridCardCarousel 
            autoRotateInterval={6000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          >
            {recentScanCards}
          </GridCardCarousel>
        </div>
      </div>
    </div>
  );
} 