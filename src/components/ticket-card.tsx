import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { Ingresso } from "@prisma/client"

export function TicketCard({ id, formato_ingresso, qtd_ingressos, tipo_ingresso, nome_completo, valor_un }: Ingresso) {
  return (
    <Link href={`/ingresso/${id}`}>
      <Card className="bg-white hover:bg-gray-50 min-h-full transition-all duration-300 shadow-md m-3 sm:m-auto min-w-[318px] max-w-[400px] mx-auto rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-center cursor-pointer"> 
        <CardContent className="p-6 min-h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image src={'/img/tickets/ticket-azul.svg'} width={14} height={14} alt="ticket azul" className="mr-2" />
              <span className="font-semibold text-lg text-gray-800 text-pretty">{nome_completo.split(' ')[0].split('', 9).reduce((o, c) => o.length === 8 ? `${o}${c}...` : `${o}${c}`, '')}</span>
            </div>
            <span className="text-2xl font-bold text-[#2248FF]">R${valor_un.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quantidade:</span>
              <span className="font-medium text-gray-800">
                {qtd_ingressos} {qtd_ingressos > 1 ? "Entradas" : "Entrada"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Formato:</span>
              <span className="font-medium text-gray-800">{formato_ingresso}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tipo:</span>
              <span className="font-medium text-gray-800">{tipo_ingresso}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t self-end border-gray-200">
            <button className="w-full bg-[#FFC006] text-white py-2 px-4 rounded-lg hover:bg-[#bf9d38] transition-colors duration-300">
              {`Ver D'etalhes`}
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

