import React from "react";
import { ChatState } from "../context/chatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatArea = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      mt={3}
      ml={3}
      p={3}
      bg="white"
      w={{ base: "100%", md: "70%" }}
      borderRadius="lg"
      h="100%"
      borderWidth={1}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatArea;
