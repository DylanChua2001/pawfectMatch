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
        }
    }, [data, router]);

    if (data == null) {
        const timer = setTimeout(() => {
            router.push('/pages/userCreateProfile'); // Replace with your target page
        }, 10000); // 10 seconds
        clearTimeout(timer);

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
                <Box fontSize="xl" color="black" mt={4} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        Loading PawAI...<br />
                    </Text>
                    <Text fontSize="xl" mt={2}>
                        PawAI will be used to better understand your character.<br />
                        The more questions you answer, the more accurate the matching will be.<br />
                        Once you feel as though you have answered enough questions, feel free to continue to the main page!<br />
                        You can always revisit this page later.
                    </Text>
                </Box>

            </Box>
        );
    } else {
        router.push('/');
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
                <Text fontSize="xl" color="black" mt={4}>User data loaded. Proceeding to main page</Text>
            </Box>
        );
    };
}



export default LoginLoading;
