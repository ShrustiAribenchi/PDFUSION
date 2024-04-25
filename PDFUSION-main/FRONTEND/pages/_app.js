// import '../styles/globals.css'
// import { MantineProvider } from "@mantine/core"
// import { SessionProvider } from "next-auth/react"

// function App({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <MantineProvider
//         withGlobalStyles
//         withNormalizeCSS
//         theme={{ colorScheme: "light" }}
//       >
//         <Component {...pageProps} />
//       </MantineProvider>
//     </SessionProvider >
//   )
// }
// export default App;\



// import '../styles/globals.css';
// import { MantineProvider } from '@mantine/core';
// import { SessionProvider } from 'next-auth/react';
// import Layout from '../components/layouts/Layout';

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </MantineProvider>
//     </SessionProvider>
//   );
// }

// export default MyApp;

// import '../styles/globals.css'
// import { MantineProvider } from "@mantine/core"
// import { SessionProvider } from "next-auth/react"

// function App({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <MantineProvider
//         withGlobalStyles
//         withNormalizeCSS
//         theme={{ colorScheme: "light" }}
//       >
//         <Component {...pageProps} />
//       </MantineProvider>
//     </SessionProvider >
//   )
// }
// export default App;\

import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layouts/Layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp

