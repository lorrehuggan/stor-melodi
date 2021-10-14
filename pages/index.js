import axios from 'axios';
import '../styles/Home.module.scss';
import { GENRE_ENDPOINT, GET_ACCESS_TOKEN } from '../lib/spotify';
import HeadTag from '../components/Head';

export default function Home({ genres }) {
  const renderAllGenres = () => {
    return genres.map((genre) => {
      return <p key={genre}>{genre}</p>;
    });
  };

  const head = {
    title: 'Spot-Le-Find',
    description: 'Best to place to find your next music experience',
  };

  return (
    <div>
      <HeadTag title={head.title} description={head.description} />

      <main>{renderAllGenres()}</main>

      <footer></footer>
    </div>
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
  };
}
