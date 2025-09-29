
'use client';

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { MapPin, Shield, Wind, Flame, Droplets } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Dark theme for Google Maps
const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export function LiveMap() {
  const points = [
    { id: 'threat-1', type: 'Cyclone', lat: 21.9, lng: 89.1, label: 'Cyclone Alert: Sundarbans' },
    { id: 'ngo-1', type: 'Project', lat: 20.7, lng: 86.9, label: 'Mangrove Planting: Bhitarkanika' },
    { id: 'threat-2', type: 'Pollution', lat: 11.4, lng: 79.7, label: 'Industrial Runoff: Pichavaram' },
    { id: 'ngo-2', type: 'Project', lat: 22.6, lng: 69.8, label: 'Community Patrol: Gulf of Kutch' },
    { id: 'threat-3', type: 'Wildfire', lat: 21.9, lng: 86.7, label: 'Forest Fire Risk: Simlipal' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Cyclone': return <Wind className="w-5 h-5 text-white" />;
      case 'Pollution': return <Droplets className="w-5 h-5 text-white" />;
      case 'Wildfire': return <Flame className="w-5 h-5 text-white" />;
      case 'Project': return <Shield className="w-5 h-5 text-white" />;
      default: return <MapPin className="w-5 h-5 text-white" />;
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'Cyclone': return 'bg-blue-500';
      case 'Pollution': return 'bg-gray-500';
      case 'Wildfire': return 'bg-orange-600';
      case 'Project': return 'bg-primary';
      default: return 'bg-red-500';
    }
  }

  return (
    <div className="relative w-full h-[500px] bg-muted/30 rounded-lg overflow-hidden border border-border">
      <Map
        defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
        defaultZoom={5}
        mapId="carbo-nex-map"
        styles={mapStyle}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {points.map((point, index) => (
          <AdvancedMarker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(point.type)} shadow-lg border-2 border-background cursor-pointer`}
                  >
                    {getIcon(point.type)}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{point.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}
