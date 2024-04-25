// import axios from 'axios';
// import NextAuth from 'next-auth';
// import CredentialsProvider from "next-auth/providers/credentials"

// const authOptions = {
//   secret: '7ba1eb5c1ace486182817f727a565e71',
//   session: {
//     strategy: 'jwt',
//     jwt: true, // Enable JWT session storage
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       authorize: async (credentials) => {
//         const { email, password } = credentials;
//         try {
//           const response = await axios.post('http://localhost:8000/user/login', {
//             email,
//             password
//           });
//           const access_token = response.data.access_token; 
//           console.log(access_token)
//           return {
//             access_token,
//             email // You can include additional user information if needed
//           };
          
//         } catch (error) {
//           console.log(error);
//           throw new Error('Invalid Credentials');
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: "/auth/signin"
//   },
  
// };

// export default NextAuth(authOptions);


import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { useSession } from 'next-auth/client';

const authOptions = {
  secret: '7ba1eb5c1ace486182817f727a565e71',
  session: {
    strategy: 'jwt',
    jwt: true, // Enable JWT session storage
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const response = await axios.post('http://localhost:8000/user/login', {
            email,
            password
          });
          const access_token = response.data.access_token;
          console.log('Access Token:', access_token);

          const user = {
            email,
            access_token
          };
          
          // console.log(Promise.resolve(user))

          return user; // Wrap the user object in a Promise.resolve() call

        } catch (error) {
          console.log(error);
          throw new Error('Invalid Credentials');
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
