import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRightIcon } from 'lucide-react'
import { Ingresso } from "@prisma/client"

export function TicketCard({ id, formato_ingresso, qtd_ingressos, tipo_ingresso, nome_completo, valor_un }: Ingresso) {
  return (
    <Link href={`/ingresso/${id}`}>
      <Card className="bg-white hover:bg-stone-800 hover:text-[#FBC004]  ease-in-out transition-all shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] m-3 sm:m-auto max-w-[400px] mx-auto rounded-[50px] rounded-ss-none rounded-br-none ">
        <CardContent className=" mx-5 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className=" font-bold">
                {nome_completo} ofereceu:
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {qtd_ingressos} {qtd_ingressos > 1 ? 'Entradas' : 'Entrada'}
                </span>
                <span>-</span>
                <span className="font-semibold">
                  R$ {valor_un.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  Form: <span className="text-foreground">{formato_ingresso}</span>
                </div>
                <div>
                  Tipo: <span className="text-foreground">{tipo_ingresso}</span>
                </div>
              </div>
            </div>
            <ChevronRightIcon className="h-7 w-7 text-[#FBC004] font-extrabold" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

