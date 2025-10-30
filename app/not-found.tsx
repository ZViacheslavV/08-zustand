// import Link from 'next/link';

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import css from './Home.module.css';
import { Metadata } from 'next';
import { GRAPH_IMAGE_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist',
  openGraph: {
    title: '404 - Page not found',
    description: 'The page you are looking for does not exist',
    url: `${SITE_URL}/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
};

const NotFound = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => router.push('/'), 4000);
  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      {/* <Link href="/">Go back home</Link> */}
    </>
  );
};

export default NotFound;

//NotFoundClient.tsx:
/* 'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const NotFoundClient = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <p>
      Redirecting to <Link href="/">home</Link> in 4 seconds...
    </p>
  );
};

export default NotFoundClient; */
