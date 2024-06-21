// pages/about.js
import { Box } from '@chakra-ui/react';
import Header from "../../components/header";
import Profile from '../../components/userProfile';

const ProfilePage = () => {
  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Profile />
      </Box>
    </Box>
    </>
  );
};

export default ProfilePage;