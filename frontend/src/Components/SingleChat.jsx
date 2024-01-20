import {
  Avatar,
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/chatLogics";
import { FaPaperPlane } from "react-icons/fa";
import ProfileModel from "./miscellaneous/ProfileModel";
import UpdateGroupChatModel from "./miscellaneous/UpdateGroupChatModel";
import axios from "axios";
import "../Components/styles.css";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toast = useToast();

  const { selectedChat, user, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const Config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        Config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat, fetchAgain]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, [messages]);

  const sendMessage = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const Config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          "/api/message",
          {
            chatId: selectedChat._id,
            content: newMessage,
          },
          Config
        );
        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex h-[100%] flex-col min-w-full">
          <Flex
            align="center"
            justify="space-between"
            p={3}
            backgroundColor="#f0f0f0"
            borderRadius="lg"
          >
            <Flex align="center">
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                mr={4}
              />
              {!selectedChat.isGroupChat ? (
                <>
                  <Avatar
                    src={getSender(user, selectedChat.users).profilePic}
                    size="sm"
                    mr={2}
                  />
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                    {getSender(user, selectedChat.users)}
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                    {selectedChat.chatName.toUpperCase()}
                  </Text>
                  <UpdateGroupChatModel
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              )}
            </Flex>
            <Box>
              {!selectedChat.isGroupChat && (
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              )}
            </Box>
          </Flex>

          <Box
            flex="1"
            p={3}
            bg="#E8E8E8"
            borderRadius="lg"
            overflow="hidden"
            mt={2}
            position="relative"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div
                style={{ height: "470px", overflowY: "auto", width: "full" }}
              >
                <ScrollableChat messages={messages} />

                {isTyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </Box>

          <FormControl
            onKeyDown={sendMessage}
            isRequired
            mt={3}
            d="flex"
            flexDir="row"
            alignItems="center"
          >
            <InputGroup>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Type your message..."
                onChange={typingHandler}
                value={newMessage}
              />
              <IconButton
                h="2.5rem"
                size="lg"
                ml={2}
                icon={<FaPaperPlane />}
                onClick={sendMessage}
                aria-label="Send"
              />
            </InputGroup>
          </FormControl>
        </div>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
