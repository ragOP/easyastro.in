import React from "react";
import { User, Mail, Phone, Calendar, MapPin, Venus } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface ConsultationFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (data: FormData) => void;
}

export default function FormTemp({
  formData,
  setFormData,
  onSubmit,
}: ConsultationFormProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-5">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-foreground mb-1">
          💫 Your Love Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Help us create your personalized love report
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-3"
      >
        <div className="grid md:grid-cols-2 gap-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <User className="w-4 h-4 inline mr-2 text-primary" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <Mail className="w-4 h-4 inline mr-2 text-primary" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <Phone className="w-4 h-4 inline mr-2 text-primary" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <Calendar className="w-4 h-4 inline mr-2 text-primary" />
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              required
            />
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <MapPin className="w-4 h-4 inline mr-2 text-primary" />
              Place of Birth *
            </label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) =>
                handleInputChange("placeOfBirth", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Enter your birth place"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <Venus className="w-4 h-4 inline mr-2 text-primary" />
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer text-sm"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            💝 Your information is secure and will only be used for your
            personalized love report
          </p>
        </div>
      </form>
    </div>
  );
}
