import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export const PageLayout = ({ children, id }: { children: any, id: string }) => {

    const pageRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (router.asPath === id) {
            if (pageRef.current) pageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [router])

    return (
        <div className="min-h-screen w-full flex justify-center max-w-[100rem] px-4 lg:p-12 mx-auto flex-col" ref={pageRef} id={id}>
            {children}
        </div>
    )
}