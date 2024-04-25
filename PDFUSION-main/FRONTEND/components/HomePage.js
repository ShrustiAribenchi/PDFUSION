// import { Button } from '@mantine/core';
// import Link from 'next/link';
// import { AiOutlineUser } from 'react-icons/ai';
// import styles from '../styles/Home.module.css';
// import { useSession } from 'next-auth/react';

// const HomePage = () => {
//   const { data: session, status } = useSession();
//   console.log(session);
//   return (
//     <div className={styles['home-page']}>
//       <h1>Welcome to PDF chatbot platform!</h1>
//       <p className={styles.content}>
//         Our SAAS platform is a cutting-edge product that revolutionizes the way you interact with PDF documents. With our innovative chatbot functionality, you can have dynamic conversations with your PDF files, making information retrieval and collaboration more efficient and intuitive than ever before.
//       </p>
//       <Link href="/auth/signup" passHref>
//         <Button
//           as="a"
//           className={styles['sign-in-button']}
//           variant="outline"
//           size="sm"
//         >
//           <AiOutlineUser style={{ marginRight: '0.5rem' }} />
//           Create New Account
//         </Button>
//       </Link>
//     </div>
//   );
// };

// export default HomePage;
import { Box, Button, Container, Flex, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const { data: session } = useSession();

  const handleGetStarted = async () => {
    
    if (session) {
      router.push('http://localhost:3000/upload');
    } else {
      router.push('/auth/signin');
    }
  };
  

  console.log(session);
  return (
    <Container bg={'#333'} fluid sx={{ width: '100%', height: '100%' }}>
      <Flex gap={64} justify="center" align={'center'}  sx={{ height: '100%' }}>
        <Box>
          <Text
            fw={700}
            // fz='xl'
            variant="gradient"
            gradient={{ from: 'Orange', to: 'red', deg: 45 }}
            sx={{ fontSize: '4rem' }}
          >
            PDFusion
          </Text>
          <Text fw={500} sx={{ fontSize: '1.5rem',color:'white' }}>
            Transform Your PDFs into Conversational Partners. Uncover Hidden Insights Now
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red', deg: 45}}
            fullWidth
            my={24}
            size="xl"
            onClick={handleGetStarted}
          >
            Get Started!
          </Button>
        </Box>
        <Image maw={512} radius="md" src="./Hero_Image.webp" alt="hero_image" />
      </Flex>
    </Container>
  );
};

export default HomePage;

