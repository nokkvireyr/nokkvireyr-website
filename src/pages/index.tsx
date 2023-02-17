import { ContactPage } from '@components/pages/contact';
import { Intro } from '@components/pages/intro';
import { Projects } from '@components/pages/projects';
import { Dancing_Script } from '@next/font/google';
import style from '@styles/home/home.module.scss';
import { getAPIURI } from '@utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { useCRouter } from '../lib/router';
const dancing = Dancing_Script({display: 'swap', weight:['400', '500', '600', '700'], subsets: ['latin-ext']});

export const DataProvider = createContext<any>(undefined);


export default function Home(props: any) {

  const [loaded, setLoaded] = useState(false);

  const [path, setCurrentPath] = useState<string | undefined>();

  const router = useRouter();
  const cRouter = useCRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);


  return (
    <>
      {
        loaded ? (<>
          <DataProvider.Provider value={{
            ...props
          }}>
            <Intro />
            <Projects />
            <ContactPage />
          </DataProvider.Provider>
        </>
        ):
        <div className="block w-full min-h-screen h-[200vh]">
          <h1>Loading</h1>
        </div>
      
      }
    </>
  )
}

export const getServerSideProps = async (context: any) => {

  const { params } = context;


  const res = await fetch(`${getAPIURI()}/items/intro_text`);
  const intro = await res.json();
  const res2 = await fetch(`${getAPIURI()}/items/projects`);
  const projects = await res2.json();
  const res3 = await fetch(`${getAPIURI()}/items/github_projects?filter[fork][_eq]=false&sort=-stargazers_count`);
  const github_projects = await res3.json();

  return {
    props: {
      intro: intro.data,
      projects: projects.data,
      github: github_projects.data
    }
  }
}

export const NextArrow = ({ href }: { href: string }) => {
  return (
    <div className={style.next_arrow}>
      <Link href={href} aria-label="Next page">
        <BsArrowDown className='w-5 h-5' />
      </Link>
    </div>
  )
}

export const Hello = () => {
  const [hello, setHello] = useState([
    'Hello',
    'Hæ',
    'Hola',
    'Bonjour',
    'Ciao',
    'Hallo',
    'Hej',
    'Olá',
  ]);
  const [transform, setTransform] = useState(0);
  const [currentHello, setCurrentHello] = useState(0);
  const thingRef = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState(0);
  const [last, setLast] = useState(hello.length - 1);
  useEffect(() => {
    setTransform((prev) => (currentHello) * height);
    let newCurrent = currentHello + 1;
    if (newCurrent >= hello.length) {

      newCurrent = 0;
    }
    setLast(newCurrent);

    setTimeout(() => {
      setCurrentHello(newCurrent);
    }, 3500);
  }, [currentHello]);

  useEffect(() => {
    if (thingRef.current) {
      setHeight(thingRef.current.clientHeight);
    }
  }, [thingRef]);

  useEffect(() => {
    const resizeEvent = () => {
      if (thingRef.current) {
        setHeight(thingRef.current.clientHeight);
      }
    }
    window.addEventListener('resize', resizeEvent);
    return () => window.removeEventListener('resize', resizeEvent);
  }, [])

  return (
    <div className={`${dancing.className} font-bold flex flex-col`} style={{
      height: `${height}px`,
    }}>
      {hello.map((h, i) => {
        return (
          <span className={`${style.hello} ${i == currentHello ? style.active : ''} ${i == last ? style.out : ''}`} style={{
          }} ref={thingRef} key={i}>{h}</span>
        )
      })
      }
    </div>

  )

}