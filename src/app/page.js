"use client"

import { useCheckAuth } from '@/hooks/useCheckAuth';

export default function Home() {
  useCheckAuth()

  return <div>
    <h1>Checking Authentication...</h1>
  </div>
}
