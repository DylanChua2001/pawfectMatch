"use client";

import { useState, useEffect, Suspense } from "react";
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
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [userID, setUserID] = useState(null); // Add userID state
  const [imageSrcUrl, setImageSrcUrl] = useState("profileicon.png"); // State for profile image URL
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false); // State for Favorites menu
  const [isAddOpen, setIsAddOpen] = useState(false); // State for Adding of pets and training menu
  const [isPawAIOpen, setIsPawAIOpen] = useState(false); // State for PAW AI
  const router = useRouter(); // Initialize useRouter hook
  const id = Cookies.get("userID"); // Assuming 'userID' is the cookie key storing the ID
  const isAdmin = Cookies.get("isAdmin");

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (route) => {
    router.push(route);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:3001/api/auth/logout");
    Cookies.remove("token"); // Remove JWT token cookie
    Cookies.remove("userID"); // Remove userID cookie
    Cookies.remove("isAdmin"); // Remove isAdmin cookie
    Cookies.remove("connect.sid"); // Remove session ID cookie (if applicable)
    router.push("/pages/login");
  };

  const toggleFavoritesMenu = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
  };

  const toggleAddMenu = () => {
    setIsAddOpen(!isAddOpen);
  };

  const togglePawAIMenu = () => {
    setIsPawAIOpen(!isPawAIOpen);
  };

  useEffect(() => {
    setUserID(id); // Set userID state
    fetchProfile(); // Fetch profile data when component mounts
  }, [id]);

  const fetchProfile = async () => {
    try {
      const photoresponse = await fetch(
        `http://localhost:3001/api/image/retrieveUserImageID/${id}`,
        {
          method: "GET",
        }
      );

      const photoresponsedata = await photoresponse.json();
      const fetchedImageSrcUrl = photoresponsedata.userImage[0].photo_url;
      setImageSrcUrl(fetchedImageSrcUrl); // Set the fetched image URL to state
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <>
      <HStack position="fixed" top="2%" left="3px" zIndex="1">
        <Button
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          onClick={() => router.push("/")}
        >
          <Image src="/pawprints.png" alt="Image" width={50} height={50} />
          <Heading
            fontSize="240%"
            fontFamily="Kaushan Script"
            fontStyle="italic"
          >
            PawfectMatch
          </Heading>
        </Button>
      </HStack>
      <HStack position="fixed" top="1%" right="1%" zIndex="1">
        <Menu isOpen={isOpen}>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            onClick={handleMenuToggle}
          >
            <Suspense fallback={<Avatar size="sm" />}>
              <Avatar
                borderRadius="full"
                borderColor="black"
                src={imageSrcUrl}
                width="50"
                height="50"
              />
            </Suspense>
          </MenuButton>
          <MenuList>
            {userID && (
              <MenuItem onClick={() => navigateTo("/pages/profile")}>
                Edit Profile
              </MenuItem>
            )}
            {userID && (
              <MenuItem onClick={() => navigateTo("/pages/pets")}>
                Pets
              </MenuItem>
            )}
            {userID && (
              <MenuItem onClick={() => navigateTo("/pages/training")}>
                Training Packages
              </MenuItem>
            )}
            {userID && (
              <>
                <MenuItem onClick={toggleFavoritesMenu}>Favorites</MenuItem>
                {isFavoritesOpen && (
                  <Box ml="6">
                    <MenuItem onClick={() => navigateTo("/pages/favpets")}>
                      Favorite Pets
                    </MenuItem>
                    <MenuItem onClick={() => navigateTo("/pages/favtraining")}>
                      Favorite Training
                    </MenuItem>
                  </Box>
                )}
              </>
            )}
            {userID && isAdmin === "false" && (
              <>
                <MenuItem onClick={togglePawAIMenu}>PawAI</MenuItem>
                {isPawAIOpen && (
                  <Box ml="6">
                    <MenuItem onClick={() => navigateTo("/pages/chat")}>
                      Chat
                    </MenuItem>
                    <MenuItem
                      onClick={() => navigateTo("/pages/createUserProfile")}
                    >
                      Knowing you better
                    </MenuItem>
                  </Box>
                )}
              </>
            )}
            {userID && isAdmin === "true" && (
              <>
                <MenuItem onClick={toggleAddMenu}>Add</MenuItem>
                {isAddOpen && (
                  <Box ml="6">
                    <MenuItem onClick={() => navigateTo("/pages/addPets")}>
                      Add Pets
                    </MenuItem>
                    <MenuItem onClick={() => navigateTo("/pages/addTraining")}>
                      Add Training
                    </MenuItem>
                  </Box>
                )}
              </>
            )}

            {userID && isAdmin === "false" && (
              <MenuItem onClick={() => navigateTo("/pages/cart")}>
                Cart
              </MenuItem>
            )}
            {userID && isAdmin === "false" && (
              <MenuItem onClick={() => navigateTo("/pages/about")}>
                About PawfectMatch
              </MenuItem>
            )}
            {!userID && (
              <MenuItem onClick={() => navigateTo("/pages/login")}>
                Login
              </MenuItem>
            )}
            {userID && (
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            )}
            {/* Add more MenuItems for additional pages */}
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default Header;
