"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export function TermsBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if the user has already accepted the terms
    const termsAccepted = localStorage.getItem('termsAccepted')
    if (!termsAccepted) {
      setShowBanner(true)
    }
  }, [])

  const acceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-[#2247fff5] text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs mb-4 md:mb-0 md:mr-4 text-justify px-2" style={{ textAlignLast: 'center'}}>
          {`O D'Ultimahora é uma plataforma que une vendedores e compradores. 
          Ao usar nossos serviços, você concorda em tomar precauções durante as negociações, 
          como escolher locais públicos para encontros e verificar a autenticidade das ofertas. 
          A plataforma não se responsabiliza por transações entre usuários.`}
        </p>
        <div className="flex items-center">
          <Button 
            onClick={acceptTerms}
            className="bg-[#ffc106] text-white hover:bg-[#FFC006]/90"
          >
            Aceitar Termos
          </Button>
        </div>
      </div>
    </div>
  )
}
