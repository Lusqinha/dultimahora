import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TicketCardProps {
    offeredBy: string
    quantity: number
    price: number
    format: string
    type: string
}

export function ticketCard({...props}:TicketCardProps) {
    return (
        <Card className="max-w-sm bg-white shadow-sm">
            <CardHeader className="pb-2 pt-4">
                <p className="text-sm text-muted-foreground">
                    {props.offeredBy} ofereceu:
                </p>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">
                                {props.quantity} Entradas
                            </span>
                            <span>-</span>
                            <span className="font-semibold">
                                R$ {props.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <div>
                                Form: <span className="text-foreground">{props.format}</span>
                            </div>
                            <div>
                                Tipo: <span className="text-foreground">{props.type}</span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-yellow-500" />
                </div>
            </CardContent>
        </Card>
    )
}