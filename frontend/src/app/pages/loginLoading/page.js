'use client';
import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginLoading = () => {
    const userID = Cookie.get('userID'); // Assuming 'userID' is the cookie key storing the ID
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            if (userID) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/users/id/${userID}`);
                    setData(response.data.person_traits);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    });

    useEffect(() => {
        console.log(data)
        if (data === "" ) {
            console.log('hi')
            const timer = setTimeout(() => {
                router.push('/'); // Replace with your target page
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
                    <Text fontSize="xl" color="black" mt={4}>
                        This chat will allow me to better understand your character. The more questions you answer, the more accurate the matching will be. Once you feel as though you have answered enough questions, feel free to click save. You can always revisit this page later.
                    </Text>
                </Box>
            );
        }
    })

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

export default LoginLoading;
