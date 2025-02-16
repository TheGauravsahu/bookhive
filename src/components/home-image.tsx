"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface HomeImageProps {
  lightImage: string;
  darkImage: string;
  alt: string;
}
export default function HomeImage({
  darkImage,
  lightImage,
  alt,
}: HomeImageProps) {
  const { theme } = useTheme();

  return (
    <div className="h-96 w-full relative my-4 md:mt-4 rounded-lg">
      <Image
        src={theme === "light" ? lightImage : darkImage}
        alt={alt}
        fill
        className="object-contain  rounded-lg"
      />
    </div>
  );
}
