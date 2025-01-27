import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="bg-[#3F7EA7] p-4 hidden md:block">
            <div className="max-w-xl mx-auto">
                    <Link href={'/'}>
                        <Image
                            src="/img/dultimahora.png"
                            alt="D'Ultima Hora Logo"
                            width={200}
                            height={60}
                            className="mx-auto h-12 w-auto"
                            />
                    </Link>
            </div>
        </header>
    )
}