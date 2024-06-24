'use client'

import {
  Flex,
  Box,
  FormControl,
  Input,
  Checkbox,
  Stack,
  HStack,
  Button,
  Heading,
  Text,
  Avatar,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import Link from 'next/link';


export default function SimpleCard() {
  const router = useRouter();

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <HStack position="fixed" top="2%" zIndex="1" justifyContent="center" width="100%">
          <Image src="/pawprints.png" alt="Image" width={50} height={50} />
          <Heading fontSize={'240%'} fontFamily="Kaushan Script" fontStyle='italic'>PawfectMatch</Heading>
        </HStack>

        <HStack position="fixed" top="2%" right="2%" zIndex="1">
          <Avatar
            borderRadius='full'
            borderColor="black"
            src="profileicon.png"
            width="50"
            height="50"
          />
        </HStack>

      <Stack 
        align={'center'} 
        mx={'auto'} 
        maxW={'xl'} 
        mt= "40px">
        <Box
          borderRadius="10px"
          paddingLeft="8%"
          paddingRight="8%"
          bg="rgba(255, 250, 245, 0.7)"
          width={['90vw', '70vw', '50vw']}
          minHeight={['70vh', '85vh', '85vh']}
        >
          <Heading 
            fontSize="180%"
            fontFamily="'Lilita One', cursive"
            fontWeight= "bold"
            textAlign="center"
            mt= "4%">
            Login
          </Heading>

          <Stack spacing={4}>
          
            <FormControl id="email">
              <Input 
                type="email" 
                placeholder='Email' 
                width= "100%"
                padding= "20px"
                mt= "4%"
                size= "100"
                borderRadius= "5px"
                borderColor= "#D9D9D9"
                _focus={{ bg: "white", borderColor: "blue.400" }}
              />
            </FormControl>
            <FormControl id="password">
              <Input 
                type="password" 
                placeholder= "Password"
                width= "100%"
                padding= "20px"
                mt= "2%"
                size= "100"
                borderRadius= "5px"
                borderColor= "#D9D9D9"
                _focus={{ bg: "white", borderColor: "blue.400" }}
              />
            </FormControl>
            <Stack>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
                mt="2%"
              >
                <Checkbox
                  fontFamily="sans-serif"
                  fontSize= "13">
                  <Text fontFamily="sans-serif" fontSize= "13">
                  Remember me
                  </Text>
                </Checkbox>
                <Text 
                  color="blue"
                  fontFamily="sans-serif"
                  fontSize= "13">
                  <Link href= "forgot-password">
                    Forgot password?
                  </Link>
                </Text>
              </Stack>
              <Button
                onClick={() => router.push('/pages/selection')}
                _hover={{ cursor: 'pointer' }}
                alignItems='center'
                width= "100%"
                padding= "30px"
                mt= "3%"
                borderRadius= "5px"
                backgroundColor= "#F8D3A7"
                textColor='black'>
                Login
              </Button>
            </Stack>
            <Stack alignItems='center'mt="3%" fontFamily="sans-serif" fontSize= "13" >
              <Text>Don't have an account? {' '} 
                <Link href="/signup" color= 'blue' background= 'none' border= 'none' cursor= 'pointer' display= "inline-block" passHref >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
