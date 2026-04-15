"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Ambulance,
  Flame,
  MapPin,
  Phone,
  Shield,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PoliceStation {
  name: string
  district: string
  phone: string
}

interface EmergencyContact {
  name: string
  number: string
  type: "police" | "fire" | "ambulance" | "disaster" | "national"
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
  { name: "Wayanad District Police", district: "Wayanad", phone: "0493-6202222" },
]

const emergencyContacts: EmergencyContact[] = [
  { name: "Police", number: "112", type: "police", icon: <Shield className="h-4 w-4" /> },
  { name: "Fire", number: "101", type: "fire", icon: <Flame className="h-4 w-4" /> },
  { name: "Ambulance", number: "108", type: "ambulance", icon: <Ambulance className="h-4 w-4" /> },
  { name: "Kerala Disaster Management", number: "1077", type: "disaster", icon: <Waves className="h-4 w-4" /> },
  { name: "National Disaster Response Force", number: "011-24363260", type: "national", icon: <AlertTriangle className="h-4 w-4" /> },
]

export function SOSEmergencyButton() {
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredStations = selectedDistrict
    ? keralaPoliceStations.filter((station) => station.district === selectedDistrict)
    : keralaPoliceStations

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full bg-black text-white shadow-[0_14px_30px_rgba(17,17,17,0.22)]"
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="sr-only">Emergency contacts</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto border-black/10 bg-white">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-semibold">
            Emergency contacts
          </DialogTitle>
          <DialogDescription>
            Quick access to emergency hotlines and Kerala police station numbers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="border-b border-black/10 pb-5">
              <CardTitle className="font-display text-2xl font-semibold">
                Hotlines
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 p-6 md:grid-cols-2">
              {emergencyContacts.map((contact) => (
                <button
                  key={contact.number}
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="flex items-center justify-between rounded-[20px] border border-black/10 bg-white px-4 py-4 text-left transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03]">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-text-secondary">{contact.number}</p>
                    </div>
                  </div>
                  <Badge className="rounded-full border-black/10 bg-white text-text-secondary">
                    {contact.type}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="border-b border-black/10 pb-5">
              <CardTitle className="font-display text-2xl font-semibold">
                Kerala police stations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedDistrict === "" ? "default" : "outline"}
                  onClick={() => setSelectedDistrict("")}
                >
                  All districts
                </Button>
                {Array.from(new Set(keralaPoliceStations.map((station) => station.district))).map((district) => (
                  <Button
                    key={district}
                    size="sm"
                    variant={selectedDistrict === district ? "default" : "outline"}
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {district}
                  </Button>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {filteredStations.map((station) => (
                  <div
                    key={`${station.district}-${station.name}`}
                    className="rounded-[20px] border border-black/10 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{station.name}</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {station.district}
                        </p>
                      </div>
                      <MapPin className="h-4 w-4 text-text-muted" />
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full justify-start bg-white"
                      onClick={() => handleEmergencyCall(station.phone)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {station.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
