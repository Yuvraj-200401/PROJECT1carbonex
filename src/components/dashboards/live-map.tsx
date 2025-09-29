
'use client';

import { motion } from 'framer-motion';
import { MapPin, Shield, Wind, Flame, Mountain, Droplets } from 'lucide-react';
import Image from 'next/image';

export function LiveMap() {
  // Mock data for map points within India
  const points = [
    { id: 'threat-1', type: 'Cyclone', top: '45%', left: '80%', label: 'Cyclone Alert: Sundarbans' },
    { id: 'ngo-1', type: 'Project', top: '60%', left: '75%', label: 'Mangrove Planting: Bhitarkanika' },
    { id: 'threat-2', type: 'Pollution', top: '75%', left: '35%', label: 'Industrial Runoff: Pichavaram' },
    { id: 'ngo-2', type: 'Project', top: '30%', left: '20%', label: 'Community Patrol: Gulf of Kutch' },
    { id: 'threat-3', type: 'Wildfire', top: '25%', left: '45%', label: 'Forest Fire Risk: Simlipal' },
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
      {/* Placeholder for a real map library, using a background image of India */}
      <Image
        src="https://picsum.photos/seed/india-map/1200/800"
        alt="Map of India"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
        data-ai-hint="map India satellite"
      />
      
      {/* Heatmap overlay simulation */}
      <div className="absolute top-1/4 left-3/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/2 right-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl animate-pulse [animation-delay:0.5s]" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />


      {/* Mock data points */}
      {points.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2, type: 'spring' }}
          className="absolute group"
          style={{ top: point.top, left: point.left }}
        >
          <div className="relative flex flex-col items-center">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(point.type)} shadow-lg border-2 border-background`}>
                {getIcon(point.type)}
             </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 w-max px-3 py-1 bg-background text-foreground text-xs rounded-md border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-background"></div>
            </div>
          </div>
        </motion.div>
      ))}

    </div>
  );
}
