// components/Header.js
import { HStack, Avatar, Image, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <HStack position="fixed" top="2%" left="2%" zIndex="1">
        <Image src="/pawprints.png" alt="Image" width={50} height={50} />
        <Heading fontSize="240%" fontFamily="Kaushan Script" fontStyle="italic">
          PawfectMatch
        </Heading>
      </HStack>
      <HStack position="fixed" top="2%" right="2%" zIndex="1">
        <Avatar
          borderRadius="full"
          borderColor="black"
          src="profileicon.png"
          width="50"
          height="50"
        />
      </HStack>
    </>
  );
};

export default Header;
