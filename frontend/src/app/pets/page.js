"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Header from "../components/header";

const HomePage = () => {
  return (
    <Box textAlign="center" height="100vh">
      <Header />
      {/* Other content of the HomePage */}
    </Box>
  );
};

export default HomePage;
