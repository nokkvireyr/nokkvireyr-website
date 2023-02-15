import { FadeIn } from '@components/fadeIn';
import { DataProvider } from '@pages/index';
import style from '@styles/project/github.module.scss';
import Link from 'next/link';
import { useContext, useState } from "react";
const GithubComponent = () => {

    const { github } = useContext(DataProvider);
    const [currentThing, setCurrentThing] = useState(0);
    return (
        <>
            <div className={style.github__container}>
                {github && github.map((obj: any, index: number) => {

                    return <GithubObject github={obj} key={index} index={currentThing} />
                })}
            </div>
        </>
    )
}

export const GithubObject = ({ github, index }: { github: any, index: number }) => {
    return (
        //delay={index * 100}
        <FadeIn down={true} >
            <Link href={github.html_url} target={'_blank'} rel='noreferrer'><div className={style.github__item}>
                <div className={style.github__item__title}>
                    {github.name}
                </div>
                <div className={style.github__item__description}>
                    {github.description}
                </div>
                <div className={style.github__item__tags}>
                    {github.topics && github.topics.map((tag: any, index: number) => {
                        return <span className=' text-sm text-dark-text-400 text-opacity-80' key={index}>{tag}</span>
                        //<MadeWithIcons key={index} name={tag} />
                    })
                    }
                </div>
            </div></Link>
        </FadeIn>
    )
}

export default GithubComponent;