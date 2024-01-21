import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { ChatLoading } from ".";
import { getSender } from "../config/chatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import AvatarImage from "./AvatarImage";

const AllChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      mt={3}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "30%" }}
      h="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "25px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          ></Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        bg="#F8F8F8"
        w="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                px={3}
                py={2}
                borderBottomWidth="1px"
                borderColor="gray.200"
                bg={selectedChat?._id === chat._id ? "#EAEAEA" : "white"}
                color={selectedChat?._id === chat._id ? "black" : "black"}
                borderRadius="lg"
                cursor="pointer"
                _hover={{ bg: "#EAEAEA" }}
              >
                <Flex alignItems="center">
                <div className="py-2 flex items-center mr-3">
            <AvatarImage userId={user._id} name={user.name} />
          </div>
                  <Box>
                    <Text fontSize="md" fontWeight="semibold">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {chat?.lastMessage?.message}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default AllChats;
