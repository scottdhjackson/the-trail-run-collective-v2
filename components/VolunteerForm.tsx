'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const AVAILABILITY_OPTIONS = [
  { value: 'weekends', label: 'Weekends only' },
  { value: 'weekdays', label: 'Weekdays only' },
  { value: 'both', label: 'Both weekdays and weekends' },
  { value: 'flexible', label: 'Flexible' },
]

const ROLE_OPTIONS = [
  { value: 'marshal', label: 'Course Marshal' },
  { value: 'registration', label: 'Registration / Check-in' },
  { value: 'aid_station', label: 'Aid Station Support' },
  { value: 'sweep', label: 'Sweep / Tail Runner' },
  { value: 'photography', label: 'Photography' },
  { value: 'first_aid', label: 'First Aid (qualified)' },
  { value: 'general', label: 'General Support' },
]

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    availability: '',
    roles: [] as string[],
    experience: '',
    whyVolunteer: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleRoleToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(value)
        ? prev.roles.filter((r) => r !== value)
        : [...prev.roles, value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('https://formspree.io/f/xvzjvgor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await response.json()
      } catch {
        throw new Error('Server error — please try again')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setResult({
        type: 'success',
        text: "Application submitted! We'll be in touch soon — thank you for offering your time.",
      })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        availability: '',
        roles: [],
        experience: '',
        whyVolunteer: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
      })
    } catch (err) {
      setResult({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
      {/* Personal details */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-2">Your Details</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isLoading}
            suppressHydrationWarning
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isLoading}
            suppressHydrationWarning
          />
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset className="space-y-3">
        <legend className="text-lg font-semibold">Availability *</legend>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={formData.availability === option.value}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                required
                disabled={isLoading}
                className="accent-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Roles */}
      <fieldset className="space-y-3">
        <legend className="text-lg font-semibold">Roles You're Interested In</legend>
        <p className="text-sm text-muted-foreground">Select all that apply</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ROLE_OPTIONS.map((role) => (
            <label key={role.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                value={role.value}
                checked={formData.roles.includes(role.value)}
                onChange={() => handleRoleToggle(role.value)}
                disabled={isLoading}
                className="accent-primary"
              />
              <span>{role.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Experience & motivation */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Background</legend>
        <div>
          <Label htmlFor="experience">Relevant Experience</Label>
          <p className="text-sm text-muted-foreground mb-1">
            Previous volunteering, first aid qualifications, trail running experience, etc.
          </p>
          <Textarea
            id="experience"
            rows={4}
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            disabled={isLoading}
            suppressHydrationWarning
          />
        </div>
        <div>
          <Label htmlFor="whyVolunteer">Why Do You Want to Volunteer?</Label>
          <Textarea
            id="whyVolunteer"
            rows={4}
            value={formData.whyVolunteer}
            onChange={(e) => setFormData({ ...formData, whyVolunteer: e.target.value })}
            disabled={isLoading}
            suppressHydrationWarning
          />
        </div>
      </fieldset>

      {/* Emergency contact */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Emergency Contact</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyContactName">Name</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
          <div>
            <Label htmlFor="emergencyContactPhone">Phone</Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContactPhone: e.target.value })
              }
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
        </div>
      </fieldset>

      {result && (
        <p
          className={`text-sm rounded p-3 ${
            result.type === 'error'
              ? 'text-destructive bg-destructive/10'
              : 'text-green-700 bg-green-50'
          }`}
        >
          {result.text}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  )
}
