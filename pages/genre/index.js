import axios from 'axios';
import { GENRE_ENDPOINT, GET_ACCESS_TOKEN } from '../../lib/spotify';
import HeadTag from '../../components/Head';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Vinyl from '../../public/images/vinyl.jpg';
import useScreenSize from '../../hooks/useScreenWidth';

export default function Genre({ genres }) {
  const { width, smallScreen } = useScreenSize(430);

  //set genres to meta tags
  let tags = [];
  genres.map((genre) => {
    return tags.push(genre);
  });

  const renderAllGenres = () => {
    return genres.map((genre) => {
      return (
        <Link key={genre} href={`/genre/${genre}`} passHref>
          <div className={styles.genre}>{genre}</div>
        </Link>
      );
    });
  };

  //Head object place meta data here!
  const head = {
    title: 'Genres',
    description: 'Best to place to find your next music experience',
    tags: tags,
  };

  return (
    <>
      <HeadTag
        title={head.title}
        description={head.description}
        tags={head.tags}
      />

      <section className={styles.container}>
        <section className={styles.innerContainer}>
          <div className={styles.bannerContainer}>
            <div className={styles.gradientTop} />

            <Image
              src={Vinyl}
              alt={'vinyl'}
              width={1024}
              height={smallScreen ? 200 : 400}
              objectFit="cover"
            />
            <div className={styles.gradient} />

            <div className={styles.headingContainer}>
              <h2>Choose A Genre Find Something New </h2>
            </div>
          </div>

          <div className={styles.grid}>{renderAllGenres()}</div>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps() {
  let token = await GET_ACCESS_TOKEN();
  let genres = await axios(GENRE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.genres);

  return {
    props: { genres },
    revalidate: 86400,
  };
}
