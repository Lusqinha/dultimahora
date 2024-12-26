"use client"

import Image from "next/image"
import { redirect } from "next/navigation"
import { useState } from "react"

import { ResaleForm } from "@/components/resale-form"
import {Button} from "@/components/ui/button"


export default function ResalePage() {
  const [hasEvent, setHasEvent] = useState<boolean>(false)

  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Info Box */}
        <div className="relative my-8">
          <Image
            src="/img/d-alerta.png"
            alt="Platform Icon"
            width={111}
            height={92}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          />
          <div className="bg-[#FBC004] rounded-2xl p-6 pt-8">
            <p className="text-justify text-white font-bold [text-align-last:center]">
              {`O D'Ultimahora é uma plataforma para unir quem quer vender,
              com quem quer comprar, sem qualquer taxa ou cobrança.
              Ao anunciar seu ingresso os interessados irão lhe chamar, e a
              negociação é por sua conta...`}
            </p>
          </div>
        </div>

        <div className="flex gap-4 my-5">
          <Button
            className="w-full bg-[#2b5d7f] text-white hover:bg-[#2b5d7f]/90"
            onClick={() => redirect("/evento/cadastrar")}
          >
            Cadastrar Evento
          </Button>
          <Button
            className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
            onClick={() => setHasEvent(true)}
          >
            Já tenho evento
          </Button>
        </div>
        
        {
          hasEvent && (
            <div>
              <h1 className="text-2xl font-bold text-center text-[#2b5d7f] mb-8">
                Preencha os campos abaixo para
                <br />
                anunciar seu ingresso!
              </h1>
              <ResaleForm />
            </div>
          )
        }
      </div>
    </main>
  )
}

