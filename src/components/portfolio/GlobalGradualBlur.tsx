'use client';

import GradualBlur from '@/components/reactbits/GradualBlur';

export default function GlobalGradualBlur() {
  return (
    <GradualBlur
      target="page"
      position="top"
      height="6rem"
      strength={0.8}
      divCount={10}
      curve="ease-out"
      exponential
      opacity={1}
      zIndex={-60}
    />
  );
}
