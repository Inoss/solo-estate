import { Card, CardContent } from '@/components/ui/card'

interface ProjectLocationProps {
  location: {
    city?: string
    area?: string
    address?: string
    lat?: number
    lng?: number
  }
}

export function ProjectLocation({ location }: ProjectLocationProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Location</h2>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {location.address && (
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-lg font-semibold">{location.address}</p>
              </div>
            )}

            {location.area && (
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-lg font-semibold">{location.area}</p>
              </div>
            )}

            {location.city && (
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="text-lg font-semibold">{location.city}</p>
              </div>
            )}
          </div>

          {/* Map Placeholder - can be replaced with Google Maps or another service */}
          {location.lat && location.lng && (
            <div className="mt-6">
              <div className="relative h-64 w-full rounded-lg overflow-hidden bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
