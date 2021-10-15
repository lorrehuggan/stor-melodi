import '../styles/Home.module.scss';
import HeadTag from '../components/Head';

export default function Home() {
  const head = {
    title: '',
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
