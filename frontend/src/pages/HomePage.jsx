import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading, VStack, Text, Box, Image } from "@chakra-ui/react";
import { LOGO2 } from "../assets";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <VStack spacing={8} align="center" justify="center" h="100vh">
      <Box>
        <Image src={LOGO2} alt="Logo" boxSize="150px" />
      </Box>
      <Heading as="h1" size="2xl" textAlign="center" mb={4}>
        Welcome to Your Chat App
      </Heading>

      <Text fontSize="xl" color="gray.600" textAlign="center">
        Connect with friends and start chatting!
      </Text>

      <VStack spacing={6} mt={8} width="100%" maxW="400px">
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate("/login")}
          width="100%"
        >
          Log In
        </Button>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate("/register")}
          width="100%"
        >
          Sign Up
        </Button>
      </VStack>
    </VStack>
  );
};

export default HomePage;
