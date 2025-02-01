import { ButtonImage } from '@/components/content/hero/buttonImage'
import Image from "next/image"

import '@/components/content/hero/styles.css';

export function Hero() {
    return (
        <section className={styles['hero-section']}>
            <div id="logo-header" className={styles['hero-logo-header']}>
                <Image
                    src="/img/isologo.svg"
                    alt="Logo Dultimahora"
                    width={150}
                    height={150}
                />
            </div>
            <section className='h-full my-16'>
                <div id="hero-text" className={styles['hero-text']}>
                    <p className={styles['hero-text-sm']}>Para resolver teu rolê em</p>
                    <h2 className={styles['hero-text-lg']}>Santa Maria</h2 >
                </div>
                <div id="hero-cta" className={styles['hero-cta']}>
                    <ButtonImage
                        href="/evento"
                        text="Encontrar ingressos"
                        imageSrc="/img/dultimahora/d-compra-hero.png"
                        leftImg
                    />
                    <ButtonImage
                        href="/revender"
                        text="Revender ingresso"
                        imageSrc="/img/dultimahora/d-venda-hero.png"
                    />
                </div>
            </section>
        </section>
    )
}

const styles = {
    'hero-section': 'h-svh hero min-h-[602px]',
    'hero-logo-header': 'w-full flex py-4 justify-center',
    'hero-text': 'text-center text-white font-extrabold my-2',
    'hero-text-sm': 'text-sm sm:text-xl',
    'hero-text-lg': 'text-4xl sm:text-5xl',
    'hero-cta': 'flex flex-col lg:flex-row items-center justify-between xl:w-2/3 lg:justify-evenly mx-auto my-16 gap-16 lg:gap-5',
}