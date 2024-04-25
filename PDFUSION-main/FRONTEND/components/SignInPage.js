import { Input, Container, Text, Divider, Button, Paper } from '@mantine/core';
import { IconMail, IconKey } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
    if (res.status === 200) {
      console.log(res);
      router.push('/upload');
    } else {
      setError('Invalid Credentials, Please try with the correct email and password.');
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/resetpassword');
  };

  return (
    <Container
      bg={'#333'}
      fluid
      sx={{ width: '100%', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow:'hidden' }}
    >
      <Container
        size="sm"
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          paddingTop: '80px',
        }}
      >
        <Text
          variant="gradient"
          gradient={{ from: 'orange', to: 'red', deg: '45' }}
          style={{
            fontFamily: 'Greycliff CF, sans-serif',
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
          }}
        >
          Sign In To Continue
        </Text>
        <Divider my="sm" />
        {error && (
          <Paper shadow="sm" padding="sm" style={{ border: '1px solid orange' }}>
            <Text color="orange" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              Something Went Wrong!
            </Text>
            <Text>{error}</Text>
          </Paper>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '12px 0' }}>
            <Input
              icon={<IconMail size="1rem" />}
              value={userInfo.email}
              onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
              required
              placeholder="Your email"
              style={{ borderRadius: '4px', height: '48px' }}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <Input
              icon={<IconKey size="1rem" />}
              value={userInfo.password}
              onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
              required
              type="password"
              placeholder="Password"
              style={{ borderRadius: '4px', height: '48px' }}
            />
          </div>
          <Button
            variant="gradient"
            fullWidth
            type="submit"
            style={{
              borderRadius: '24px',
              height: '48px',
              marginTop: '24px',
              color: 'white', // Set the text color to white
              backgroundColor: '#55dae3', // Set the background color
              padding : '5px'
            }}
          >
            Sign In
          </Button>

        </form>
        <Text
          style={{
            textAlign: 'center',
            color: '#f3f3f3',
            fontSize: '0.875rem',
            marginTop: '16px',
          }}
        >
          Don't have an account?{' '}
          <Link href="/auth/signup" style={{ textDecoration: 'none', color: 'orange', fontWeight: 'bold' }}>
  Sign Up Now
</Link>

        </Text>
        <Button
          variant="link"
          fullWidth
          onClick={handleForgotPassword}
          style={{
            textAlign: 'center',
            color: '#f3f3f3',
            marginTop: '16px',
            fontSize: '0.875rem',
            fontWeight : '100'
          }}
        >
          Forgot Password?
        </Button>
      </Container>
    </Container>
  );
}
