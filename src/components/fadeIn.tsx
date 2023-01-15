import style from '@styles/fades/fades.module.scss';
import { useEffect, useRef, useState } from "react";

// export const FadeIn = ({ children, delay = 0, duration = 0.5, className = '', alternate = false }: { children: any, delay?: number, duration?: number, className?: string, alternate?: boolean }) => {

//     const classRef = useRef<HTMLDivElement>(null);
//     const contRef = useRef<HTMLDivElement>(null);
//     const [show, setShow] = useState(false);
//     useEffect(() => {
//         window.addEventListener('scroll', scroller, { passive: true });
//         return () => {
//             window.removeEventListener('scroll', scroller);
//         }
//     }, []);

//     useEffect(() => {
//         if (classRef.current) {
//             const rect = classRef.current.getBoundingClientRect();
//             if (rect.top < window.scrollY) {
//                 setShow(true);
//             } else {
//                 setShow(false);
//             }
//             //classRef.current.style.transform = `translateY(${alternate ? 5 : -5}%)`;
//         }
//     }, [classRef]);

//     useEffect(() => {
//         if (classRef.current) {
//             // classRef.current.style.transition = `transform ${duration}s ease-in-out ${delay}s, opacity ${duration}s ease-in-out ${delay}s`;
//             // classRef.current.style.opacity = show ? '1' : '0';
//             classRef.current.style.transform = `translateX(${show ? 0 : (alternate ? 100 : -100)}%)`;

//         }
//     }, [show]);

//     const scroller = () => {
//         console.log('test');
//         if (classRef.current) {
//             const el = classRef.current;
//             const rect = el.getBoundingClientRect();
//             if (rect.top < window.scrollY + window.innerHeight) {
//                 console.log('touch');
//             }
//             if (rect.top < window.scrollY + window.innerHeight) {
//                 if (!show) {
//                     setShow(true);
//                 }
//                 const newScroll = ((window.scrollY + (window.innerHeight / 3)) - (el.offsetTop) - (el.clientHeight / 2));
//                 el.style.transform = `translateX(${(alternate ? - (newScroll / 12) : (newScroll / 12))}px)`;
//                 el.style.opacity = (1 - (Math.abs(newScroll)) / 1000).toString();

//             }
//             // classRef.current.querySelectorAll('[data-scroll]').forEach((el: any) => {
//             //     let timeout = el.getAttribute('data-timeout');
//             //     if (!timeout) timeout = '0';
//             //     const newScroll = ((window.scrollY) - el.offsetTop) + 300;
//             //     el.style.transform = 'translateX(' + (newScroll > 0 ? newScroll / 4 : 0) + 'px)';
//             //     el.style.opacity = (1 - (window.scrollY / window.innerHeight)).toString();
//             // })
//         }
//     }

//     return (
//         //<div className="h-fit w-fit" ref={contRef}>
//         <div className={`${className} ${style.base} h-fit w-fit ${alternate ? 'translate-x-full' : '-translate-x-full'} opacity-0`} data-scroll ref={classRef}>
//             {children}
//         </div>
//         //</div>
//     );
// }

export const FadeIn = ({ children, delay = 0, duration = 0.5, className = '', alternate = false, down = false }: { children: any, delay?: number, duration?: number, className?: string, alternate?: boolean, down?: boolean }) => {

    const classRef = useRef<HTMLDivElement>(null);
    const contRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        document.addEventListener('scroll', scroller, { passive: true });
        return () => {
            document.removeEventListener('scroll', scroller);
        }
    }, []);

    useEffect(() => {
        if (classRef.current) {
            const rect = classRef.current.getBoundingClientRect();
            if (rect.top < document.body.scrollTop + classRef.current.clientHeight) {
                setShow(true);
            }
            //classRef.current.style.transform = `translateY(${alternate ? 5 : -5}%)`;
        }
    }, [classRef]);

    useEffect(() => {
        if (classRef.current) {
            classRef.current.style.transition = `transform ${duration}s ease-in-out ${delay / 500}s, opacity ${duration}s ease-in-out ${delay / 500}s`;
            classRef.current.style.opacity = show ? '1' : '0';
            if (!down) {
                classRef.current.style.transform = `translateX(${show ? 0 : (alternate ? 5 : -5)}%)`;
            } else {
                classRef.current.style.transform = `translateY(${show ? 0 : (alternate ? 5 : -5)}%)`;
            }
        }
    }, [show]);

    const scroller = () => {
        if (classRef.current && contRef.current) {
            const el = contRef.current;
            const rect = classRef.current.getBoundingClientRect();

            if (rect.top < (document.body.scrollTop + window.innerHeight) - (el.clientHeight / 2)) {
                if (!show) {
                    setShow(true);
                }
                // const newScroll = ((document.body.scrollTop) - (el.offsetTop) - (el.clientHeight / 2));
                // if (!down) {
                //     el.style.transform = `translateX(${(newScroll > 0 ? alternate ? - (newScroll / 12) : (newScroll / 12) : 0)}px)`;
                // } else {
                //     classRef.current.style.transform = `translateY(${show ? 0 : (alternate ? 5 : -5)}%)`;
                // }
                // el.style.opacity = 1 - ((newScroll / 100) / 4) + "";
            } else {
                setShow(false);
            }
            // classRef.current.querySelectorAll('[data-scroll]').forEach((el: any) => {
            //     let timeout = el.getAttribute('data-timeout');
            //     if (!timeout) timeout = '0';
            //     const newScroll = ((window.scrollY) - el.offsetTop) + 300;
            //     el.style.transform = 'translateX(' + (newScroll > 0 ? newScroll / 4 : 0) + 'px)';
            //     el.style.opacity = (1 - (window.scrollY / window.innerHeight)).toString();
            // })
        }
    }

    return (
        <div className="h-full w-full" ref={contRef}>
            <div className={`${className} ${style.base} h-full w-full`} data-scroll ref={classRef}>
                {children}
            </div>
        </div>
    );
}