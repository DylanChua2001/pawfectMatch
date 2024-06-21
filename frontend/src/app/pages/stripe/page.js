'use client'
import { Box, Button } from '@chakra-ui/react';
import Header from "../../components/header";

const StripePage = () => {
  const handleClick = () => {
    console.log("Button clicked!");
    // You can add more functionality here if needed
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Header />
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Button onClick={handleClick}>Click Me</Button>
        </Box>
      </Box>
    </>
  );
};

export default StripePage;
