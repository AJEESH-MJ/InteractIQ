import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../context/chatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogics";
import { Tooltip } from "@chakra-ui/react";
import AvatarImage from "./AvatarImage";
import "../App.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed className="flex flex-col justify-end react-scrollable-feed">
      {messages.map((message, index) => (
        <div
          style={{
            display: "flex",
          }}
          key={message._id}
        >
          {(isSameSender(messages, message, index, user._id) ||
            isLastMessage(messages, index, user._id)) && (
            <Tooltip
              label={message.sender.name}
              placement="bottom-start"
              hasArrow
            >
              <div className="py-2 flex items-center justify-center mr-1">
                <AvatarImage
                  userId={user._id}
                  name={user.name}
                />
              </div>
            </Tooltip>
          )}
          <span
            style={{
              backgroundColor: `${
                message.sender._id === user._id ? "#1FA9FF" : "#F5F5F5"
              }`,
              color: message.sender._id === user._id ? "#EAEAEA" : "#2B2B2B",
              borderRadius: "8px",
              padding: "8px 15px",
              maxWidth: "75%",
              minWidth: "10%",
              marginLeft: isSameSenderMargin(
                messages,
                message,
                index,
                user._id
              ),
              marginTop: isSameUser(messages, message, index, user._id)
                ? 3
                : 10,
            }}
          >
            {message.content}
            <p
              style={{
                color: message.sender._id === user._id ? "white" : "black",
                fontSize: "0.8em",
                textAlign: "right",
                margin: "0",
              }}
            >
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
