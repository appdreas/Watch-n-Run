import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import { ICON } from 'public/Icon'
import { decode, encode } from "@googlemaps/polyline-codec";

const Map = ({ activity, activities }) => {
    const position: LatLngExpression = activity.start_latlng
    //const encoded = decode(activity.map.polyline)
  
    const encoded = activities.slice(0,2).flatMap((act) => {
      return decode(act.map.summary_polyline)
    })

  function LocationMarker({ position }) {
    //const map = useMapEvents({
    // click() {
    //   map.locate()
    // },
    // locationfound(e) {
    //   setPosition(e.latlng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  //})
  return position === null ? null : (
    <Marker icon={ICON} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

  return (
    <MapContainer className='w-full h-full' center={position} zoom={11} scrollWheelZoom={true}>
        <TileLayer 
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {encoded.map((latLng, index) => (<LocationMarker key={index} position={latLng} />)) }
    </MapContainer>

  )
}

export default Map