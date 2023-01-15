import { FadeIn } from '@components/fadeIn';
import NRGImage from '@components/nrgImage';
import style from '@styles/project/projects.module.scss';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getAPIURI } from 'src/utls/utils';
import GithubComponent from './github';
import { PageLayout } from "./page";
export const Projects = ({ data }: { data: any }) => {

    return (
        <PageLayout id="/#projects">
            <div className={style.projects}>
                {data && data.map((item: any, index: number) => {
                    return <ProjectComponent key={index} data={item} alt={index % 2 === 0} />
                })}
                {/* <ProjectComponent />
                <ProjectComponent alt={true} />
                <ProjectComponent />
                <ProjectComponent alt={true} />
                <ProjectComponent /> */}

            </div>
            <div className={style.github}>
                <GithubComponent />
            </div>
        </PageLayout>
    )

}

export const ProjectComponent = ({ data, alt }: { alt?: boolean, data: any }) => {

    return (
        <FadeIn alternate={alt}>
            <div className={`${style.project__item} ${alt ? 'lg:!flex-row-reverse' : ''}`}>
                <div className={style.project__item__image}>
                    <NRGImage className={style.project__image__object} src={`${getAPIURI()}/assets/${data.hero}`} label={data.title} />
                </div>
                <div className={style.project__item__cover}>
                    <div className={style.project__item__title}><span>{data.title}</span></div>
                    <div className={style.project__item__description}><span>{data.description}</span></div>
                    <div className={`${style.project__item__links__tags}`}>
                        <div className={style.project__item__tags}>
                            {data.made_with && data.made_with.map((tag: any, index: number) => {
                                return <span className=' text-sm text-dark-text-400 text-opacity-80' key={index}>{tag}</span>
                                //<MadeWithIcons key={index} name={tag} />
                            })
                            }
                        </div>
                        <div className={`${style.project__item__links} ${alt ? 'flex-row-reverse' : 'flex-row'}`}>
                            {data && data.links.map((data: any, index: number) => {
                                if (data.site_name == 'site') {
                                    return <a key={index} href={data.url} target={'_blank'} rel={'noreferrer'}><span><FaExternalLinkAlt /></span></a>
                                } else if (data.site_name == 'github') {
                                    return <a key={index} href={data.url} target={'_blank'} rel={'noreferrer'}><span><FaExternalLinkAlt /></span></a>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div></FadeIn>
    )

}

// return (
//     <div className={style.project__item}>
//         <div className={style.project__item__image}>
//             <img src={'https://images.pexels.com/photos/1280162/pexels-photo-1280162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={'Developer'} />
//         </div>
//         <div className={style.project__item__text}>
//             <div className={style.project__item__title}><span>Hótel Skaftafell</span></div>
//             <div className={style.project__item__description}><span>A website built for Hótel Skaftafell. This project was written in angular and uses Strapi CMS for it&apos;s content managment.</span></div>
//             <div className={style.project__item__links}>
//                 <a href={'https://hotel.nokkvi.is/'} target={'_blank'} rel={'noreferrer'}><span><FaExternalLinkAlt /></span></a>
//                 <a href={'https://hotel.nokkvi.is/'} target={'_blank'} rel={'noreferrer'}><span><FaGithub /></span></a>
//             </div>
//         </div>
//     </div>
// )