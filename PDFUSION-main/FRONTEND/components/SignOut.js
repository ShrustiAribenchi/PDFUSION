import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignOutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      // Remove the access_token from the session storage
      if (session && session.access_token) {
        sessionStorage.removeItem(`next-auth.session-token.access_token.${session.access_token}`);
      }

      // Redirect or perform any other actions after signout
      router.push('/'); // Replace with the desired destination after signout
    } catch (error) {
      console.error('Error occurred while signing out', error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
