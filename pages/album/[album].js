import axios from 'axios';
import React from 'react';
import { ALBUM_ENDPOINT, GET_ACCESS_TOKEN } from '../../lib/spotify';

const Album = ({ album }) => {
  console.log(album);
  return <div>{album.name}</div>;
};

export default Album;

export async function getServerSideProps({ params }) {
  const token = await GET_ACCESS_TOKEN();
  const album = await axios(`${ALBUM_ENDPOINT}${params.album}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
  return {
    props: {
      album,
    },
  };
}
