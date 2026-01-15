"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Phone, MapPin, Ambulance, Shield, Flame, Waves } from "lucide-react"

interface PoliceStation {
  name: string
  district: string
  phone: string
  address?: string
}

interface EmergencyContact {
  name: string
  number: string
  type: 'police' | 'fire' | 'ambulance' | 'disaster' | 'national'
  icon: React.ReactNode
}

const keralaPoliceStations: PoliceStation[] = [
  { name: "Thiruvananthapuram City Police", district: "Thiruvananthapuram", phone: "0471-2338100" },
  { name: "Ernakulam City Police", district: "Ernakulam", phone: "0484-2395200" },
  { name: "Kozhikode City Police", district: "Kozhikode", phone: "0495-2721234" },
  { name: "Thrissur City Police", district: "Thrissur", phone: "0487-2333333" },
  { name: "Kollam City Police", district: "Kollam", phone: "0474-2794900" },
  { name: "Palakkad District Police", district: "Palakkad", phone: "0491-2505252" },
  { name: "Alappuzha District Police", district: "Alappuzha", phone: "0477-2250161" },
  { name: "Idukki District Police", district: "Idukki", phone: "0486-2233222" },
  { name: "Kannur District Police", district: "Kannur", phone: "0497-2700555" },
  { name: "Kasaragod District Police", district: "Kasaragod", phone: "0499-4250555" },
  { name: "Kottayam District Police", district: "Kottayam", phone: "0481-2563737" },
  { name: "Malappuram District Police", district: "Malappuram", phone: "0483-2733420" },
  { name: "Pathanamthitta District Police", district: "Pathanamthitta", phone: "0468-2222500" },
  { name: "Wayanad District Police", district: "Wayanad", phone: "0493-6202222" }
]

const emergencyContacts: EmergencyContact[] = [
  { name: "Police Control Room", number: "112", type: "police", icon: <Shield className="w-4 h-4" /> },
  { name: "Fire & Rescue Services", number: "101", type: "fire", icon: <Flame className="w-4 h-4" /> },
  { name: "Ambulance Services", number: "108", type: "ambulance", icon: <Ambulance className="w-4 h-4" /> },
  { name: "Kerala State Disaster Management", number: "1077", type: "disaster", icon: <Waves className="w-4 h-4" /> },
  { name: "National Disaster Response Force", number: "011-24363260", type: "national", icon: <AlertTriangle className="w-4 h-4" /> },
  { name: "Kerala Flood Control Room", number: "0471-2338100", type: "disaster", icon: <Waves className="w-4 h-4" /> }
]

const disasterHelplines = [
  { name: "National Disaster Management Authority", number: "011-26701728" },
  { name: "Indian Meteorological Department", number: "1800-180-1717" },
  { name: "Kerala Revenue Department", number: "0471-2338100" },
  { name: "District Collectors Office", number: "Local District Office" }
]

export function SOSEmergencyButton() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredStations = selectedDistrict
    ? keralaPoliceStations.filter(station => station.district === selectedDistrict)
    : keralaPoliceStations

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl animate-pulse border-4 border-white"
        >
          <AlertTriangle className="w-8 h-8" />
          <span className="sr-only">Emergency SOS</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            Emergency SOS - Kerala
          </DialogTitle>
          <DialogDescription>
            Immediate access to emergency services, police stations, and disaster management contacts in Kerala.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Emergency Hotlines */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Hotlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencyContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start border-red-300 hover:bg-red-100"
                    onClick={() => handleEmergencyCall(contact.number)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-red-600">{contact.icon}</div>
                      <div className="text-left flex-1">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.number}</div>
                      </div>
                      <Badge variant="outline" className="border-red-400 text-red-700">
                        {contact.type}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Police Stations by District */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Kerala Police Stations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* District Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedDistrict === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDistrict("")}
                >
                  All Districts
                </Button>
                {Array.from(new Set(keralaPoliceStations.map(s => s.district))).map(district => (
                  <Button
                    key={district}
                    variant={selectedDistrict === district ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {district}
                  </Button>
                ))}
              </div>

              {/* Police Stations List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredStations.map((station, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{station.name}</h4>
                          <p className="text-sm text-muted-foreground">{station.district} District</p>
                          <Button
                            size="sm"
                            className="mt-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleEmergencyCall(station.phone)}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            {station.phone}
                          </Button>
                        </div>
                        <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disaster Management Contacts */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Waves className="w-5 h-5" />
                Disaster Management & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {disasterHelplines.map((contact, index) => (
                  <div key={index} className="p-3 border border-orange-200 rounded-lg bg-white">
                    <div className="font-medium text-orange-900">{contact.name}</div>
                    <div className="text-sm text-orange-700">{contact.number}</div>
                    {contact.number.includes('Local') ? (
                      <p className="text-xs text-muted-foreground mt-1">
                        Contact your local district office
                      </p>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 border-orange-400 text-orange-700 hover:bg-orange-100"
                        onClick={() => handleEmergencyCall(contact.number)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Instructions */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Emergency Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-yellow-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold">🚨</span>
                  <p>In case of immediate danger, call emergency services (112) immediately.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">🏥</span>
                  <p>For medical emergencies, use ambulance service (108) for fastest response.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">🏠</span>
                  <p>Stay calm and provide your exact location when calling emergency services.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">📍</span>
                  <p>Share your location coordinates if possible for faster rescue operations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}


