import { Intro } from '@components/pages/intro';
import { Projects } from '@components/pages/projects';
import { Inter } from '@next/font/google';
import style from '@styles/home/home.module.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { getAPIURI } from 'src/utls/utils';
const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {
        loaded && (<>

          <Intro data={props.intro} />
          <Projects data={props.projects} />
        </>
        )
      }
    </>
  )
}

export const getStaticProps = async () => {

  const res = await fetch(`${getAPIURI()}/items/intro_text`);
  const intro = await res.json();
  const res2 = await fetch(`${getAPIURI()}/items/projects`);
  const projects = await res2.json();

  return {
    props: {
      intro: intro.data,
      projects: projects.data
    }
  }
}

export const NextArrow = ({ href }: { href: string }) => {
  return (
    <div className={style.next_arrow}>
      <Link href={href}>
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
    <div className="flex flex-col" style={{
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