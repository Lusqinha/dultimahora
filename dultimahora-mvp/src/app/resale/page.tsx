import { ResaleForm } from "@/components/resale-form"
import Image from "next/image"

export default function ResalePage() {
  return (
    <main className="min-h-screen bg-white">
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
              O D'Ultimahora é uma plataforma para unir quem quer vender,
              <br />
              com quem quer comprar, sem qualquer taxa ou cobrança.
              <br />
              Ao anunciar seu ingresso os interessados irão lhe chamar, e a
              <br />
              negociação é por sua conta...
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-[#2b5d7f] mb-8">
          Preencha os campos abaixo para
          <br />
          anunciar seu ingresso!
        </h1>

        <ResaleForm />
      </div>
    </main>
  )
}

