"use client"
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

  return (
    <>
      <HStack position="fixed" top="2%" left="2%" zIndex="1">
        <Image src="/pawprints.png" alt="Image" width={50} height={50} />
        <Heading fontSize="240%" fontFamily="Kaushan Script" fontStyle="italic">
          PawfectMatch
        </Heading>
      </HStack>
      <HStack position="fixed" top="2%" right="2%" zIndex="1">
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
            {/* <MenuItem onClick={() => navigateTo('/')}>Login</MenuItem> */}
            <MenuItem onClick={() => navigateTo('/pages/profile')}>Profile</MenuItem>
            {/* <MenuItem onClick={() => navigateTo('/pages/selection')}>Selection</MenuItem> */}
            <MenuItem onClick={() => navigateTo('/pages/pets')}>Pets</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/training')}>Training Packages</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/addPets')}>Add Pets</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/addTraining')}>Add Training</MenuItem>
            <MenuItem onClick={() => navigateTo('/pages/chat')}>Chat</MenuItem>
            {/* Add more MenuItems for additional pages */}
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default Header;