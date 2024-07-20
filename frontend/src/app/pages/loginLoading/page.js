'use client';
import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginLoading = () => {
    const userID = Cookie.get('userID'); // Assuming 'userID' is the cookie key storing the ID
    const router = useRouter();
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userID) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/users/id/${userID}`);
                    setData(response.data.person_traits);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                router.push('/login'); // Redirect to login if no userID
            }
        };

        fetchUserData();
    }, [userID, router]);

    useEffect(() => {
        console.log(data)
        if (data == null) {
            const timer = setTimeout(() => {
                router.push('/pages/createUserProfile'); // Replace with your target page
            }, 10000); // 10 seconds

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
            const timer = setTimeout(() => {
                router.push('/'); // Replace with your target page
            }, 10000); // 10 seconds

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [data, router]);

    if (data == null) {
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
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="15px"
                    backgroundColor="rgba(255, 255, 255, 0.8)"
                    px="20px"
                    py="10px"
                    margin="auto"
                    fontSize={["0.45rem", "0.45rem", "0.65rem", "0.65rem"]}
                    maxW='65%'
                >
                    <Spinner size="xl" />
                    <Text fontSize="2xl" fontWeight="bold">
                        Loading PawAI...<br />
                    </Text>
                    <Text fontSize="xl" mt={2}>
                        PawAI is here to help us understand your ideal pet’s personality better.
                        The more questions you answer, the closer we'll get to finding the perfect match for you.
                        When you’re ready, you can continue to the main page.
                        And don’t worry—if you want to come back and refine your choices later, you’re always welcome!"
                    </Text>
                </Box>

            </Box>
        );
    } else {
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
                <Text fontSize="xl" color="black" mt={4}>User data loaded. Proceeding to main page</Text>
            </Box>
        );
    };
}



export default LoginLoading;
