import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export function Hero() {
    return (
        <section id="hero" className="h-/6 w-full flex flex-col bg-[url('https://static.wixstatic.com/media/94e468_0cbb156733044d1480717571fdde3bbe~mv2.jpg/v1/fill/w_1280,h_345,al_c,q_85,enc_avif,quality_auto/94e468_0cbb156733044d1480717571fdde3bbe~mv2.jpg')] bg-no-repeat bg-cover bg-center ">
            <Header/>
            <div id="title" className="w-1/2 mx-auto text-center my-10 text-white">
                <h3 className=" text-xl mb-2 font-bold">
                    Para resolver seu rolê em
                </h3>
                <h2 className="text-7xl font-extrabold">
                    Santa Maria
                </h2>
            </div>
            <div id="cta-area" className=" mx-auto w-1/2 flex justify-center items-center gap-10">
                <Button className="bg-[#fabf03] font-extrabold text-right text-4xl pr-12 rounded-2xl py-12 pl-28 max-w-[400px]">Encontrar<br/> Ingressos</Button>
                <Button className="bg-[#fabf03] font-extrabold text-left text-4xl pl-12 rounded-2xl py-12 pr-28 max-w-[400px]">Revender <br/>meu Ingresso</Button>
            </div>
        </section>
    )
}