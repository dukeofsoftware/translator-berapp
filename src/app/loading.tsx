"use client"

import { Loader } from "@mantine/core"

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader size="xl" variant="dots" />;
    </div>
  )
}
