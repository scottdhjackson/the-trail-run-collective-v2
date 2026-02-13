'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface Distance {
  label: string
  stripePriceId: string
  isOpen: boolean
}

interface Event {
  title: string
  slug: { current: string }
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

interface SinglePageRegistrationFormProps {
  event: Event
}

export function SinglePageRegistrationForm({ event }: SinglePageRegistrationFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventSlug: event.slug.current,
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

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.addressLine1 &&
    formData.city &&
    formData.postcode &&
    formData.country &&
    formData.age &&
    formData.gender &&
    formData.emergencyName &&
    formData.emergencyPhone &&
    formData.emergencyRelationship &&
    formData.distance

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Details */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Card>

      {/* Address */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Address</h2>
        <div className="space-y-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Card>

      {/* Additional Information */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
        <div className="space-y-4">
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
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Emergency Contact</h2>
        <div className="space-y-4">
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
        </div>
      </Card>

      {/* Distance Selection */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Select Distance</h2>
        <div className="space-y-3">
          {event.distances.map((distance) => (
            <label
              key={distance.label}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.distance === distance.label
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
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
                <span className="text-sm text-destructive">Sold Out</span>
              )}
            </label>
          ))}
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </form>
  )
}
