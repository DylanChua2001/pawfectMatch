'use client';
import { Box, Avatar, Flex, Input, Button, useToast, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../../components/header"
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const CreateUserProfile = () => {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messageContainerRef = useRef(null);
    const userID = Cookie.get('userID');
    const toast = useToast();
    const id = Cookie.get('userID');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
      const fetchPhotoList = async () => {
        try {
          console.log(id)
          const photoresponse = await fetch(`http://localhost:3001/api/image/retrieveImage/${id}`, {
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
            <Box
                minHeight="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('/background.png')"
                backgroundSize="cover"
                backgroundPosition="center"
            >
                <Spinner size="xl" />
                <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
            </Box>
        );
    }

    // Function to fetch messages from backend
    const fetchMessages = async () => {
        try {
            const sessionID = Cookie.get('userID');
            const response = await axios.post('http://localhost:3001/api/chat/getchatbyid', {
                id: sessionID + "user",
            });
            setMessages(response.data);
            console.log(response);
            const initialAIMessage = {
                content: "Hello! I am PawAI and I am here to help you find a perfect match for your ideal pet! This chat will allow me to better understand your character, the more questions you answer, the more accurate the matching will be. Once you fell as though you have answered enough questions, feel free to click save, you can always revisit this page later. To start off, Can you tell me a little more about your character?",
                type: 'ai'
            };
            setMessages(prevMessages => [initialAIMessage, ...prevMessages]);
        } catch (error) {
            console.error('Error fetching messages:', error);
            const initialAIMessage = {
                content: "Hello! I am PawAI and I am here to help you find a perfect match for your ideal pet! This chat will allow me to better understand your character, the more questions you answer, the more accurate the matching will be. Once you fell as though you have answered enough questions, feel free to click save, you can always revisit this page later. To start off, Can you tell me a little more about your character?",
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

        try {
            const response = await axios.post(
                'http://localhost:3001/api/openai/user',
                { question: inputText },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Send the cookie in the request headers
                    withCredentials: true,  // Ensure credentials (cookies) are sent
                }
            );

            const botMessage = { content: response.data.response, type: 'ai' };
            setMessages(prevMessages => [...prevMessages, botMessage]); // Update messages with the bot's response

            // After sending message, fetch updated messages from backend
            fetchMessages();
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error state
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
            const session = Cookie.get('userID');
            const sessionID = session + "user";
            console.log(sessionID)
            const response = await axios.post(
                'http://localhost:3001/api/openai/save',
                { sessionID: sessionID }, // Replace with the actual session ID
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,  // Ensure credentials (cookies) are sent
                }
            );
            console.log(response);
            router.push('/')

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
        <Flex height="100vh" direction="column" alignItems="center" justifyContent="center">
            <Header />
            <Flex direction="row" mt="10px" justifyContent="center" alignItems="center" gap='10%' p='20px' maxWidth="100%">
                <Box
                    borderRadius="50px"
                    padding="3%"
                    bg="rgba(255, 250, 245, 0.7)"
                    textAlign="center"
                    overflow="auto"
                    maxHeight="80vh"
                    width="100%" // Ensure full width for message container
                    ref={messageContainerRef} // Ref to scroll container
                >
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        {/* Display messages */}
                        {messages.map((msg, index) => (
                            <Flex
                                key={index}
                                className={`message ${msg.type}`}
                                justifyContent={msg.type === 'ai' ? 'flex-start' : 'flex-end'}
                                marginBottom="10px"
                            >

                                {msg.type === 'ai' && (
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

                                {msg.type !== 'ai' && (
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
                    <Flex justifyContent="space-between" alignItems="center" marginTop="10px">
                        <Input
                            flex="1"
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            borderRadius="20px"
                            padding="15px"
                            marginRight="10px"
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            onClick={sendMessage}
                            colorScheme="yellow"
                            borderRadius="20px"
                            padding="15px"
                        >
                            Send
                        </Button>
                        <Button
                            onClick={handleVerify}
                            colorScheme="blue"
                            borderRadius="20px"
                            padding="15px"
                        >
                            Save and let me see the pets!
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};

export default CreateUserProfile;
