'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Distance {
  label: string
  stripePriceId: string
  isOpen: boolean
}

interface Event {
  title: string
  slug: string
  distances: Distance[]
}

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  postcode: string
  country: string
  age: string
  gender: string
  emergencyName: string
  emergencyPhone: string
  emergencyRelationship: string
  distance: string
}

interface RegistrationFormProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export function RegistrationForm({ event, isOpen, onClose }: RegistrationFormProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    age: '',
    gender: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    distance: '',
  })

  const updateField = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventSlug: event.slug,
          distanceLabel: formData.distance,
          registrationData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.addressLine1,
              line2: formData.addressLine2,
              city: formData.city,
              postcode: formData.postcode,
              country: formData.country,
            },
            age: parseInt(formData.age),
            gender: formData.gender,
            emergencyContact: {
              name: formData.emergencyName,
              phone: formData.emergencyPhone,
              relationship: formData.emergencyRelationship,
            },
          },
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (error) {
      alert('Failed to process registration. Please try again.')
      setLoading(false)
    }
  }

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.phone
  const isStep2Valid = formData.addressLine1 && formData.city && formData.postcode && formData.country
  const isStep3Valid = formData.age && formData.gender
  const isStep4Valid = formData.emergencyName && formData.emergencyPhone && formData.emergencyRelationship
  const isStep5Valid = formData.distance

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register for {event.title}</DialogTitle>
        </DialogHeader>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">Step 1 of 5: Personal Details</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={onClose} variant="outline">Cancel</Button>
              <Button onClick={handleNext} disabled={!isStep1Valid}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">Step 2 of 5: Address</div>
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                id="addressLine1"
                value={formData.addressLine1}
                onChange={(e) => updateField('addressLine1', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={formData.addressLine2}
                onChange={(e) => updateField('addressLine2', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => updateField('postcode', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext} disabled={!isStep2Valid}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">Step 3 of 5: Additional Information</div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext} disabled={!isStep3Valid}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 4: Emergency Contact */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">Step 4 of 5: Emergency Contact</div>
            <div className="space-y-2">
              <Label htmlFor="emergencyName">Name *</Label>
              <Input
                id="emergencyName"
                value={formData.emergencyName}
                onChange={(e) => updateField('emergencyName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => updateField('emergencyPhone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyRelationship">Relationship *</Label>
              <Input
                id="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={(e) => updateField('emergencyRelationship', e.target.value)}
                placeholder="e.g. Spouse, Parent, Friend"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleNext} disabled={!isStep4Valid}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 5: Distance Selection */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">Step 5 of 5: Select Distance</div>
            <div className="space-y-3">
              {event.distances.map((distance) => (
                <label
                  key={distance.label}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                    formData.distance === distance.label
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300'
                  } ${!distance.isOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="distance"
                      value={distance.label}
                      checked={formData.distance === distance.label}
                      onChange={(e) => updateField('distance', e.target.value)}
                      disabled={!distance.isOpen}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">{distance.label}</span>
                  </div>
                  {!distance.isOpen && (
                    <span className="text-sm text-red-600">Sold Out</span>
                  )}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button
                onClick={handleSubmit}
                disabled={!isStep5Valid || loading}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
