import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";


export const RouterContext = createContext<any>(undefined);

export interface iCRouter {
    path: any,
    setPath: any,
    router: any,
}

export const useCRouter = (): iCRouter => {

    const [path, setPath] = useState<string | undefined>();
    const router = useRouter();
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (router) {
            if (!init) {
                const active = router.asPath.substring(1);
                if (active.charAt(0) === '#') {
                    setPath(active);
                } else {
                    setPath('#home')
                }
            } else {
                const active = router.asPath.substring(1);
                if (active.charAt(0) === '#') {
                    setPath(active);
                }
            }
        }
    }, [router])


    useEffect(() => {
        if (path != undefined) {
            if (router.asPath.substring(1) != path) {
                router.push(path, path, { shallow: true, scroll: false }).catch((e) => {
                    // workaround for https://github.com/vercel/next.js/issues/37362
                    if (!e.cancelled) {
                        throw e
                    }
                });
            }
            if (!init) {
                setInit(true);
            }
        }
    }, [path]);

    useEffect(() => {
    }, [path]);

    return { path, setPath, router };

}