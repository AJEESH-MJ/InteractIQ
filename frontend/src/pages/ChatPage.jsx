import React, { useState } from "react";
import { ChatState } from "./../context/chatProvider";
import { SearchBar, AllChats, ChatArea } from "./../Components";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="flex flex-col w-[90vw] h-[85vh] bg-white rounded-xl p-4">
      <div className="flex">{user && <SearchBar />}</div>
      <div className="hello flex flex-row flex-grow mb-3 overflow-hidden">
        {user && <AllChats fetchAgain={fetchAgain}/>}
        {user && <ChatArea fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  );
};

export default ChatPage;
