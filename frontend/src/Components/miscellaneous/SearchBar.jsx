import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Tooltip,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ChatState } from "../../context/chatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { ChatLoading } from "..";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/chatLogics";
import { BellIcon } from "@chakra-ui/icons";
// import { Effect } from "react-notification-badge";
// import NotificationBadge from "react-notification-badge";
import { LOGO1, LOGO2 } from "../../assets/index";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter a name to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSearch("");
    }
  };

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(true);
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      align="center"
      width="100%"
      padding="5px"
      background="#EAEAEA"
      borderRadius="10px"
      display="flex"
      justifyContent="space-between"
    >
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection="col"
        ml={4}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={LOGO2}
          alt="Logo"
          boxSize="50px"
          borderRadius="full"
          mr="2"
        />

        <Text fontSize="lg" fontWeight="bold">
          InteractIQ
        </Text>
      </Box>

      <Box margin="10px">
        <Flex
          align="center"
          background="white"
          padding="10px"
          border="none"
          borderRadius="10px"
        >
          <Input
            type="text"
            placeholder="Search User..."
            focusBorderColor="none"
            border="none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={onOpen}
          />
          <Tooltip label="Search" hasArrow placement="bottom-end">
            <Button
              onClick={onOpen}
              marginLeft="10px"
              colorScheme="blue"
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
            ></Button>
          </Tooltip>
        </Flex>
      </Box>

      <Box display="flex" alignItems="center">
        <Menu>
          <MenuButton p={1}>
            {/* <NotificationBadge count={notification.length} effect={Effect.SCALE} /> */}
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuList pl={2}>
            {!notification.length && "No notifications yet"}
            {notification.map((notification) => (
              <MenuItem
                key={notification._id}
                onClick={() => {
                  setSelectedChat(notification.chat);
                  setNotification(
                    notification.filter((n) => n !== notification)
                  );
                }}
              >
                {notification.chat.isGroupChat
                  ? `New message in ${notification.chat.chatName}`
                  : `New message from ${getSender(
                      user,
                      notification.chat.users
                    )}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton marginLeft="15px" marginRight="5px">
            <Avatar
              size="sm"
              name={user.name}
              src={user.avatar}
              cursor="pointer"
            />
          </MenuButton>

          <MenuButton
            as={Button}
            variant="ghost"
            size="lg"
            rightIcon={<FontAwesomeIcon icon={faEllipsisVertical} size="lg" />}
          ></MenuButton>

          <MenuList marginTop="10px">
            <ProfileModel user={user}>
              <MenuItem>Profile</MenuItem>
            </ProfileModel>

            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb="2" flexDir="row">
              <Input
                type="text"
                placeholder="Search User by name or phone number..."
                mr="2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                leftIcon={<FontAwesomeIcon icon={faSearch} />}
                onClick={handleSearch}
              ></Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SearchBar;
