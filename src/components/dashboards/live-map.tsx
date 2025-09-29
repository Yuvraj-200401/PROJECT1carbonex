
'use client';

import { motion } from 'framer-motion';
import { MapPin, Shield, Ship, Wind } from 'lucide-react';

export function LiveMap() {
  // Mock data for map points within India
  const points = [
    { id: 'threat-1', type: 'threat', top: '45%', left: '80%', label: 'Cyclone Alert: Sundarbans' },
    { id: 'ngo-1', type: 'ngo', top: '60%', left: '75%', label: 'Mangrove Planting: Bhitarkanika' },
    { id: 'threat-2', type: 'threat', top: '75%', left: '35%', label: 'Industrial Runoff: Pichavaram' },
    { id: 'ngo-2', type: 'ngo', top: '30%', left: '20%', label: 'Community Patrol: Gulf of Kutch' },
  ];

  return (
    <div className="relative w-full h-96 bg-muted/30 rounded-lg overflow-hidden border border-border">
      {/* Placeholder for a real map library, using a background image of India */}
      <div
        className="w-full h-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/india-map/1200/600)' }}
        data-ai-hint="map India"
      ></div>
      
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
            {point.type === 'threat' ? (
              <MapPin className="w-8 h-8 text-destructive fill-destructive/50" />
            ) : (
              <Shield className="w-8 h-8 text-primary fill-primary/50" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 w-max px-3 py-1 bg-background text-foreground text-xs rounded-md border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-background"></div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Heatmap overlay simulation */}
      <div className="absolute top-1/4 left-3/4 w-1/4 h-1/4 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/2 right-1/4 w-1/4 h-1/4 bg-yellow-500/10 rounded-full blur-2xl animate-pulse [animation-delay:0.5s]"></div>
    </div>
  );
}
