'use client';

import { motion } from 'framer-motion';

interface CameraHUDProps {
  focalLength?: string;
  aperture?: string;
  iso?: string;
  shutter?: string;
  mode?: string;
  active?: boolean;
}

export default function CameraHUD({
  focalLength = '35mm',
  aperture = 'f/1.4',
  iso = 'ISO 100',
  shutter = '1/500s',
  mode = 'RAW · 14-BIT',
  active = true,
}: CameraHUDProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top HUD Row */}
      <div className="flex items-center justify-between font-mono text-[10px] md:text-xs text-[#a3a3a3]/60 tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="text-[#f59e0b] font-semibold">{mode}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{focalLength}</span>
          <span>{aperture}</span>
          <span>{shutter}</span>
          <span>{iso}</span>
        </div>
      </div>

      {/* Viewfinder Corner Reticles */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        {/* Top-Left Corner */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f59e0b]/40" />
        {/* Top-Right Corner */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#f59e0b]/40" />
        {/* Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#f59e0b]/40" />
        {/* Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f59e0b]/40" />
      </div>

      {/* Bottom HUD Row */}
      <div className="flex items-center justify-between font-mono text-[10px] md:text-xs text-[#525252] tracking-widest uppercase">
        <div>ACT I — ENTER THE FRAME</div>
        <div className="flex items-center gap-2">
          <span>FRAME 01</span>
          <span className="text-[#f59e0b]">•</span>
          <span>AUTOFOCUS: ON</span>
        </div>
      </div>
    </div>
  );
}
