'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin-data')
      .then(res => res.json())
      .then(data => {
        setEnquiries(data.enquiries || [])
        setSubscribers(data.subscribers || [])
        setEntries(data.entries || [])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Site
          </Link>
        </div>

        {/* Contact Form Submissions */}
        <section className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Contact Form Submissions ({enquiries.length})</h2>
            {enquiries.length > 0 && (
              <button
                onClick={() => exportToCSV(
                  enquiries.map(e => ({
                    Date: new Date(e.submittedAt).toLocaleDateString(),
                    Name: e.name,
                    Email: e.email,
                    Message: e.message
                  })),
                  'enquiries.csv'
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export CSV
              </button>
            )}
          </div>
          {enquiries.length === 0 ? (
            <p className="text-gray-500">No submissions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry: any) => (
                    <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(enquiry.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium">{enquiry.name}</td>
                      <td className="py-3 px-4">
                        <a href={`mailto:${enquiry.email}`} className="text-blue-600 hover:underline">
                          {enquiry.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 max-w-md truncate">{enquiry.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Newsletter Subscribers */}
        <section className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Newsletter Subscribers ({subscribers.length})</h2>
            {subscribers.length > 0 && (
              <button
                onClick={() => exportToCSV(
                  subscribers.map(s => ({
                    Date: new Date(s.subscribedAt).toLocaleDateString(),
                    Email: s.email
                  })),
                  'subscribers.csv'
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export CSV
              </button>
            )}
          </div>
          {subscribers.length === 0 ? (
            <p className="text-gray-500">No subscribers yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub: any) => (
                    <tr key={sub._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <a href={`mailto:${sub.email}`} className="text-blue-600 hover:underline">
                          {sub.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Event Registrations */}
        <section className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Event Registrations ({entries.length})</h2>
            {entries.length > 0 && (
              <button
                onClick={() => exportToCSV(
                  entries.map(e => ({
                    Date: new Date(e.createdAt).toLocaleDateString(),
                    'First Name': e.firstName || '',
                    'Last Name': e.lastName || '',
                    Email: e.email,
                    Phone: e.phone || '',
                    'Address Line 1': e.address?.line1 || '',
                    'Address Line 2': e.address?.line2 || '',
                    City: e.address?.city || '',
                    Postcode: e.address?.postcode || '',
                    Country: e.address?.country || '',
                    Age: e.age || '',
                    Gender: e.gender || '',
                    'Emergency Contact Name': e.emergencyContact?.name || '',
                    'Emergency Contact Phone': e.emergencyContact?.phone || '',
                    'Emergency Contact Relationship': e.emergencyContact?.relationship || '',
                    Event: e.eventTitle,
                    Distance: e.distanceLabel,
                    Status: e.paymentStatus
                  })),
                  'registrations.csv'
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export CSV
              </button>
            )}
          </div>
          {entries.length === 0 ? (
            <p className="text-gray-500">No registrations yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Date</th>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Phone</th>
                    <th className="text-left py-2 px-3">City</th>
                    <th className="text-left py-2 px-3">Age</th>
                    <th className="text-left py-2 px-3">Emergency Contact</th>
                    <th className="text-left py-2 px-3">Event</th>
                    <th className="text-left py-2 px-3">Distance</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry: any) => (
                    <tr key={entry._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3 text-xs whitespace-nowrap">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {entry.firstName && entry.lastName ? `${entry.firstName} ${entry.lastName}` : '-'}
                      </td>
                      <td className="py-3 px-3">
                        <a href={`mailto:${entry.email}`} className="text-blue-600 hover:underline">
                          {entry.email}
                        </a>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">{entry.phone || '-'}</td>
                      <td className="py-3 px-3">{entry.address?.city || '-'}</td>
                      <td className="py-3 px-3">{entry.age || '-'}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {entry.emergencyContact?.name || '-'}
                        {entry.emergencyContact?.phone && (
                          <div className="text-xs text-gray-500">{entry.emergencyContact.phone}</div>
                        )}
                      </td>
                      <td className="py-3 px-3">{entry.eventTitle}</td>
                      <td className="py-3 px-3">{entry.distanceLabel}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          entry.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
