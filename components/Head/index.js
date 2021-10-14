import React from 'react';
import Head from 'next/head';

const HeadTag = ({ title, description, tags }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="tags" content={tags} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadTag;
