import { BackArrow } from "@/components/layout/back-arrow"
import { Card } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function TermsPage() {
    return (
        <main className="min-h-screen pb-20 md:pt-12">
            <BackArrow />

            {/* Header */}
            <div className="bg-[#2248FF] text-white py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Shield className="w-8 h-8" />
                        <h1 className="text-2xl font-bold text-center">Termos e Condições</h1>
                    </div>
                    <p className="text-center text-sm opacity-90">Última atualização: 10 de Fevereiro de 2024</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                <Card className="p-6 space-y-8">
                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-600 mb-6">
                            Estes Termos e Condições regulam o uso da plataforma {`D'UltimaHora`}. Ao acessar e utilizar a plataforma,
                            você concorda com estes termos na íntegra. Caso discorde de qualquer parte, recomendamos que não utilize
                            nossos serviços.
                        </p>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">1. Sobre a Plataforma</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    O {`D'UltimaHora`} é uma plataforma online que facilita a conexão entre pessoas interessadas em vender e
                                    comprar ingressos para eventos.
                                </p>
                                <p>
                                    O site, sua ideia e seu conteúdo são protegidos por direitos autorais e outras leis de propriedade
                                    intelectual. Qualquer uso não autorizado pode violar essas leis.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">2. Funcionamento da Plataforma</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    O {`D'UltimaHora`} atua exclusivamente como um intermediário, conectando vendedores e compradores de
                                    ingressos.
                                </p>
                                <p>
                                    Todas as negociações são realizadas diretamente entre as partes envolvidas, fora da plataforma,
                                    preferencialmente pelo WhatsApp.
                                </p>
                                <p>
                                    O {`D'UltimaHora`} não participa, não interfere e não se responsabiliza por qualquer transação realizada
                                    entre os usuários.
                                </p>
                                <p>
                                    Os usuários são responsáveis pela veracidade das informações fornecidas e pela segurança das
                                    negociações efetuadas.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">3. Suporte e Assistência</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>Nosso time está disponível para oferecer suporte e assistência relacionados ao uso da plataforma.</p>
                                <p>
                                    Para dúvidas, problemas técnicos ou outras solicitações, entre em contato pelos canais de atendimento
                                    disponíveis no site.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">4. Responsabilidades do Usuário</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>Ao utilizar nossa plataforma, o usuário concorda em:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Não copiar, reproduzir ou distribuir o conteúdo da plataforma sem autorização prévia;</li>
                                    <li>Não realizar atividades fraudulentas ou enganosas;</li>
                                    <li>Não violar leis aplicáveis ou direitos de terceiros;</li>
                                    <li>Fornecer informações corretas e atualizadas ao cadastrar-se e utilizar a plataforma;</li>
                                    <li>Assumir total responsabilidade pelas negociações realizadas fora da plataforma;</li>
                                    <li>
                                        Garantir que qualquer imagem postada não viole direitos autorais ou contenha conteúdo ofensivo ou
                                        ilegal.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">5. Limitações de Responsabilidade</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    O uso da plataforma é de responsabilidade exclusiva do usuário. Não nos responsabilizamos por
                                    quaisquer perdas, danos ou inconvenientes decorrentes do uso ou indisponibilidade da plataforma.
                                </p>
                                <p>
                                    O {`D'UltimaHora`} não se responsabiliza pela autenticidade dos ingressos vendidos pelos usuários nem por
                                    qualquer problema decorrente das negociações realizadas fora da plataforma.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">6. Notificações e Comunicação</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    A plataforma oferece o serviço de notificações via WhatsApp para manter os usuários informados sobre
                                    eventos e oportunidades.
                                </p>
                                <p>Para receber notificações, o usuário deve fornecer nome e número de telefone de forma voluntária.</p>
                                <p>
                                    O {`D'UltimaHora`} compromete-se a utilizar esses dados apenas para fins de comunicação relacionada à
                                    plataforma, garantindo a proteção das informações conforme a legislação vigente.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">7. Alterações nos Termos e Condições</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento, sem aviso prévio.
                                </p>
                                <p>O uso contínuo da plataforma após mudanças implica na aceitação dos novos termos.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-[#2248FF] mb-4">8. Lei Aplicável</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>Estes Termos e Condições são regidos pelas leis do Código Civil Brasileiro.</p>
                                <p>
                                    Qualquer disputa decorrente do uso da plataforma será resolvida nos tribunais competentes da
                                    jurisdição brasileira.
                                </p>
                            </div>
                        </section>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 text-center">
                                Caso tenha dúvidas sobre estes Termos e Condições, entre em contato com nosso suporte.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
}

