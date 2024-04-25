import { useState } from 'react';
import { Container, TextInput, Button } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IconMail } from '@tabler/icons-react';

function SignUpPage() {
  const router = useRouter();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirm_password) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character'
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/user/signup', {
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      });

      if (response.status === 200) {
        setErrorMessage('');
        setSuccessMessage('User Registered Successfully');
      } else {
        console.log('ERROR', response.response.data.msg);
        setErrorMessage(response.response.data.msg);
      }
    } catch (error) {
      console.log('catcherror', error);
      // Handle the error response
      if (error.response && error.response.status && error.response.status !== 500) {
        setErrorMessage(error.response.data.msg); // Example error message
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '1000vh',
        backgroundColor: '#333',
        color: 'orange',
        
      }}
    >
      <Container size={400} style={{ padding: 16 }}>
      <h1 style={{ textAlign: 'center', backgroundImage: 'linear-gradient(45deg, orange, red)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',padding:'8px' }}>
  Sign Up
</h1>


        <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <TextInput
            placeholder="Enter your first name"
            value={first_name}
            onChange={(event) => setFirstName(event.target.value)}
            style={{ marginBottom: 8 }}
          />
          <TextInput
            placeholder="Enter your last name"
            value={last_name}
            onChange={(event) => setLastName(event.target.value)}
            style={{ marginBottom: 8 }}
          />
          <div >
            <TextInput
              icon={<IconMail size="1rem" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Your email"
              style={{ marginBottom: 8  }}
            />
          </div>
          <TextInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: 8 }}
          />
          <TextInput
            type="password"
            placeholder="Confirm your password"
            value={confirm_password}
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={{ marginBottom: 8 }}
          />

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: 8 }}>{errorMessage}</div>
          )}

          {successMessage && (
            <div style={{ color: 'green', marginBottom: 8 }}>{successMessage}</div>
          )}

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
              padding: '15px 75px'
            }}
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default SignUpPage;
