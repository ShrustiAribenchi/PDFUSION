// import React, { useState } from 'react';
// import { Paper, TextInput, Button } from '@mantine/core';
// import BeatLoader from 'react-spinners/BeatLoader';

// function ChatpageUI({ messages, onQuestionSubmit, isLoading }) {
//   const [inputValue, setInputValue] = useState('');

//   const handleSendMessage = () => {
//     if (inputValue.trim() === '') return;

//     onQuestionSubmit(inputValue.trim());
//     setInputValue('');
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto' }}>
//       <Paper shadow="sm" padding="md" style={{ height: 400, overflowY: 'scroll', border: '1px solid #e0e0e0' }}>
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             style={{
//               display: 'flex',
//               marginBottom: 10,
//               justifyContent: message.sender === 'Question' ? 'flex-end' : 'flex-start',
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: '#E8E8E8',
//                 borderRadius: 8,
//                 padding: 8,
//                 maxWidth: '80%',
//                 alignSelf: message.sender === 'Question' ? 'flex-end' : 'flex-start',
//               }}
//             >
//               {message.content}
//             </div>
//           </div>
//         ))}
//         {isLoading && inputValue.trim() !== '' && (
//           <div
//             style={{
//               display: 'flex',
//               marginBottom: 10,
//               justifyContent: 'flex-end',
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: '#E8E8E8',
//                 borderRadius: 8,
//                 padding: 8,
//                 maxWidth: '80%',
//               }}
//             >
//               {inputValue.trim()}
//             </div>
//           </div>
//         )}
//         {isLoading && (
//           <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
//             <BeatLoader size={8} color="#000000" />
//           </div>
//         )}
//       </Paper>
//       <div style={{ display: 'flex', marginTop: 10 }}>
//         <TextInput
//           disabled={isLoading}
//           value={inputValue}
//           onChange={(event) => setInputValue(event.target.value)}
//           placeholder="Type a message..."
//           style={{ flexGrow: 1, marginRight: 10 }}
//         />
//         <Button
//           disabled={isLoading || inputValue.trim() === ''}
//           onClick={handleSendMessage}
//           style={{ minWidth: 100 }}
//         >
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatpageUI;



import React, { useState } from 'react';
import { Paper, TextInput, Button } from '@mantine/core';
import BeatLoader from 'react-spinners/BeatLoader';

function ChatpageUI({ messages, onQuestionSubmit, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    onQuestionSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Paper shadow="sm" padding="md" style={{ height: 400, overflowY: 'scroll', border: '1px solid #e0e0e0' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              marginBottom: 10,
              justifyContent: message.sender === 'Question' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                backgroundColor: message.sender === 'Question' ? 'transparent' : '#E8E8E8',
                borderRadius: 8,
                padding: 8,
                maxWidth: '80%',
                alignSelf: message.sender === 'Question' ? 'flex-end' : 'flex-start',
                color: message.sender === 'Question' ? '#FFFFFF' : '#000000', // Set the text color to white for Question and black for other messages
              }}
            >
              {typeof message.content === 'string' ? (
                <span>{message.content}</span>
              ) : (
                <pre style={{ margin: 0 }}>{JSON.stringify(message.content, null, 2)}</pre>
              )}
            </div>
          </div>
        ))}
        {isLoading && inputValue.trim() !== '' && (
          <div
            style={{
              display: 'flex',
              marginBottom: 10,
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                backgroundColor: '#E8E8E8',
                borderRadius: 8,
                padding: 8,
                maxWidth: '80%',
              }}
            >
              {inputValue.trim()}
            </div>
          </div>
        )}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <BeatLoader size={8} color="#ffffff" />
          </div>
        )}
      </Paper>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <TextInput
          disabled={isLoading}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Type a message..."
          style={{ flexGrow: 1, marginRight: 10 }}
        />
        <Button
          disabled={isLoading || inputValue.trim() === ''}
          onClick={handleSendMessage}
          style={{
            minWidth: 100,
            color: 'white',
            backgroundColor: '#0074D9',
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatpageUI;
