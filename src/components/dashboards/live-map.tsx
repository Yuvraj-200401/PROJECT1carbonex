
'use client';

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { MapPin, Shield, Wind, Flame, Droplets, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Project } from '@/lib/demo-data';

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

type Threat = {
    id: number;
    text: string;
    severity: string;
    area: string;
    lat: number;
    lng: number;
}

interface LiveMapProps {
    projects: Project[];
    threats: Threat[];
}

export function LiveMap({ projects, threats }: LiveMapProps) {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const getIcon = (type: 'Project' | 'Threat') => {
    switch (type) {
      case 'Project': return <Shield className="w-5 h-5 text-white" />;
      case 'Threat': return <AlertTriangle className="w-5 h-5 text-white" />;
      default: return <MapPin className="w-5 h-5 text-white" />;
    }
  }


  const getColor = (type: 'Project' | 'Threat') => {
    switch (type) {
      case 'Project': return 'bg-primary';
      case 'Threat': return 'bg-destructive';
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
        {projects.map((point, index) => (
          <AdvancedMarker
            key={`project-${point.id}`}
            position={{ lat: point.lat, lng: point.lng }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor('Project')} shadow-lg border-2 border-background cursor-pointer`}
                  >
                    {getIcon('Project')}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='font-semibold'>{point.siteName}</p>
                  <p>Status: {point.status}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AdvancedMarker>
        ))}
         {threats.map((point, index) => (
          <AdvancedMarker
            key={`threat-${point.id}`}
            position={{ lat: point.lat, lng: point.lng }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: (projects.length + index) * 0.1, type: 'spring' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor('Threat')} shadow-lg border-2 border-background cursor-pointer`}
                  >
                    {getIcon('Threat')}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='font-semibold'>{point.area}: {point.severity} Severity</p>
                  <p>{point.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}
