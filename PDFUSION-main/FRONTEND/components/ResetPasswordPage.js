// import { useState } from 'react';
// import { Container, TextInput, Button } from '@mantine/core';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function ResetPassword() {
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const email = event.target.email.value;
//     const newPassword = event.target.newPassword.value;

//     // Password validation
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(newPassword)) {
//       setErrorMessage('Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/user/forgot_password', {
//         email,
//         new_password: newPassword
//       });
//       if (response.status === 200) {
//         setErrorMessage('');
//         setSuccessMessage("Password reset successfully!");
//       } else {
//         console.log("ERROR", response.response.data.msg);
//         setErrorMessage(response.response.data.msg);
//       }
//     } catch (error) {
//       console.log("catcherror", error);
//       // Handle the error response
//       if (error.response && error.response.status && error.response.status !== 500) {
//         setErrorMessage(error.response.data.msg); // Example error message
//       } else {
//         setErrorMessage("Internal server error");
//       }
//     }
//   };

//   const handleBackToLogin = () => {
//     router.push('/auth/signin');
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Container size={400} style={{ padding: 16 }}>
//         <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
//         {successMessage && (
//           <div style={{ textAlign: 'center', marginBottom: 16 }}>
//             {successMessage}
//           </div>
//         )}
//         {errorMessage && (
//           <div style={{ textAlign: 'center', marginBottom: 16 }}>
//             {errorMessage}
//           </div>
//         )}
//         <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
//           <TextInput name="email" placeholder="Enter your email" style={{ marginBottom: 16 }} />
//           <TextInput name="newPassword" placeholder="Enter your new password" style={{ marginBottom: 16 }} />
//           <Button type="submit" style={{ marginTop: 16, display: 'block', width: '100%' }}>Submit</Button>
//           <Button onClick={handleBackToLogin} style={{ marginTop: 16, display: 'block', width: '100%' }}>Back to login</Button>
//         </form>
//       </Container>
//     </div>
//   );
// }

import { useState } from 'react';
import { TextInput, Button, Text } from '@mantine/core';
import { useRouter } from 'next/router';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const newPassword = event.target.newPassword.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character'
      );
      return;
    }

    try {
      // Make API request to reset password
      // Replace the URL and request body with your actual implementation
      const response = await fetch('http://localhost:8000/user/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage('Password reset successfully!');
      } else {
        const data = await response.json();
        setErrorMessage(data.msg);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Internal server error');
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <div
      style={{
        padding: '16px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#333',
      }}
    >
      <Text
        variant="gradient"
        gradient={{ from: 'orange', to: 'red' }}
        style={{
          fontFamily: 'Greycliff CF, sans-serif',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}
      >
        Forgot Password
      </Text>
      {successMessage && (
        <Text
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            color: 'green',
            fontSize: '1.2rem',
            fontWeight: 700,
          }}
        >
          {successMessage}
        </Text>
      )}
      {errorMessage && (
        <Text
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            color: 'red',
            fontSize: '1.2rem',
            fontWeight: 700,
          }}
        >
          {errorMessage}
        </Text>
      )}
      <form
        style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <TextInput
          name="email"
          placeholder="Enter your email"
          style={{ marginBottom: '1.5rem', height: '28px', width: '100%' }}
          inputStyle={{ borderRadius: '4px' }}
        />
        <TextInput
          name="newPassword"
          placeholder="Enter your new password"
          style={{ marginBottom: '.5rem', height: '28px', width: '100%' }}
          inputStyle={{ borderRadius: '4px' }}
        />
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
            padding: '1px',
          }}
        >
          Submit
        </Button>
      </form>
      <Text
        onClick={handleBackToLogin}
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1rem',
          textDecoration: 'underline',
        }}
      >
        Back to Login
      </Text>
    </div>
  );
}
