"use client"

import { Loader } from "@mantine/core"

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center gap-12">
      <Loader size="xl" variant="dots" />;
      <Loader size="xl" variant="dots" />;
      <Loader size="xl" variant="dots" />;
    </div>
  )
}
