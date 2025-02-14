import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ContactUs({ className }: { className?: string }) {
    const handleWhatsAppClick = () => {
        window.open("https://wa.me/5555996065533?text=Ol%C3%A1+equipe+D%27Ultimahora%21", "_blank")
    }

    return (
        <section className={cn("bg-[#2248FF] py-16 rounded-lg", className)}>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Fale Conosco!</h2>
                    <p className="text-white mb-8">
                        Tem alguma dúvida, sugestão ou feedback? Estamos aqui para ajudar! Entre em contato conosco pelo WhatsApp e
                        teremos prazer em atendê-lo.
                    </p>
                    <Button
                        onClick={handleWhatsAppClick}
                        className="bg-[#FFC006] text-white font-bold hover:bg-[#FFC006]/90 text-xl px-8 py-6 rounded-2xl flex items-center justify-center mx-auto"
                    >
                        <MessageCircle strokeWidth={3} />
                        Falar no WhatsApp      
                    </Button>
                </div>
            </div>
        </section>
    )
}

