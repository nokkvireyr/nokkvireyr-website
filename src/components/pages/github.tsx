import { FadeIn } from '@components/fadeIn';
import style from '@styles/project/github.module.scss';
import Link from 'next/link';
import { useEffect, useState } from "react";
const GithubComponent = () => {

    const [githubData, setGithubData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await (await fetch('https://api.github.com/users/nokkvireyr/repos')).json();

            let newdata = data.filter((data: any) => data.private == false && data.fork == false);

            setGithubData(newdata);
        }
        fetchData();
    }, [])

    return (
        <>
            <div className={style.github__container}>
                {githubData && githubData.map((obj: any, index: number) => {
                    return <GithubObject github={obj} key={index} index={index} />
                })}
            </div>
        </>
    )
}

export const GithubObject = ({ github, index }: { github: any, index: number }) => {
    console.log(index);
    return (
        <FadeIn down={true} delay={index * 100}>
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