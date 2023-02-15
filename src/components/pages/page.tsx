import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useCRouter } from "../../lib/router";

export const PageLayout = ({ children, id, className }: { children: any, id: string, className?: string }) => {

    const pageRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const path = useCRouter();

    const scroller = () => {
        if (pageRef.current) {
            const el = pageRef.current;
            const rect = pageRef.current.getBoundingClientRect();

            if (rect.top < 0 && rect.bottom > 0) {
                //console.log(path.path, path.realPath, id);
                // console.log(rect.top, document.body.scrollTop);
                if (rect.top + 50 > 0 && rect.top - 50 < 0) {
                    if (path && path.path != id) {
                        path.setPath(id);
                    }
                }
            }
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        // console.log(path.path);
        if (path.path != undefined) {
            document.addEventListener('scroll', scroller, { passive: true });
            if (router.asPath.substring(1) === id) {
                if (pageRef.current) {
                    const yOffset = 10;
                    const y = pageRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({ top: y, behavior: 'smooth' })
                }
            }
        }
        return () => document.removeEventListener('scroll', scroller);
    }, [path.path])

    return (
        <div className={`min-h-screen w-full flex justify-center max-w-[100rem] px-4 lg:p-12 mx-auto flex-col ${className}`} ref={pageRef} id={id}>
            {children}
        </div>
    )
}