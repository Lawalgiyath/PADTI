import React from 'react';

export function Logo({ className = "h-8 w-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Circular frame background */}
      <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.1" />
      
      {/* Thick Circle Frame */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" fill="none" />

      {/* Modern High-Roof Truck Front View - Styled as the PADTI logo */}
      <g fill="currentColor">
        {/* Main Chassis/Body */}
        <path d="M25 45 L75 45 L78 50 L78 80 L22 80 L22 50 Z" />
        
        {/* High Roof / Sleeper Cab Top */}
        <path d="M30 25 L70 25 L75 45 L25 45 Z" />
        
        {/* Windshield */}
        <path d="M32 48 L68 48 L66 58 L34 58 Z" fill="white" fillOpacity="0.3" />
        
        {/* Large Grill Section */}
        <rect x="35" y="62" width="30" height="12" rx="1" fill="white" fillOpacity="0.2" />
        
        {/* Grill Detail (Horizontal Bars) */}
        <rect x="37" y="64" width="26" height="1" fill="white" fillOpacity="0.4" />
        <rect x="37" y="67" width="26" height="1" fill="white" fillOpacity="0.4" />
        <rect x="37" y="70" width="26" height="1" fill="white" fillOpacity="0.4" />

        {/* Headlights (Circular) */}
        <circle cx="28" cy="70" r="4" fill="white" fillOpacity="0.5" />
        <circle cx="72" cy="70" r="4" fill="white" fillOpacity="0.5" />
        
        {/* Bumper */}
        <rect x="20" y="80" width="60" height="4" rx="1" />
        
        {/* Tires (Front view depth) */}
        <rect x="24" y="84" width="10" height="4" rx="1" />
        <rect x="66" y="84" width="10" height="4" rx="1" />
      </g>
      
      {/* Road line detail */}
      <path d="M15 92 L85 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
