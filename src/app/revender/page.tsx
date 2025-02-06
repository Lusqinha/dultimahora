"use client"

import Image from "next/image"

import { ResaleForm } from "@/components/resale/resale-form"

export default function ResalePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
          <ResaleForm />
      </div>
    </main>
  )
}

