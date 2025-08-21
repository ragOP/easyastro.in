import React from 'react';
import { Heart, Eye, Download, Calendar, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SisterHeader from '@/components/sister/sister-header';

export default function SisterRecordsPage() {
  // Mock data - in real app this would come from API/database
  const records = [
    {
      id: 'SK-2024-001',
      title: 'AI Soulmate Sketch',
      status: 'completed',
      date: '2024-01-15',
      image: 'https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png',
      description: 'Your soulmate sketch has been generated and is ready for viewing.',
      downloadUrl: '#',
      features: [
        'AI-generated visualization',
        'Astrological analysis',
        'Psychic art interpretation'
      ]
    },
    {
      id: 'SK-2024-002',
      title: 'Soulmate Compatibility Report',
      status: 'processing',
      date: '2024-01-16',
      image: null,
      description: 'Detailed compatibility analysis is being prepared.',
      downloadUrl: null,
      features: [
        'Compatibility scoring',
        'Personality insights',
        'Relationship guidance'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Sister Header */}
      <SisterHeader />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-rose-500" />
            My Soulmate Records
          </h1>
          <p className="text-lg text-gray-600">View and manage your soulmate sketches</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{records.length}</h3>
            <p className="text-gray-600">Total Records</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {records.filter(r => r.status === 'completed').length}
            </h3>
            <p className="text-gray-600">Completed</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {records.filter(r => r.status === 'processing').length}
            </h3>
            <p className="text-gray-600">Processing</p>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {records.map((record) => (
            <div key={record.id} className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image Section */}
                <div className="lg:w-1/3">
                  {record.image ? (
                    <div className="relative">
                      <Image
                        src={record.image}
                        alt={record.title}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="w-12 h-12 text-rose-400 mx-auto mb-2" />
                        <p className="text-rose-600 font-medium">Processing...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{record.title}</h3>
                    <p className="text-gray-600 mb-3">{record.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(record.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">#{record.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {record.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {record.status === 'completed' && (
                      <>
                        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Sketch
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </>
                    )}
                    
                    {record.status === 'processing' && (
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Check Status
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no records) */}
        {records.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Records Yet</h3>
            <p className="text-gray-600 mb-6">Start your soulmate journey by ordering your first sketch</p>
            <Link
              href="/sister"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 