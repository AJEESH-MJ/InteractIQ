import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      display="inline-block"
      px={4}
      py={2}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={15}
      background="blue"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={2} boxSize={6} />
    </Box>
  );
};

export default UserBadgeItem;
