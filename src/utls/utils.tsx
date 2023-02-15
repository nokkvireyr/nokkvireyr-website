import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
export const randomNumber = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getAPIURI = () => {
    return publicRuntimeConfig.NEXT_PUBLIC_API_URL;
}