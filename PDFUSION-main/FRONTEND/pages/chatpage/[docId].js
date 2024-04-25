import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ChatpageUI from '../../components/ChatPage';

function DynamicChatPage() {
  const router = useRouter();
  const { docId } = router.query;
  const { data: session } = useSession();
  const token = session?.user?.access_token;

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('docId', docId);
      formData.append('question', question);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const response = await axios.post(
        'http://localhost:8000/api/ask-questions',
        formData,
        { headers }
      );

      console.log('Response:', response.data);

      if (response.status === 200) {
        const newQuestionMessage = {
          content: question,
          sender: 'Question',
        };

        const newAnswerMessage = {
          content: response.data,
          sender: 'Response',
        };

        setMessages((prevMessages) => [
          ...prevMessages,
          newQuestionMessage,
          newAnswerMessage,
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting question:', error);
      setError('An error occurred while submitting the question.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '20px' }}>Chat Page for Document ID: {docId}</p>
      {error && <p>{error}</p>}
      <div style={{ marginTop: '20px' }}>
        <ChatpageUI
          messages={messages}
          onQuestionSubmit={handleQuestionSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default DynamicChatPage;
