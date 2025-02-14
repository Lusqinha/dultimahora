import { Users, Zap, Heart } from "lucide-react"
import Image from "next/image"

export function AboutUs() {
    return (
        <section>
            <hr className=" w-11/12 mx-auto my-14"/>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-[#2248FF] mb-8">Sobre Nós</h2>
                <div className="grid md:grid-cols-3 mx-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#FFC006] border-opacity-50 hover:border-opacity-100 transition duration-300 ease-in-out transform hover:-translate-y-2">
                        <Users className="w-12 h-12 text-[#FFC006] mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold text-[#2248FF] mb-2 text-center">Quem Somos</h3>
                        <p className="text-gray-600 text-center">
                            Somos uma dupla de universitários de Santa Maria apaixonados pelos eventos locais. No entanto, nossa agenda apertada e imprevistos frequentes muitas vezes nos deixavam na mão. Cansados da dificuldade em revender ou encontrar ingressos quando necessário, decidimos criar uma solução que simplifica todo esse processo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#FFC006] border-opacity-50 hover:border-opacity-100 transition duration-300 ease-in-out transform hover:-translate-y-2">
                        <Zap className="w-12 h-12 text-[#FFC006] mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold text-[#2248FF] mb-2 text-center">Nossa Missão</h3>
                        <p className="text-gray-600 text-center">
                            Nosso objetivo é criar uma comunidade vibrante em torno dos eventos de Santa Maria, conectando pessoas que buscam ingressos com quem precisa revendê-los. Queremos tornar a compra e venda de ingressos de última hora rápida e fácil. Assim, você não terá prejuízo se não puder ir a um evento, e poderá encontrar ótimas ofertas de lotes anteriores.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#FFC006] border-opacity-50 hover:border-opacity-100 transition duration-300 ease-in-out transform hover:-translate-y-2">
                        <Heart className="w-12 h-12 text-[#FFC006] mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold text-[#2248FF] mb-2 text-center">Nosso Compromisso</h3>
                        <p className="text-gray-600 text-center">
                            Estamos sempre prontos para atender você e garantir que tudo funcione perfeitamente. Conte conosco para qualquer dúvida ou sugestão sobre o site. Trabalhamos continuamente para melhorar nossa plataforma e trazer a melhor experiência para vocês!
                        </p>
                    </div>
                </div>
                <div className="mt-12 text-center flex flex-col items-center">
                    <p className="text-xl text-[#2248FF] font-bold">Com carinho,</p>
                    <Image src={"img/isologo-laranja.svg"} width={150} height={150} alt="D'ultimaHora" />
                </div>
            </div>
            <hr className=" w-11/12 mx-auto my-14" />
        </section>
    )
}

