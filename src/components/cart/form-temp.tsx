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
    <div className="bg-card rounded-xl shadow-md border border-border p-2">
      <div className="text-center mb-1.5">
        <h3 className="text-sm font-bold text-foreground mb-0">
          💫 Your Love Details
        </h3>
        <p className="text-xs text-muted-foreground">
          Help us create your personalized love report
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-1.5"
      >
        <div className="grid grid-cols-2 gap-1.5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <User className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <Mail className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              placeholder="Email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <Phone className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              placeholder="Phone"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <Calendar className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              DOB *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              required
            />
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <MapPin className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              City *
            </label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) =>
                handleInputChange("placeOfBirth", e.target.value)
              }
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              placeholder="City"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-0.5">
              <Venus className="w-2.5 h-2.5 inline mr-0.5 text-primary" />
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent cursor-pointer text-xs"
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div className="text-center pt-0.5">
          <p className="text-xs text-muted-foreground leading-tight">
            💝 Your information is secure and will only be used for your
            personalized love report
          </p>
        </div>
      </form>
    </div>
  );
}
