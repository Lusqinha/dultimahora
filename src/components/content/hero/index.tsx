import { ButtonImage } from '@/components/content/hero/buttonImage'
import Image from "next/image"

import '@/components/content/hero/styles.css';

export function Hero() {
    return (
        <section className={styles['hero-section']}>
            <div id="logo-header" className={styles['hero-logo-header']}>
                <Image
                    src="/img/dultimahora/logo.png"
                    alt="Logo Dultimahora"
                    width={150}
                    height={150}
                />
            </div>
            <section className='h-full'>
                <div id="hero-text" className={styles['hero-text']}>
                    <p className={styles['hero-text-sm']}>Para resolver teu rolê em</p>
                    <h2 className={styles['hero-text-lg']}>Santa Maria</h2 >
                </div>
                <div id="hero-cta" className={styles['hero-cta']}>
                    <ButtonImage
                        href="#"
                        text="Encontrar ingressos"
                        imageSrc="/img/dultimahora/d-compra-hero.png"
                        leftImg
                    />
                    <ButtonImage
                        href="#"
                        text="Revender meu ingresso"
                        imageSrc="/img/dultimahora/d-venda-hero.png"
                    />
                </div>
            </section>
        </section>
    )
}

const styles = {
    'hero-section': 'h-svh hero',
    'hero-logo-header': 'w-full flex justify-center',
    'hero-text': 'text-center text-white font-extrabold my-10',
    'hero-text-sm': 'text-sm sm:text-xl',
    'hero-text-lg': 'text-4xl sm:text-5xl',
    'hero-cta': 'flex flex-col lg:flex-row items-center justify-between xl:w-2/3 lg:justify-evenly mx-auto',
}