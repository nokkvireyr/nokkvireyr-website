import { SiAngularjs, SiApple, SiArchlinux, SiCentos, SiDebian, SiDirectus, SiDocker, SiExpress, SiFedora, SiGit, SiGithub, SiGitlab, SiHeroku, SiLinux, SiMongodb, SiNginx, SiNodedotjs, SiPostgresql, SiReact, SiStrapi, SiTailwindcss, SiTypescript, SiUbuntu, SiVercel, SiWindows } from 'react-icons/si';
import { TbBrandNextjs, TbBrandReactNative } from 'react-icons/tb';

export const MadeWithIcons = ({ name }: { name: string }) => {

    const icons: any = {
        'NextJS': <TbBrandNextjs className='w-5 h-5' />,
        'Angular': <SiAngularjs className='w-5 h-5' />,
        'React': <SiReact className='w-5 h-5' />,
        'React-Native': <TbBrandReactNative className='w-5 h-5' />,
        'Tailwind': <SiTailwindcss className='w-5 h-5' />,
        'Strapi': <SiStrapi className='w-5 h-5' />,
        'Directus': <SiDirectus className='w-5 h-5' />,
        'TypeScript': <SiTypescript className='w-5 h-5' />,
        'MongoDB': <SiMongodb className='w-5 h-5' />,
        'Node.js': <SiNodedotjs className='w-5 h-5' />,
        'Express': <SiExpress className='w-5 h-5' />,
        'PostgreSQL': <SiPostgresql className='w-5 h-5' />,
        'Docker': <SiDocker className='w-5 h-5' />,
        'Vercel': <SiVercel className='w-5 h-5' />,
        'Heroku': <SiHeroku className='w-5 h-5' />,
        'GitHub': <SiGithub className='w-5 h-5' />,
        'GitLab': <SiGitlab className='w-5 h-5' />,
        'Git': <SiGit className='w-5 h-5' />,
        'Nginx': <SiNginx className='w-5 h-5' />,
        'Linux': <SiLinux className='w-5 h-5' />,
        'Windows': <SiWindows className='w-5 h-5' />,
        'macOS': <SiApple className='w-5 h-5' />,
        'Ubuntu': <SiUbuntu className='w-5 h-5' />,
        'Debian': <SiDebian className='w-5 h-5' />,
        'Arch': <SiArchlinux className='w-5 h-5' />,
        'Fedora': <SiFedora className='w-5 h-5' />,
        'CentOS': <SiCentos className='w-5 h-5' />,
    }

    const getIcon = () => {
        return icons[name] ? icons[name] : <></>;
    }

    return (
        <>
            {getIcon()}
        </>
    )

}