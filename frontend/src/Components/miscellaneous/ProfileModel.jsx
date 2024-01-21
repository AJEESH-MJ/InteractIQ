import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AvatarImage from "../AvatarImage";
import { ChatState } from "../../context/chatProvider";

const ProfileModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = ChatState();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="400px">
          <ModalHeader
            fontSize="40px"
            fontFamily="sans-serif"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <div className="py-2 flex items-center justify-center text-7xl">
              <AvatarImage userId={user._id} name={user.name} width={40} height={40} />
            </div>
            <Text
              fontSize={{ base: "18px", md: "20px" }}
              className="flex justify-center items-center mt-2"
            >
              Phone Number: {user.phoneNumber}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
