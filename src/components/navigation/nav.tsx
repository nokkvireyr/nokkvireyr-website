import style from '@styles/nav/nav.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiFillGithub } from 'react-icons/ai';
// This is the main navigation component
export const Header = () => {

    const [y, setY] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setY(window.scrollY);
    })

    const handleNavigation = useCallback(
        (e: any) => {
            const window = e.currentTarget;
            if (headerRef.current) {
                if (window.scrollY > 100) {
                    headerRef.current.classList.add(style.header__scrolled);
                    if (y > window.scrollY) {
                        headerRef.current.style.transform = "translateY(0)";
                    } else if (y < window.scrollY) {
                        headerRef.current.style.transform = "translateY(-100%)";
                    }
                } else {
                    headerRef.current.classList.remove(style.header__scrolled);
                }
            }
            setY(window.scrollY);
        }, [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <>
            <header className={style.header} ref={headerRef}>
                <div className={style.header__logo}>
                    <Logo />
                </div>
                <section className={style.header__nav}>
                    <NavBar />
                </section>
            </header>
        </>
    )
}

export const SideBar = () => {
    return (
        <nav className={style.sidebar}>
            <ul>
                <IconContext.Provider value={{ className: style.sidebar__icon, size: '32' }}>
                    <Link href="https://github.com/nokkvireyr"><AiFillGithub /></Link>
                </IconContext.Provider>
            </ul>
        </nav>
    )
}

// This is the main navigation component
export const NavBar = () => {

    return (
        <>
            <nav className={style.nav}>
                <ul className={style.nav__list}>
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/#projects">Projects</NavItem>
                    <NavItem href="/#contact">Contact</NavItem>
                </ul>
            </nav>
        </>
    )
}

// This is the navigation item component
export const NavItem = ({ href, children }: { href: string, children: any }) => {

    const router = useRouter();

    const [isActive, setActive] = React.useState(false);

    useEffect(() => {
        if (router.asPath === href) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [router])

    return (
        <>
            <li className={`${style.nav__item} ${isActive ? style.nav__item__active : ''}`}><Link href={href}>{children}</Link></li>
        </>
    )

}

//Get logo
export const Logo = () => {
    return (
        <>
            <Link href='/' className={style.logo}>NRG</Link>
        </>
    )
}