// import React, { useState, useCallback, useEffect } from 'react';
// import { Button, Text, Paper, Table } from '@mantine/core';
// import { useDropzone } from 'react-dropzone';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';


// function UploadFilePage() {
//   const [file, setFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [documentList, setDocumentList] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [showTable, setShowTable] = useState(false);

//   const { data: session } = useSession();
//   const token = session?.user?.access_token;

//   const router = useRouter();

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       setFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleFileUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8000/api/pdf_file_upload', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setErrorMessage('');
//         setSuccessMessage('File uploaded successfully!');
//         setFile(null); // Clear the selected file
//         setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
//       } else {
//         if (response.status === 400) {
//           setErrorMessage('Invalid file format. File must be a PDF.');
//         } else {
//           setErrorMessage(response.data.detail);
//         }
//       }
//     } catch (error) {
//       console.error('File upload error:', error);
//       if (error.response && error.response.status && error.response.status !== 500) {
//         setErrorMessage(error.response.data.detail);
//       } else {
//         setErrorMessage('Internal server error');
//       }
//     }
//   };

//   const fetchDocumentList = async () => {
//     try {
//       setIsFetching(true);
//       const response = await axios.post(
//         'http://localhost:8000/api/document_list',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         setDocumentList(response.data);
//         setShowTable(true);
//       }
//     } catch (error) {
//       console.error('Fetch document list error:', error);
//     } finally {
//       setIsFetching(false);
//     }
//   };
  
//   useEffect(() => {
//     if (documentList.length > 0) {
//       setShowTable(true);
//     }
//   }, [documentList]);

//   const handleFetchDocumentList = () => {
//     fetchDocumentList();
//   };

//   let content;
//   if (showTable) {
//     if (documentList.length === 0) {
//       content = (
//         <div>
//           <Text>No data found</Text>
//         </div>
//       );
//     } else {
//       const rows = documentList.map((document) => (
//         <tr key={Object.keys(document)[0]}>
//           <td>{Object.keys(document)[0]}</td>
//           <td>{Object.values(document)[0]}</td>
//           <td>
//           <Button
//   component="span"
//   variant="link"
//   color="blue"
//   size="xs"
// >
//   <Link href={`/chatpage/${Object.keys(document)[0]}`}>Go to Chat</Link>
// </Button>

//           </td>
//         </tr>
//       ));

//       content = (
//         <div>
//           <Button onClick={handleFetchDocumentList}>Fetch Document List</Button>
//           <Table>
//             <thead>
//               <tr>
//                 <th>Document ID</th>
//                 <th>Document Name</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>{rows}</tbody>
//           </Table>
//         </div>
//       );
//     }
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
//         <Paper padding="lg" shadow="sm" style={{ marginBottom: '1rem' }}>
//           <div {...getRootProps()} style={{ outline: 'none' }}>
//             <input {...getInputProps()} accept=".pdf" style={{ display: 'none' }} />
//             {isDragActive ? (
//               <Button
//                 component="span"
//                 variant="outline"
//                 color="blue"
//                 leftIcon={<FaCloudUploadAlt />}
//                 fullWidth
//               >
//                 Drop the PDF file here
//               </Button>
//             ) : (
//               <Button
//                 component="span"
//                 variant="outline"
//                 color="blue"
//                 leftIcon={<FaCloudUploadAlt />}
//                 fullWidth
//               >
//                 Choose PDF file
//               </Button>
//             )}
//           </div>
//         </Paper>
//         {file && (
//           <>
//             <Text size="sm" align="center" style={{ marginBottom: '1rem' }}>
//               Picked file: {file.name}
//             </Text>
//             <Button onClick={handleFileUpload} fullWidth>
//               Upload File
//             </Button>
//           </>
//         )}
//         {errorMessage && (
//           <Text color="red" size="sm" align="center" style={{ marginTop: '1rem' }}>
//             {errorMessage}
//           </Text>
//         )}
//         {successMessage && (
//           <Text color="green" size="sm" align="center" style={{ marginTop: '1rem' }}>
//             {successMessage}
//           </Text>
//         )}
//         {!showTable && (
//           <div style={{ marginTop: '1rem' }}>
//             <Button onClick={handleFetchDocumentList}>Fetch Document List</Button>
//           </div>
//         )}
//       </div>
//       {isFetching ? (
//         <div style={{ textAlign: 'center', marginTop: '2rem' }}>Fetching document list...</div>
//       ) : (
//         <div style={{ marginTop: '2rem' }}>{content}</div>
//       )}
//     </div>
//   );
// }

// export default UploadFilePage;

// import React, { useState, useCallback, useEffect } from 'react';
// import { Button, Text, Paper, Table } from '@mantine/core';
// import { useDropzone } from 'react-dropzone';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// function UploadFilePage() {
//   const [file, setFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [documentList, setDocumentList] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [showTable, setShowTable] = useState(false);

//   const { data: session } = useSession();
//   const token = session?.user?.access_token;

//   const router = useRouter();

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       setFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleFileUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8000/api/pdf_file_upload', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setErrorMessage('');
//         setSuccessMessage('File uploaded successfully!');
//         setFile(null); // Clear the selected file
//         setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
//         fetchDocumentList(); // Fetch the updated document list after successful upload
//       } else {
//         if (response.status === 400) {
//           setErrorMessage('Invalid file format. File must be a PDF.');
//         } else {
//           setErrorMessage(response.data.detail);
//         }
//       }
//     } catch (error) {
//       console.error('File upload error:', error);
//       if (error.response && error.response.status && error.response.status !== 500) {
//         setErrorMessage(error.response.data.detail);
//       } else {
//         setErrorMessage('Internal server error');
//       }
//     }
//   };

//   const fetchDocumentList = async () => {
//     try {
//       setIsFetching(true);
//       const response = await axios.post(
//         'http://localhost:8000/api/document_list',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const newDocumentList = response.data;
//         setDocumentList(newDocumentList);
//         setShowTable(true);
//         localStorage.setItem('documentList', JSON.stringify(newDocumentList)); // Store document list in local storage
//       }
//     } catch (error) {
//       console.error('Fetch document list error:', error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     const storedDocumentList = localStorage.getItem('documentList');
//     if (storedDocumentList) {
//       setDocumentList(JSON.parse(storedDocumentList));
//       setShowTable(true);
//     } else {
//       fetchDocumentList();
//     }
//   }, []);

//   let content;
//   if (showTable) {
//     if (documentList.length === 0) {
//       content = (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//           <Text>No data found</Text>
//         </div>
//       );
//     } else {
//       const rows = documentList.map((document) => (
//         <tr key={Object.keys(document)[0]}>
//           <td>{Object.keys(document)[0]}</td>
//           <td>{Object.values(document)[0]}</td>
//           <td>
//             <Button component="span" variant="link" color="white" size="xs">
//               <Link href={`/chatpage/${Object.keys(document)[0]}`}>Go to Chat</Link>
//             </Button>
//           </td>
//         </tr>
//       ));

//       content = (
//         <div>
//           <Table>
//             <thead>
//               <tr>
//                 <th>Document ID</th>
//                 <th>Document Name</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>{rows}</tbody>
//           </Table>
//         </div>
//       );
//     }
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
//         <Paper padding="lg" style={{ marginBottom: '1rem' }}>
//           <div {...getRootProps()} style={{ outline: 'none' }}>
//             <input {...getInputProps()} accept=".pdf" style={{ display: 'none' }} />
//             {isDragActive ? (
//               <Button component="span" variant="outline" color="blue" leftIcon={<FaCloudUploadAlt />} fullWidth>
//                 Drop the PDF file here
//               </Button>
//             ) : (
//               <Button
//               component="span"
//               variant="outline"
//               color="#55dae3"
//               style={{
//                 color: 'white',
//                 backgroundColor: '#004b87',
//               }}
//               leftIcon={<FaCloudUploadAlt />}
//               fullWidth
//             >
//               Choose PDF file
//             </Button>
//             )}
//           </div>
//         </Paper>
//         {file && (
//           <>
//             <Text size="sm" align="center" style={{ marginBottom: '1rem' }}>
//               Picked file: {file.name}
//             </Text>
//             <Button onClick={handleFileUpload} fullWidth>
//               Upload File
//             </Button>
//           </>
//         )}
//         {errorMessage && (
//           <Text color="#ff7070" size="sm" align="center" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
//   {errorMessage}
// </Text>

//         )}
//         {successMessage && (
//           <Text color="#8cc63f" size="sm" align="center" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
//   {successMessage}
// </Text>


//         )}
//       </div>
//       {isFetching ? (
//         <div style={{ textAlign: 'center', marginTop: '2rem' }}>Fetching document list...</div>
//       ) : (
//         <div style={{ marginTop: '2rem' }}>{content}</div>
//       )}
//     </div>
//   );
// }

// export default UploadFilePage;


import React, { useState, useCallback, useEffect } from 'react';
import { Button, Text, Paper, Table } from '@mantine/core';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function UploadFilePage() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [documentList, setDocumentList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.access_token;

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/pdf_file_upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setErrorMessage('');
        setSuccessMessage('File uploaded successfully!');
        setFile(null); // Clear the selected file
        setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
        fetchDocumentList(); // Fetch the updated document list after successful upload
      } else {
        if (response.status === 400) {
          setErrorMessage('Invalid file format. File must be a PDF.');
        } else {
          setErrorMessage(response.data.detail);
        }
      }
    } catch (error) {
      console.error('File upload error:', error);
      if (error.response && error.response.status && error.response.status !== 500) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  const fetchDocumentList = async () => {
    try {
      setIsFetching(true);
      const response = await axios.post(
        'http://localhost:8000/api/document_list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newDocumentList = response.data;
        setDocumentList(newDocumentList);
        setShowTable(true);
        localStorage.setItem('documentList', JSON.stringify(newDocumentList)); // Store document list in local storage
      }
    } catch (error) {
      console.error('Fetch document list error:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const storedDocumentList = localStorage.getItem('documentList');
    if (storedDocumentList) {
      setDocumentList(JSON.parse(storedDocumentList));
      setShowTable(true);
    } else {
      fetchDocumentList();
    }
  }, []);

  let content;
  if (showTable) {
    if (documentList.length === 0) {
      content = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text>No data found</Text>
        </div>
      );
    } else {
      const rows = documentList.map((document) => (
        <tr key={Object.keys(document)[0]}>
          <td>{Object.keys(document)[0]}</td>
          <td>{Object.values(document)[0]}</td>
          <td>
            <Button component="span" variant="link" color="white" size="s">
              <Link href={`/chatpage/${Object.keys(document)[0]}`}>Go to Chat</Link>
            </Button>
          </td>
        </tr>
      ));

      content = (
        <div>
          <Table style={{ backgroundColor: '#333' }}>
            <thead>
              <tr>
                <th>Document ID</th>
                <th>Document Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      );
    }
  }

  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <Paper padding="lg" style={{ marginBottom: '1rem' }}>
          <div {...getRootProps()} style={{ outline: 'none' }}>
            <input {...getInputProps()} accept=".pdf" style={{ display: 'none' }} />
            {isDragActive ? (
              <Button component="span" variant="outline" color="blue" leftIcon={<FaCloudUploadAlt />} fullWidth>
                Drop the PDF file here
              </Button>
            ) : (
              <Button
                component="span"
                variant="outline"
                color="#55dae3"
                style={{
                  color: 'white',
                  backgroundColor: '#004b87',
                }}
                leftIcon={<FaCloudUploadAlt />}
                fullWidth
              >
                Choose PDF file
              </Button>
            )}
          </div>
        </Paper>
        {file && (
          <>
            <Text size="sm" align="center" style={{ marginBottom: '1rem' }}>
              Picked file: {file.name}
            </Text>
            <Button onClick={handleFileUpload} fullWidth>
              Upload File
            </Button>
          </>
        )}
        {errorMessage && (
          <Text color="red" size="sm" align="center" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            {errorMessage}
          </Text>
        )}
        {successMessage && (
          <Text color="#8cc63f" size="sm" align="center" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            {successMessage}
          </Text>
        )}
      </div>
      {isFetching ? (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>Fetching document list...</div>
      ) : (
        <div style={{ marginTop: '2rem' }}>{content}</div>
      )}
    </div>
  );
}

export default UploadFilePage;
