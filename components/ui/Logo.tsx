'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/assets/hero/logo.png"
      alt="Next Mavens"
      width={96}
      height={32}
      priority={false}
      className="h-8 w-auto"
    />
  );
} 