'use client'

import { useState } from 'react';
import {
  HStack,
  Avatar,
  Image,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (route) => {
    router.push(route);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await axios.get('http://localhost:3001/api/auth/logout')
    Cookies.remove('token'); // Remove JWT token cookie
    Cookies.remove('userID'); // Remove userID cookie
    Cookies.remove('isAdmin'); // Remove isAdmin cookie
    Cookies.remove('connect.sid'); // Remove session ID cookie (if applicable)
    router.push('/pages/login');
  };

  // Check if userID exists in cookies
  const userID = Cookies.get('userID');

  return (
    <>
      <HStack position="fixed" top="2%" left="3px" zIndex="1">
        <Button bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={() => router.push("/")}>
          <Image src="/pawprints.png" alt="Image" width={50} height={50} />
          <Heading fontSize="240%" fontFamily="Kaushan Script" fontStyle="italic">
            PawfectMatch
          </Heading>
        </Button>
      </HStack>
      <HStack position="fixed" top="1%" right="1%" zIndex="1">
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            onClick={handleMenuToggle}
          >
            <Avatar
              borderRadius="full"
              borderColor="black"
              src="profileicon.png"
              width="50"
              height="50"
            />
          </MenuButton>
          <MenuList>
            {!userID && <MenuItem onClick={() => navigateTo('/pages/login')}>Login</MenuItem>}
            {userID && <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>}
            {userID && <MenuItem onClick={() => navigateTo('/pages/profile')}>Profile</MenuItem>}
            {/* <MenuItem onClick={() => navigateTo('/pages/pets')}>Pets</MenuItem> */}
            {/* <MenuItem onClick={() => navigateTo('/pages/training')}>Training Packages</MenuItem> */}
            <MenuItem onClick={() => navigateTo('/pages/about')}>About Us</MenuItem>
            {userID && <MenuItem onClick={() => navigateTo('/pages/addPets')}>Add Pets</MenuItem>}
            {userID && <MenuItem onClick={() => navigateTo('/pages/addTraining')}>Add Training</MenuItem>}
            {userID && <MenuItem onClick={() => navigateTo('/pages/chat')}>Chat</MenuItem>}
            {userID && <MenuItem onClick={() => navigateTo('/pages/favpets')}>Favorite Pets</MenuItem>}
            <MenuItem onClick={() => navigateTo('/pages/s3bucket')}>S3</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/stripe')}>Stripe</MenuItem>
            {/* Add more MenuItems for additional pages */}
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default Header;
