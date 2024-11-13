// components/MultiStepSignup.tsx
"use client";

import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { login, register } from '@/lib/actions/user'
import { redirect, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';

import {
  InputField,
  SubmitButton,
  Checkbox,
  Textarea,
  Select,
} from ".";

type FormData = {
  role: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  organization: string;
  position: string;
  organizationWebsite: string;
  organizationType: string;
  preferredStreamingSchedule: string;
  audienceSize: string;
  streamingEquipment: string;
  additionalComments: string;
  dateOfBirth: string;
  acceptTerms: boolean;
};

const initialFormData: FormData = {
  role: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  address: "",
  organization: "",
  position: "",
  organizationWebsite: "",
  organizationType: "",
  preferredStreamingSchedule: "",
  audienceSize: "",
  streamingEquipment: "",
  additionalComments: "",
  dateOfBirth: "",
  acceptTerms: false,
};

export default function MultiStepSignup() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch=useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // @ts-ignore
    let res=await dispatch(register(formData));
    const router = useRouter();
    if(res){
      
      router.push('/');
    }
    else{
      console.log("some error occurs")

    }


  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2226] p-4 font-roboto">
      <div className="w-full max-w-2xl space-y-8 bg-[#2A2E33] p-8 rounded-xl border border-[#3A3E43] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-400">Step {currentStep} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 transition-opacity duration-300 ease-in-out">
              <Select
                label="Role"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                options={[
                  { value: "", label: "Select Role" },
                  { value: "user", label: "User" },
                  { value: "streamer", label: "Streamer" },
                ]}
              />
              <InputField
                label="Full Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
              <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <InputField
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
              <Checkbox
                label="Show Password"
                id="showPassword"
                name="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 transition-opacity duration-300 ease-in-out">
              <InputField
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              <InputField
                label="Address"
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
              <InputField
                label="Organization"
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter your organization"
              />
              <InputField
                label="Role/Position"
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter your role or position"
              />
              <InputField
                label="Organization Website (Optional)"
                id="organizationWebsite"
                name="organizationWebsite"
                type="url"
                value={formData.organizationWebsite}
                onChange={handleChange}
                placeholder="Enter your organization's website"
              />
              <Select
                label="Organization Type"
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
                options={[
                  { value: "", label: "Select Organization Type" },
                  { value: "nonprofit", label: "Non-Profit" },
                  { value: "forprofit", label: "For-Profit" },
                  { value: "government", label: "Government" },
                  { value: "education", label: "Education" },
                ]}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 transition-opacity duration-300 ease-in-out">
              <InputField
                label="Preferred Streaming Schedule"
                id="preferredStreamingSchedule"
                name="preferredStreamingSchedule"
                type="text"
                value={formData.preferredStreamingSchedule}
                onChange={handleChange}
                placeholder="Enter your preferred streaming schedule"
              />
              <InputField
                label="Audience Size"
                id="audienceSize"
                name="audienceSize"
                type="text"
                value={formData.audienceSize}
                onChange={handleChange}
                placeholder="Enter your audience size"
              />
              <InputField
                label="Streaming Equipment"
                id="streamingEquipment"
                name="streamingEquipment"
                type="text"
                value={formData.streamingEquipment}
                onChange={handleChange}
                placeholder="Enter your streaming equipment"
              />
              <Textarea
                label="Additional Comments/Requirements"
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                placeholder="Enter any additional comments or requirements"
                rows={3}
              />
              <InputField
                label="Date of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <Checkbox
                label="I accept all terms and conditions"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex justify-between gap-x-3">
            {currentStep > 1 && (
              <SubmitButton
                name="Previous"
                onClick={prevStep}
                type="button"
                customClass="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out"
              />
            )}
            {currentStep < 3 ? (
              <SubmitButton
                name="Next"
                onClick={nextStep}
                type="button"
                customClass="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-black bg-[#FCAD06] hover:bg-[#FCAD06]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAD06] transition duration-200 ease-in-out"
              />
            ) : (
              <SubmitButton
                name="Create Account"
                type="submit"
                customClass="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-black bg-[#FCAD06] hover:bg-[#FCAD06]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAD06] transition duration-200 ease-in-out"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
