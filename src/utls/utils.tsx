

export const randomNumber = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getAPIURI = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
}