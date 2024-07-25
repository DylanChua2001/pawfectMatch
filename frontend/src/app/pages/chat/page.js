'use client';
import { Box, Avatar, Flex, Input, Button, useToast, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../../components/header"
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const Chatbot = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messageContainerRef = useRef(null);
  const userID = Cookie.get('userID');
  const toast = useToast();
  const [photo, setPhoto] = useState('');
  const id = Cookie.get('userID');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotoList = async () => {
      try {
        console.log(id)
        const photoresponse = await fetch(`https://pawfect-match-backend-six.vercel.app/api/image/retrieveImage/${id}`, {
          method: 'GET'
        });
        console.log(photoresponse)
        const photoresponsedata = await photoresponse.json();
        const imageSrcUrl = photoresponsedata.userImage[0].photo_url;
        console.log("Image Link :", imageSrcUrl)
        setPhoto(imageSrcUrl)

      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchPhotoList()
  }, [id])


  useEffect(() => {
    if (!userID) {
      toast({
        title: 'Please login to view this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/pages/login'), // Replace with your actual login page route
      });
      return;
    }
  }, [userID, router, toast]); // Added the dependency array

  if (!userID) {
    return (
      <>
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
          <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
        </Box>
      </>
    );
  }

  // Function to fetch messages from backend
  const fetchMessages = async () => {
    try {
      const sessionID = Cookie.get('userID');
      const response = await axios.post('https://pawfect-match-backend-six.vercel.app/api/chat/getchatbyid', {
        id: sessionID
      });
      setMessages(response.data);
      console.log(response);
      const initialAIMessage = {
        content: "Hi there! I’m PawAI, I’m here to help you find the Pawfect Match. To get started, tell me more about the character traits you’re looking for in a pet.",
        type: 'ai'
      };
      setMessages(prevMessages => [initialAIMessage, ...prevMessages]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      const initialAIMessage = {
        content: "Hi there! I’m PawAI, I’m here to help you find the Pawfect Match. To get started, tell me more about the character traits you’re looking for in a pet.",
        type: 'ai'
      };
      setMessages([initialAIMessage]);
    }
  };

  useEffect(() => {
    // Call fetchMessages function when component mounts
    fetchMessages();
  }, []); // Empty dependency array ensures this effect runs once when component mounts

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { content: inputText, type: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]); // Update messages with user's message
    setInputText('');
    setLoading(true);
    setMessages(prevMessages => [...prevMessages, { content: 'AI is typing...', type: 'loading' }]);

    try {
      const response = await fetch(
        'https://pawfect-match-backend-six.vercel.app/api/openai/ask',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the cookie in the request headers
          credentials: 'include',
          body: JSON.stringify({ question: inputText })
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let receivedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });
        receivedText += chunkText;

        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1), // Remove 'AI is typing...'
          { content: receivedText, type: 'ai' },
        ]);
      }

      // After streaming is complete, fetch updated messages from backend
      fetchMessages();
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state
    } finally {
      setLoading(false); // Set loading to false once response is received
      setMessages(prevMessages => prevMessages.filter(msg => msg.type !== 'loading'));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (e.g., form submission)
      sendMessage();
    }
  }

  const handleVerify = async () => {
    try {
      const sessionID = Cookie.get('userID');
      const response = await axios.post(
        'https://pawfect-match-backend-six.vercel.app/api/openai/verify',
        { sessionID: sessionID }, // Replace with the actual session ID
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (Number.isInteger(response.data)) {
        router.push(`/pages/pets/${response.data}`);
      } else {
        alert(message); // Display an alert message if verification fails
      }
    } catch (error) {
      console.error('Error verifying pet ID:', error);
    }
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages change

  return (
    <>
      <Flex height="100vh" direction="column" alignItems="center" justifyContent="center">
        <Header />
        <Flex direction="row" mt="10px" justifyContent="center" alignItems="center" gap='10%' p='20px' maxWidth="100%">
          <Box
            padding="15px"
            position="fixed"
            borderRadius="15px"
            backgroundColor="rgba(255, 255, 255, 0.7)"
            top="70px" // Adjust the top position as needed for different screen sizes
            left="0"
            right="0"
            margin="auto"
            maxW={["92%", "90%", "97%"]}
            w="100%"
            h={["calc(100vh - 90px)", "calc(100vh - 100px)", "calc(100vh - 110px)"]}
            sx={{
              overflowY: 'hidden', // Hide vertical scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none',     // Hide scrollbar for Firefox
              'overflow-y': 'auto',
            }}
            ref={messageContainerRef} // Ref to scroll container
          >
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {/* Display messages */}
              {messages.map((msg, index) => (
                <Flex
                  key={index}
                  className={`message ${msg.type}`}
                  justifyContent={msg.type === 'ai' || msg.type === 'loading' ? 'flex-start' : 'flex-end'}
                  marginBottom="10px"
                >

                  {(msg.type === 'ai' || msg.type === 'loading') && (
                    <Avatar
                      borderRadius="full"
                      borderColor="black"
                      src="../chick.png"
                      width="50"
                      height="50"
                      marginRight="5px"
                      marginTop="5px"
                    />
                  )}
                  <Box
                    bg='rgba(235,232,226,255)'
                    paddingX="20px"
                    paddingY="10px"
                    borderRadius="20px"
                    maxWidth="80%" // Set maximum width to 70%
                    wordBreak="break-word" // Allow long words to break and wrap
                    textAlign="left"
                  >
                    {msg.content}
                  </Box>

                  {msg.type === 'ai' && msg.content.includes('pet_id') && (
                    <Button
                      onClick={handleVerify}
                      colorScheme="yellow"
                      size="sm"
                      mt="10px" // Added margin-top for spacing
                      ml='10px'
                      width="30%"
                      textAlign="center"
                    >
                      Bring me to the pet!
                    </Button>
                  )}

                  {(msg.type !== 'ai' && msg.type !== 'loading') && (
                    <Avatar
                      borderRadius="full"
                      borderColor="black"
                      src={photo}
                      width="50"
                      height="50"
                      marginLeft="5px"
                      marginTop="5px"
                    />
                  )}
                </Flex>
              ))}
            </Box>
            <Box position="sticky">
              <Flex justifyContent="space-between" alignItems="center" marginTop="10px">
                <Box
                  flex="1"
                  type="text"
                  borderRadius="20px"
                  padding="25px"
                >
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box
            padding="15px"
            position="fixed"
            borderRadius="15px"
            bottom="10" // Position at the bottom
            left="0"
            right="0"
            paddingTop='50px'
            margin="auto"
            maxW={["92%", "90%", "97%"]}
            w="100%"
            backgroundColor="rgba(254,245,231,255)"
          >
          </Box>
          <Box
            padding="15px"
            position="fixed"
            borderRadius="15px"
            bottom="10" // Position at the bottom
            left="0"
            right="0"
            margin="auto"
            maxW={["92%", "90%", "97%"]}
            w="100%"
          >
            <Flex position="relative" width="100%" justifyContent="center" alignItems="center">
              <Input
                flex="1"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                borderRadius="20px"
                padding="15px"
                paddingTop='25px'
                paddingBottom='25px'
                paddingRight="60px" // Add right padding to make space for the button
                marginRight="10px"
                onKeyDown={handleKeyDown}
                backgroundColor="rgba(255, 255, 255, 1)"
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                colorScheme="yellow"
                borderRadius="20px"
                padding="15px"
                position="absolute"
                right="20px" // Position the button inside the input
                zIndex='1000'
                isLoading={loading}
              >
                Send
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Chatbot;