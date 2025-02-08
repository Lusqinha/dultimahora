import { DollarSignIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdBanner({ className }: { className?: string }) {
    // Aqui você pode adicionar lógica para verificar se há um banner específico para exibir
    const hasCustomBanner = false // Substitua isso pela sua lógica real

    if (hasCustomBanner) {
        return (
            <div className="bg-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500">Banner de anúncio personalizado</p>
            </div>
        )
    }

    return (
        <div className={cn("bg-[#FFC006] rounded-lg px-4 py-3 text-center shadow-lg", className)}>
            <DollarSignIcon className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Espaço Publicitário Disponível</h3>
            <p className="text-white text-xs lg:text-lg mb-4">Alcance seu público-alvo neste evento!</p>
            <button className="bg-white text-[#FFC006] text-md font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                onClick={() => window.open("https://wa.me/5555996065533", "_blank")}
            >
                Comprar Espaço
            </button>
        </div>
    )
}