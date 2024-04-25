// import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { Container, Flex, Button, Text } from '@mantine/core';

// function Layout({ children }) {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const handleSignOut = async () => {
//     try {
//       await signOut({ redirect: false });

//       // Remove the access_token from the session storage
//       if (session && session.access_token) {
//         sessionStorage.removeItem(`next-auth.session-token.access_token.${session.access_token}`);
//       }
//         localStorage.removeItem('documentList');
//       // Redirect or perform any other actions after signout
//       router.push('/'); // Replace with the desired destination after signout
//     } catch (error) {
//       console.error('Error occurred while signing out', error);
//     }
//   };

//   const handleSignIn = () => {
//     router.push('/auth/signin'); 
//   };

//   const renderAuthButton = () => {
//     if (session) {
//       return <Button onClick={handleSignOut}>Sign Out</Button>;
//     } else if (router.pathname !== '/auth/signin') {
//       return <Button onClick={handleSignIn}>Sign In</Button>;
//     }
//     return null;
//   };

//   const renderHeader = () => {
//     if (router.pathname === '/auth/signin') {
//       return (
//         <Flex mih={50} bg="rgba(0, 0, 0, .3)" gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
//           <Text fz="lg">PDF CHATBOT</Text>
//         </Flex>
//       );
//     }

//     return (
//       <Flex mih={50} bg="rgba(0, 0, 0, .3)" gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
//         <Text fz="lg">PDF CHATBOT</Text>
//         {renderAuthButton()}
//       </Flex>
//     );
//   };

//   return (
//     <>
//       <Container>
//         {renderHeader()}
//       </Container>
//       {children}
//     </>
//   );
// }

// export default Layout;




// // import React, { useState, useCallback, useEffect } from 'react';
// // import { useSession } from 'next-auth/react';
// // import { useRouter } from 'next/router';
// // import { Container, Flex, Button, Text } from '@mantine/core';
// // import { useDropzone } from 'react-dropzone';
// // import axios from 'axios';

// // function UploadFilePage() {
// //   const [file, setFile] = useState(null);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [documentList, setDocumentList] = useState([]);
// //   const [isFetching, setIsFetching] = useState(false);
// //   const [showTable, setShowTable] = useState(false);

// //   const { data: session } = useSession();
// //   const token = session?.user?.access_token;
// // //   const { data: session } = useSession();
// //   const router = useRouter();

// //     const onDrop = useCallback((acceptedFiles) => {
// //       if (acceptedFiles.length > 0) {
// //         setFile(acceptedFiles[0]);
// //       }
// //     }, []);

// //     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

// //     const handleFileUpload = async () => {
// //       if (!file) return;

// //       const formData = new FormData();
// //       formData.append('file', file);

// //       try {
// //         const response = await axios.post('http://localhost:8000/api/pdf_file_upload', formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (response.status === 200) {
// //           setErrorMessage('');
// //           setSuccessMessage('File uploaded successfully!');
// //           setFile(null); // Clear the selected file
// //           setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
// //           // Fetch the updated document list
// //           fetchDocumentList();
// //         } else {
// //           if (response.status === 400) {
// //             setErrorMessage('Invalid file format. File must be a PDF.');
// //           } else {
// //             setErrorMessage(response.data.detail);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('File upload error:', error);
// //         if (error.response && error.response.status && error.response.status !== 500) {
// //           setErrorMessage(error.response.data.detail);
// //         } else {
// //           setErrorMessage('Internal server error');
// //         }
// //       }
// //     };

// //     // useEffect(() => {
// //     //   // Fetch the document list when the component mounts and whenever the token changes
// //     //   fetchDocumentList();
// //     // }, [token]);

// //     useEffect(() => {
// //       // Display the table if the document list is not empty
// //       if (documentList.length > 0) {
// //         setShowTable(true);
// //       }
// //     }, [documentList]);

// //     const handleSignIn = () => {
// //       router.push('/auth/signin');
// //     };

// //     const renderAuthButton = () => {
// //       if (!session && router.pathname !== '/auth/signin') {
// //         return <Button onClick={handleSignIn}>Sign In</Button>;
// //       }
// //       return null;
// //     };

// //     const renderHeader = () => {
// //       if (router.pathname === '/auth/signin') {
// //         return (
// //           <Flex mih={50} bg="rgba(0, 0, 0, .3)" gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
// //             <Text fz="lg">PDF CHATBOT</Text>
// //           </Flex>
// //         );
// //       }

// //       return (
// //         <Flex mih={50} bg="rgba(0, 0, 0, .3)" gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
// //           <Text fz="lg">PDF CHATBOT</Text>
// //           {renderAuthButton()}
// //         </Flex>
// //       );
// //     };

// //     return (
// //       <>
// //         <Container>
// //           {renderHeader()}
// //         </Container>
// //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
// //           <Paper padding="lg" shadow="sm" style={{ marginBottom: '1rem' }}>
// //             <div {...getRootProps()} style={{ outline: 'none' }}>
// //               <input {...getInputProps()} accept=".pdf" style={{ display: 'none' }} />
// //               {isDragActive ? (
// //                 <Button
// //                   component="span"
// //                   variant="outline"
// //                   color="blue"
// //                   leftIcon={<FaCloudUploadAlt />}
// //                   fullWidth
// //                 >
// //                   Drop the PDF file here
// //                 </Button>
// //               ) : (
// //                 <Button
// //                   component="span"
// //                   variant="outline"
// //                   color="blue"
// //                   leftIcon={<FaCloudUploadAlt />}
// //                   fullWidth
// //                 >
// //                   Choose PDF file
// //                 </Button>
// //               )}
// //             </div>
// //           </Paper>
// //           {file && (
// //             <>
// //               <Text size="sm" align="center" style={{ marginBottom: '1rem' }}>
// //                 Picked file: {file.name}
// //               </Text>
// //               <Button onClick={handleFileUpload} fullWidth>
// //                 Upload File
// //               </Button>
// //             </>
// //           )}
// //           {errorMessage && (
// //             <Text color="red" size="sm" align="center" style={{ marginTop: '1rem' }}>
// //               {errorMessage}
// //             </Text>
// //           )}
// //           {successMessage && (
// //             <Text color="green" size="sm" align="center" style={{ marginTop: '1rem' }}>
// //               {successMessage}
// //             </Text>
// //           )}
// //           {isFetching ? (
// //             <div style={{ textAlign: 'center', marginTop: '2rem' }}>Fetching document list...</div>
// //           ) : (
// //             <div style={{ marginTop: '2rem' }}>
// //               {showTable && documentList.length === 0 ? (
// //                 <div>
// //                   <Text>No data found</Text>
// //                 </div>
// //               ) : (
// //                 <div>
// //                   <Button onClick={fetchDocumentList}>Fetch Document List</Button>
// //                   {showTable && (
// //                     <Table>
// //                       <thead>
// //                         <tr>
// //                           <th>Document ID</th>
// //                           <th>Document Name</th>
// //                           <th>Action</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {documentList.map((document) => (
// //                           <tr key={Object.keys(document)[0]}>
// //                             <td>{Object.keys(document)[0]}</td>
// //                             <td>{Object.values(document)[0]}</td>
// //                             <td>
// //                               <Button>Download</Button>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </Table>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </>
// //     );
// //   }

// //   export default UploadFilePage;

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Container, Flex, Button, Text, Image } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';

function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      // Remove the access_token from the session storage
      if (session && session.access_token) {
        sessionStorage.removeItem(
          `next-auth.session-token.access_token.${session.access_token}`
        );
      }
      localStorage.removeItem('documentList');
      // Redirect or perform any other actions after signout
      router.push('/'); // Replace with the desired destination after signout
    } catch (error) {
      console.error('Error occurred while signing out', error);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  const renderAuthButton = () => {
    if (session) {
      return (
        <Button
          onClick={handleSignOut}
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          Sign Out
        </Button>
      );
    } else if (router.pathname !== '/auth/signin') {
      return (
        <Button
          onClick={handleSignIn}
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          Sign In
        </Button>
      );
    }
    return null;
  };

  const renderHeader = () => {
    if (router.pathname === '/auth/signin') {
      return (
        <Flex
          mih={50}
          bg="#161317"
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
          px={32}
        >
          <Link href="/">
            <Flex gap={12} align="center" justify="center">
              <Image maw={24} src="./logo.webp" alt="PDFusion Logo" />
              <Text fz="xl" color="white">
                PDFusion
              </Text>
            </Flex>
          </Link>
        </Flex>
      );
    }

    return (
      <Flex
        mih={50}
        bg="#161317"
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
        px={32}
      >
        <Link href="/">
          <Flex gap={12} align="center" justify="center">
            <Image maw={24} src="./logo.webp" alt="PDFusion Logo" />
            <Text fz="xl" color="white">
              PDFusion
            </Text>
          </Flex>
        </Link>
        {renderAuthButton()}
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>PDFusion</title>
      </Head>
      <Flex direction="column" sx={{ height: '100dvh' }}>
        {renderHeader()}
        {children}
      </Flex>
    </>
  );
}

export default Layout;
