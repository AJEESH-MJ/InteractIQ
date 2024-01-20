import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      display="flex"
      cursor="pointer"
      width="100%"
      alignItems="center"
      px="3px"
      py="2px"
      mb="2px"
      borderRadius="lg"
      _hover={{ bg: "gray.200" }}
      onClick={handleFunction}
    >
      <Avatar mr={2} size="sm" name={user.name} src={user.avatar} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>{user.phoneNumber}</b>
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
