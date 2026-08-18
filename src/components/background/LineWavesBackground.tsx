'use client';

import React from 'react';
import LineWaves from '@/components/reactbits/LineWaves';

export default function LineWavesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      <LineWaves
        speed={0.16}
        innerLineCount={24}
        outerLineCount={28}
        warpIntensity={0.55}
        rotation={-45}
        edgeFadeWidth={0}
        colorCycleSpeed={0.2}
        brightness={0.08}
        color1="#D6A85F"
        color2="#D6A85F"
        color3="#D6A85F"
        enableMouseInteraction={false}
        mouseInfluence={0}
      />
    </div>
  );
}
