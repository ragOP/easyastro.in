import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Users } from 'lucide-react';

interface Sister2FormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface Sister2ConsultationFormProps {
  formData: Sister2FormData;
  onSubmit: (data: Sister2FormData) => void;
  setFormData: (data: Sister2FormData) => void;
}

export default function Sister2ConsultationForm({
  formData,
  onSubmit,
  setFormData
}: Sister2ConsultationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof Sister2FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          💫 Your Love Details
        </h3>
        <p className="text-white/80">
          Help us create your personalized love report
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Place of Birth
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              placeholder="Enter your place of birth"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Gender
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(224,82,177)]" />
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[rgb(224,82,177)] focus:border-transparent"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-white text-muted-foreground">
            💝 Your information is secure and will only be used for your personalized love report
          </p>
        </div>
      </form>
    </div>
  );
} 