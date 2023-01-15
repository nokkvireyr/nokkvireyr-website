import Image from "next/image";
import { useEffect, useRef, useState } from "react";
interface iProps {
    src: string,
    label?: string,
    className?: string,
}


const NRGImage = (props: iProps) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, [])
    const imageRef = useRef<any>();

    /*useEffect(() => {
        const image = document.createElement('img');
        image.src = props.src;
        image.addEventListener('load', () => {
            setIsLoaded(true);
        })
    },[props.src]);*/

    /*
        useEffect(() => {
        imageRef.current.src = props.src;
        imageRef.current.addEventListener('load', () => {
            setIsLoaded(true);
        })
    },[props.src]);*/
    return (<>
        {/*!isLoaded && <div className={`${isLoaded ? ` h-0 w-0 opacity-0 pointer-events-none` : ``} flex justify-center items-center absolute w-full h-full ${props.className}`}><AiOutlineLoading className="animate-spin text-white" /></div>*/}
        {/*<img className={`${!isLoaded ? `opacity-0 pointer-events-none` : ``} ${props.className}`} ref={imageRef}/>*/}
        {props.src && <Image src={props.src} alt={props.label || 'Unkown picture'} width={100} height={100}
            layout="responsive" className={`${props.className}`} />}
    </>)

}

export default NRGImage;
