import axios from 'axios';
import '../styles/Home.module.scss';
import { GENRE_ENDPOINT, GET_ACCESS_TOKEN } from '../lib/spotify';
import HeadTag from '../components/Head';

export default function Home({ genres }) {
  //set genres to meta tags
  let tags = [];
  genres.map((genre) => {
    return tags.push(genre);
  });

  const renderAllGenres = () => {
    return genres.map((genre) => {
      return <p key={genre}>{genre}</p>;
    });
  };

  //Head object place meta data here!
  const head = {
    title: 'Spot-Le-Find',
    description: 'Best to place to find your next music experience',
    tags: tags,
  };

  return (
    <div>
      <HeadTag
        title={head.title}
        description={head.description}
        tags={head.tags}
      />

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
