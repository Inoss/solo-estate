'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContactRequest {
  id: string
  type: string
  name: string
  email: string
  phone: string
  subject?: string
  message?: string
  projectId?: string
  projectTitle?: string
  country?: string
  budget?: string
  preferredCity?: string
  propertyType?: string
  source?: string
  locale?: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function ContactRequestsPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'contact' | 'offer'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [filter, statusFilter])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('type', filter)
      if (statusFilter !== 'all') params.append('status', statusFilter)

      const response = await fetch(`/api/admin/contact-requests?${params}`)
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else if (response.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/contact-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        fetchRequests()
        setSelectedRequest(null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return

    try {
      const response = await fetch(`/api/admin/contact-requests?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchRequests()
        setSelectedRequest(null)
      }
    } catch (error) {
      console.error('Error deleting request:', error)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeBadgeColor = (type: string) => {
    return type === 'contact'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-indigo-100 text-indigo-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Requests</h1>
            <p className="text-gray-600 mt-1">
              Manage contact form and offer request submissions
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="contact">Contact Form</option>
                <option value="offer">Request Offer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">Total Requests</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {requests.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">New</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {requests.filter(r => r.status === 'new').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">Contacted</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {requests.filter(r => r.status === 'contacted').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">Qualified</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {requests.filter(r => r.status === 'qualified').length}
            </div>
          </div>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400">No requests found</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(request.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(request.type)}`}>
                        {request.type === 'contact' ? 'Contact' : 'Offer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{request.email}</div>
                      <div className="text-xs">{request.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Request Details
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(selectedRequest.type)}`}>
                        {selectedRequest.type === 'contact' ? 'Contact Form' : 'Request Offer'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div><strong>Name:</strong> {selectedRequest.name}</div>
                      <div><strong>Email:</strong> {selectedRequest.email}</div>
                      <div><strong>Phone:</strong> {selectedRequest.phone}</div>
                    </div>
                  </div>

                  {selectedRequest.type === 'contact' && (
                    <>
                      {selectedRequest.subject && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                          <div className="mt-2">{selectedRequest.subject}</div>
                        </div>
                      )}
                      {selectedRequest.message && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Message</h3>
                          <div className="mt-2 whitespace-pre-wrap">{selectedRequest.message}</div>
                        </div>
                      )}
                    </>
                  )}

                  {selectedRequest.type === 'offer' && (
                    <>
                      {selectedRequest.projectTitle && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Project</h3>
                          <div className="mt-2">{selectedRequest.projectTitle}</div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {selectedRequest.country && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Country</h3>
                            <div className="mt-1">{selectedRequest.country}</div>
                          </div>
                        )}
                        {selectedRequest.preferredCity && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Preferred City</h3>
                            <div className="mt-1">{selectedRequest.preferredCity}</div>
                          </div>
                        )}
                        {selectedRequest.budget && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Budget</h3>
                            <div className="mt-1">{selectedRequest.budget}</div>
                          </div>
                        )}
                        {selectedRequest.propertyType && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
                            <div className="mt-1">{selectedRequest.propertyType}</div>
                          </div>
                        )}
                      </div>
                      {selectedRequest.message && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                          <div className="mt-2 whitespace-pre-wrap">{selectedRequest.message}</div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Source</h3>
                      <div className="mt-1">{selectedRequest.source || 'N/A'}</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Language</h3>
                      <div className="mt-1">{selectedRequest.locale?.toUpperCase() || 'N/A'}</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Received</h3>
                      <div className="mt-1">
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                      <div className="mt-1">
                        {new Date(selectedRequest.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Update Status</h3>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => updateStatus(selectedRequest.id, 'new')}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                      >
                        Mark as New
                      </button>
                      <button
                        onClick={() => updateStatus(selectedRequest.id, 'contacted')}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200"
                      >
                        Mark as Contacted
                      </button>
                      <button
                        onClick={() => updateStatus(selectedRequest.id, 'qualified')}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                      >
                        Mark as Qualified
                      </button>
                      <button
                        onClick={() => updateStatus(selectedRequest.id, 'closed')}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                      >
                        Mark as Closed
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-between">
                    <button
                      onClick={() => deleteRequest(selectedRequest.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
                    >
                      Delete Request
                    </button>
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
