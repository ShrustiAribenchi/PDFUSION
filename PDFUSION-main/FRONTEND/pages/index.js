import Header from '@/components/Header';
import HomePage from '../components/HomePage';
import Layout from '../components/layouts/Layout';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BeatLoader from 'react-spinners/BeatLoader';

// const IndexPage = () => {
//   const { data: session } = useSession();
//   // const router = useRouter();

//   // useEffect(() => {
//   //   if (!session) { router.push('/auth/signin'); }
//   // }, [])

//   return 
//   {<HomePage/>}
// };

const IndexPage = () => {
  return <HomePage />;
};

export default IndexPage;

