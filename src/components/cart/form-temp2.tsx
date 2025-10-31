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

export default function FormTemp2({
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
    <>
      <style>{`
        @keyframes borderTravel {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        .shimmer-border {
          position: relative;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.8) 0%,
            rgba(236, 72, 153, 0.8) 20%,
            rgba(59, 130, 246, 0.8) 40%,
            rgba(34, 197, 94, 0.8) 60%,
            rgba(168, 85, 247, 0.8) 80%,
            rgba(255, 255, 255, 0.9) 100%
          );
          background-size: 300% 300%;
          animation: borderTravel 6s linear infinite;
          padding: 1px;
        }

        .shimmer-border-inner {
          background: white;
          border-radius: 11px;
          overflow: hidden;
        }
      `}</style>

      <div className="shimmer-border">
        <div className="shimmer-border-inner">
          <div className="bg-white rounded-lg p-3">
            <div className="text-center mb-2">
              <h3 className="text-base font-bold text-gray-900 mb-0.5">
                💫 Your Love Details
              </h3>
              <p className="text-xs text-gray-600">
                Help us create your personalized love report
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
              }}
              className="space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <User className="w-3 h-3 inline mr-1 text-purple-600" />
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <Mail className="w-3 h-3 inline mr-1 text-purple-600" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <Phone className="w-3 h-3 inline mr-1 text-purple-600" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    placeholder="Phone"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <Calendar className="w-3 h-3 inline mr-1 text-purple-600" />
                    DOB *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    required
                  />
                </div>

                {/* Place of Birth */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <MapPin className="w-3 h-3 inline mr-1 text-purple-600" />
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.placeOfBirth}
                    onChange={(e) =>
                      handleInputChange("placeOfBirth", e.target.value)
                    }
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    placeholder="City"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">
                    <Venus className="w-3 h-3 inline mr-1 text-purple-600" />
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer text-xs"
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
              <div className="text-center pt-1">
                <p className="text-xs text-gray-600 leading-tight">
                  💝 Your information is secure and will only be used for your
                  personalized love report
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
