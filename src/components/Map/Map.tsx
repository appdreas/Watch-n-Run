import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import { ICON } from 'public/Icon'

const Map = () => {
    const position: LatLngExpression = [51.505, -0.09]

    function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker icon={ICON} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


  return (
    <MapContainer className='w-full h-full' center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer 
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <LocationMarker />
    </MapContainer>

  )
}

export default Map