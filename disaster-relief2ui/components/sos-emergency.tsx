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
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-accent-red hover:bg-accent-red/90 text-white shadow-glow-teal animate-pulse border-2 border-accent-red/50"
        >
          <AlertTriangle className="w-8 h-8" />
          <span className="sr-only">Emergency SOS</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border flex flex-col items-start bg-bg-surface overflow-x-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-display font-black text-accent-red flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            Emergency SOS
          </DialogTitle>
          <DialogDescription className="text-text-muted mt-2 text-base">
            Immediate access to emergency services, police stations, and disaster management contacts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 w-full">
          {/* Emergency Hotlines */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-red">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <Phone className="w-5 h-5 text-accent-red" />
                Emergency Hotlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {emergencyContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start bg-glass-02 border-glass-border hover:bg-glass-03 hover:border-accent-red/50 transition-all font-body"
                    onClick={() => handleEmergencyCall(contact.number)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-accent-red bg-accent-red/10 p-2 rounded-full">{contact.icon}</div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-text-primary">{contact.name}</div>
                        <div className="text-lg font-mono text-text-secondary">{contact.number}</div>
                      </div>
                      <Badge variant="outline" className="border-accent-red/30 text-accent-red uppercase tracking-wide text-xs">
                        {contact.type}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Police Stations by District */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-teal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-primary font-display font-bold">
                <Shield className="w-5 h-5 text-accent-teal" />
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
                  className={selectedDistrict === "" ? "bg-accent-teal text-bg-void hover:bg-accent-teal/90 font-bold" : "border-glass-border text-text-primary hover:bg-glass-02"}
                >
                  All Districts
                </Button>
                {Array.from(new Set(keralaPoliceStations.map(s => s.district))).map(district => (
                  <Button
                    key={district}
                    variant={selectedDistrict === district ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDistrict(district)}
                    className={selectedDistrict === district ? "bg-accent-teal text-bg-void hover:bg-accent-teal/90 font-bold" : "border-glass-border text-text-primary hover:bg-glass-02 text-xs"}
                  >
                    {district}
                  </Button>
                ))}
              </div>

              {/* Police Stations List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredStations.map((station, index) => (
                  <Card key={index} className="bg-glass-01 border border-glass-border hover:border-accent-teal/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-text-primary font-display">{station.name}</h4>
                          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{station.district} District</p>
                          <Button
                            size="sm"
                            className="mt-3 bg-glass-02 hover:bg-accent-teal hover:text-bg-void text-accent-teal border border-accent-teal/30 w-full justify-start font-mono"
                            onClick={() => handleEmergencyCall(station.phone)}
                          >
                            <Phone className="w-3 h-3 mr-2" />
                            {station.phone}
                          </Button>
                        </div>
                        <MapPin className="w-4 h-4 text-accent-teal mt-1 ml-2 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disaster Management Contacts */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-amber">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <Waves className="w-5 h-5 text-accent-amber" />
                Disaster Management & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {disasterHelplines.map((contact, index) => (
                  <div key={index} className="p-4 border border-glass-border rounded-xl bg-glass-01 flex flex-col">
                    <div className="font-semibold text-text-primary mb-1 font-display">{contact.name}</div>
                    <div className="text-lg font-mono text-accent-amber">{contact.number}</div>
                    {contact.number.includes('Local') ? (
                      <p className="text-xs text-text-muted mt-auto pt-2 border-t border-glass-border">
                        Contact your local district office
                      </p>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-3 text-accent-amber bg-accent-amber/10 hover:bg-accent-amber/20 w-full font-mono"
                        onClick={() => handleEmergencyCall(contact.number)}
                      >
                        <Phone className="w-3 h-3 mr-2" />
                        Call Now
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Instructions */}
          <Card className="glass-card-elevated opacity-80">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <AlertTriangle className="w-5 h-5 text-accent-blue" />
                Emergency Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-text-secondary font-body">
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-red/20 blur-md rounded-full group-hover:bg-accent-red/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🚨</span>
                  </span>
                  <p>In case of immediate danger, call emergency services (<strong className="text-text-primary">112</strong>) immediately.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-teal/20 blur-md rounded-full group-hover:bg-accent-teal/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🏥</span>
                  </span>
                  <p>For medical emergencies, use ambulance service (<strong className="text-text-primary">108</strong>) for fastest response.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-amber/20 blur-md rounded-full group-hover:bg-accent-amber/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🏠</span>
                  </span>
                  <p>Stay calm and provide your exact location when calling emergency services.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-blue/20 blur-md rounded-full group-hover:bg-accent-blue/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">📍</span>
                  </span>
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


