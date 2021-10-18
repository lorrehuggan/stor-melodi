import styles from '../styles/styles.module.scss';
import HeadTag from '../components/Head';
import AudioPlayer from '../components/AudioPlayer';

export default function Home() {
  const head = {
    title: 'Chune',
    description: '',
    tags: '',
  };
  return (
    <>
      <HeadTag
        title={head.title}
        description={head.description}
        tags={head.tags}
      />

      <main></main>
    </>
  );
}
