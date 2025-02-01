import { Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#2248FF] pb-20 text-white pt-10 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-3">Participe da comunidade!</h3>
                        <div className="flex items-center justify-center md:justify-start space-x-6">
                            <Link
                                href="https://www.facebook.com/profile.php?id=61558419146157&mibextid=LQQJ4d"
                                target="_blank"
                                className="hover:text-[#FFC006] transition-colors"
                                aria-label="Siga-nos no Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://twitter.com/D_ultimahora"
                                target="_blank"
                                className="hover:text-[#FFC006] transition-colors"
                                aria-label="Siga-nos no Twitter"
                            >
                                <Twitter className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/dultimahora.app"
                                target="_blank"
                                className="hover:text-[#FFC006] transition-colors"
                                aria-label="Siga-nos no Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                    <div className="text-center md:text-right text-sm">
                        <p>{`© 2025 por D'Ultimahora.`}</p>
                        <p>Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

