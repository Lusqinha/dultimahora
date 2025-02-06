import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import type { Ingresso } from "@prisma/client"
import { User2 } from "lucide-react"

export function TicketCard({ id, formato_ingresso, qtd_ingressos, tipo_ingresso, nome_completo, valor_un }: Ingresso) {
  const nome_completo_formatado = nome_completo.split(' ')[0].split('', 9).reduce((o, c) => o.length === 8 ? `${o}${c}...` : `${o}${c}`, '')
  return (
    <Link href={`/ingresso/${id}`}>
      <Card className="bg-white hover:bg-gray-50 min-h-full transition-all duration-300 shadow-md m-3 sm:m-auto min-w-[318px] max-w-[400px] mx-auto rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-center cursor-pointer"> 
        <CardContent className="p-6 min-h-full">
          <CardHeader className="text-xl font-bold text-[#2248FF] -mt-8 border-b border-gray-200 py-4">
            <span className="flex items-center justify-center text-center text-lg sm:text-xl">
              <User2 className="mr-2" />
              {`${nome_completo_formatado} ofereceu:`}
            </span>
          </CardHeader>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <Image src={'/img/tickets/ticket-azul.svg'} width={14} height={14} alt="ticket azul" className="mr-2" />
              <span className="text-gray-800 text-2xl">{qtd_ingressos > 1 ? `${qtd_ingressos} Entradas` : `${qtd_ingressos} Entrada`}</span>
            </div>
            <span className="text-2xl font-bold text-[#2248FF]">R${valor_un.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
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

