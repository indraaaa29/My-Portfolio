'use client';

import GradualBlur from '@/components/reactbits/GradualBlur';

export default function GlobalGradualBlur() {
  return (
    <GradualBlur
      target="page"
      position="top"
      height="14rem"
      strength={1}
      divCount={10}
      curve="bezier"
      exponential
      opacity={0.45}
      zIndex={0}
    />
  );
}
