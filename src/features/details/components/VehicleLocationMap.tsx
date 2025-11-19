import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// Importamos 'useEffect' e 'useState' apenas se forem necessários para outras lógicas.
// Para este componente, eles não são mais necessários.
// import { useEffect, useState } from 'react'

// Fix for default icon issue with webpack/Vite:
// Importações das imagens de ícone padrão do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// 1. Defina o Ícone Padrão
// Esta definição precisa ser feita ANTES da função do componente.
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// ❌ REMOVA QUALQUER LINHA COMO ESTA:
// L.Marker.prototype.options.icon = DefaultIcon
// Esta modificação global é a raiz do seu problema em ambientes modernos de React/Build.

interface VehicleLocationMapProps {
  latitude: number
  longitude: number
  locationName: string
}

export function VehicleLocationMap({
  latitude,
  longitude,
  locationName,
}: VehicleLocationMapProps) {
  // Não é necessário o useState/useEffect 'isClient', pois o componente PAI já usa o React.lazy

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg"
      style={{ height: '400px' }}
    >
      <MapContainer
        // Key importante para garantir que o mapa remonte se as coordenadas mudarem
        key={`${latitude}-${longitude}`}
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 2. Aplique o ícone explicitamente à prop 'icon' do Marker */}
        <Marker position={[latitude, longitude]} icon={DefaultIcon}>
          <Popup>{locationName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
