import Image from "next/image"
import Link from "next/link"

interface ButtonImageProps {
    href: string
    text: string
    imageSrc: string
    leftImg?: boolean
    className?: string
}

export function ButtonImage({ href, text, imageSrc, leftImg }: ButtonImageProps) {

    const btn_img_cn = leftImg ? "absolute -left-1 -bottom-1" : "absolute -right-1 bottom-0"
    const btn_txt_cn = leftImg ? "w-full ml-8 text-4xl text-right" : "w-full text-4xl text-left pr-4"

    return (
        <Link
            href={href}
            className="group relative flex items-center justify-leftoverflow-visible rounded-3xl bg-[#FFBF00] px-8 py-3 text-xl h-[111px] w-[423px] font-bold text-white shadow-xl hover:shadow-xl shadow-slate-950 hover:shadow-slate-50 transition-all ease-in-out duration-400 sm:scale-100 scale-75 "
        >
            <div className={btn_img_cn}>
                <Image
                    src={imageSrc}
                    alt=""
                    width={200}
                    height={200}

                    className="object-contain"
                />
            </div>
            <span className={btn_txt_cn}>{text}</span>
        </Link>
    )
}