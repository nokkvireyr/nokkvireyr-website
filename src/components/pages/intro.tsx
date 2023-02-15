import { DataProvider, Hello, NextArrow } from "@pages/index";
import style from '@styles/home/home.module.scss';
import { useContext, useEffect, useRef, useState } from "react";
import { PageLayout } from "./page";

export const Intro = () => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const { intro } = useContext(DataProvider);

    const [data, setData] = useState();

    useEffect(() => {


        window.addEventListener('scroll', scroller, { passive: true });

        // const fetchData = async () => {
        //     const res = await fetch('http://192.168.3.9:8055/items/intro_text');
        //     const json = await res.json();
        //     setData(json);
        // }

        // fetchData();

        return () => {
            window.removeEventListener('scroll', scroller);
        }
    }, [])

    const scroller = (event: any) => {
        if (scrollRef.current) {
            scrollRef.current.querySelectorAll('[data-scroll]').forEach((el: any) => {
                if (window.scrollY > 0) {
                    el.classList.remove(style.in);
                    let timeout = el.getAttribute('data-timeout');
                    if (!timeout) timeout = '0';
                    const newScroll = ((window.scrollY) - el.offsetTop) + 300;
                    el.style.transform = 'translateX(' + (newScroll > 0 ? newScroll / 12 : 0) + 'px)';
                    el.style.opacity = (1 - (window.scrollY / window.innerHeight)).toString();
                } else {
                    el.style.transform = 'translateX(0px)';
                    el.style.opacity = '1';
                }
            })
        }
    }

    return (
        <>
            <PageLayout id="#home">
                <section className={style.intro}>
                    <div className={style.intro__text} ref={scrollRef}>
                        <div data-scroll data-timeout={0} className={`${style.intro__hello} ${style.in}`}><span><Hello /></span></div>
                        <div data-scroll data-timeout={25} className={`${style.intro__title}  ${style.in}`}><span>{intro.title}</span></div>
                        <div data-scroll data-timeout={50} className={`${style.intro__sub__title} ${style.in}`}><span>{intro.subtitle}</span></div>
                        <div data-scroll data-timeout={75} className={`${style.intro__description} ${style.in}`}><span>{intro.description}</span></div>
                    </div>
                    {/* <div className={style.intro__image}>
                <img src="/images/developer.svg" alt="Developer" />
            </div> */}
                    <NextArrow href="#projects" />
                </section>
            </PageLayout>
        </>
    )
}